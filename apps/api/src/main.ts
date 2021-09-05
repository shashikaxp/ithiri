import { COOKIE_NAME } from './constants';
import { MyContext } from './types';
import * as express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { getManager } from 'typeorm';

import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';

import { User } from './entity/User';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import * as Redis from 'ioredis';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';

const main = async () => {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'ithiri',
    synchronize: true,
    username: 'postgres',
    password: 'postgres',
    entities: [User],
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
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }): MyContext => ({ em, req, res, redis }),
  });

  // TODO  use envirunment
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
    res.send({ message: 'Welcome to api!' });
  });

  const port = process.env.port || 3333;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
};

main().catch((error) => console.log(error));
