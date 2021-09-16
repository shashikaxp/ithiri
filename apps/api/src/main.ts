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

import { orderBy } from 'lodash';

import { ScrapeItem } from './scraper/IScraper';
import { StorePriceResolver } from './resolvers/StoreItemResolver';
import { ColesScraper } from './scraper/colesScraper';
import { WoolworthsScraper } from './scraper/woolworthsScraper';
import { UserResolver } from './resolvers/UserResolver';
import { User } from './entity/User';
import { Item } from './entity/Item';
import { Favourite } from './entity/Favourite';
import { StorePrice } from './entity/StorePrice';
import { COOKIE_NAME } from './constants';
import { MyContext } from './types';
import { FavouriteResolver } from './resolvers/FavouriteResolver';

import * as stringSimilarity from 'string-similarity';

const main = async () => {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'ithiri',
    synchronize: true,
    username: 'postgres',
    password: 'postgres',
    entities: [User, Store, Item, StorePrice, Favourite],
  });

  const em = getManager();
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: 'http://localhost:4200',
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, StorePriceResolver, FavouriteResolver],
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
        secure: false, // use only in https,
      },
      saveUninitialized: false,
      secret: 'asd2323sad',
      resave: false,
    })
  );

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.get('/api', async (_, res) => {
    const em = getManager();
    const item = await em.findOne(Item, { id: 48 });
    res.send({ message: item });
  });

  app.get('/scrape/:store', async (req, res) => {
    const storeName = req.params.store;
    let storeId: number;
    let data: ScrapeItem[] = [];

    if (storeName === 'woolworths') {
      const woolworths = new WoolworthsScraper();
      storeId = 2;
      data = await woolworths.getItems();
    } else {
      storeId = 1;
      const coles = new ColesScraper();
      data = await coles.getItems();
    }

    const em = getManager();
    const store = await em.findOne(Store, { id: storeId });
    const itemsInDb = await em.find(Item, {});

    data.forEach(async (i) => {
      const itemId = getMatchingItemId(itemsInDb, i.name);

      let item: Item | undefined = undefined;
      let storePrice: StorePrice | undefined;

      if (itemId) {
        const itemData = await em.findOne(Item, { id: itemId });
        if (itemData) {
          item = itemData;
          storePrice = await em.findOne(StorePrice, {
            item: item,
            store: store,
          });
        }
      } else {
        const itemData = {
          name: i.name,
          description: null,
          image: i.image,
          category: i.category,
          price: i.price,
        };
        item = em.create(Item, itemData);
        await item.save();
      }

      if (storePrice) {
        storePrice.nwPrice = i.currentPrice;
        storePrice.nwSavings = i.savings;
        storePrice.nwDiscount = i.discount;
      } else {
        const storePriceData = {
          item: item,
          store: store,
          cwPrice: undefined,
          cwSavings: undefined,
          cwDiscount: undefined,
          nwPrice: i.currentPrice,
          nwSavings: i.savings,
          nwDiscount: i.discount,
        };
        storePrice = em.create(StorePrice, storePriceData);
      }
      await storePrice.save();
    });
    res.send({ data: true });
  });

  const port = process.env.port || 3333;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
};

const getMatchingItemId = (itemsInDb: Item[], itemName: string) => {
  const stringMatchingResults = itemsInDb.map((i) => {
    return {
      ...i,
      compatibility: stringSimilarity.compareTwoStrings(i.name, itemName),
    };
  });

  const highestCOmpatibilityItems = stringMatchingResults.filter((i) => {
    return i.compatibility > 0.9;
  });

  const sortedItems = orderBy(
    highestCOmpatibilityItems,
    ['compatibility'],
    ['desc']
  );

  if (sortedItems.length > 0) {
    return sortedItems[0].id;
  } else {
    return null;
  }
};

main().catch((error) => console.log(error));
