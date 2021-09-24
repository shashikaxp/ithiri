import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { getManager } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { Store } from './entity/Store';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import Redis from 'ioredis';

import { StorePriceResolver } from './resolvers/StoreItemResolver';
import { ListItemResolver } from './resolvers/ListItemResolver';
import { UserResolver } from './resolvers/UserResolver';
import { User } from './entity/User';
import { Item } from './entity/Item';
import { Favourite } from './entity/Favourite';
import { StorePrice } from './entity/StorePrice';
import { COOKIE_NAME, __PROD__ } from './constants';
import { MyContext } from './types';
import { FavouriteResolver } from './resolvers/FavouriteResolver';
import { scrapeNextWeekItems } from './scraper/scrapeNextWeekItems';
import { setThisWeekItems } from './scraper/setThisWeekItems';

// set up env
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    synchronize: true,
    ssl: __PROD__
      ? {
          rejectUnauthorized: false,
        }
      : false,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    entities: [User, Store, Item, StorePrice, Favourite],
  });

  const em = getManager();
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(express.json());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        StorePriceResolver,
        FavouriteResolver,
        ListItemResolver,
      ],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }): MyContext => ({ em, req, res, redis }),
  });

  // TODO  use env
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax',
        secure: __PROD__, // use only in https,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'asd2323sad',
      resave: false,
    })
  );

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.post('/scrapeNextWeekItems/:store', async (req, res) => {
    try {
      const storeName = req.params.store;
      const url = req.body.url;
      const start = req.body.start;
      const end = req.body.end;
      await scrapeNextWeekItems(storeName, url, start, end);
      res.status(200).json({
        status: true,
        message: 'Successfully add weekly items',
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({
          status: false,
          message: error.message,
        });
    }
  });

  app.post('/setThisWeekItems', async (_, res) => {
    try {
      await setThisWeekItems();
      res.status(200).json({
        status: true,
        message: 'Successfully updated this week prices',
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({
          status: false,
          message: error.message,
        });
    }
  });

  const port = process.env.PORT || 3333;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
};

main().catch((error) => console.log(error));
