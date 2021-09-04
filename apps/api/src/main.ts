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

import redis = require('redis');
import session = require('express-session');
import * as connectRedis from 'connect-redis';

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
};

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

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }): MyContext => ({ em, req, res }),
  });

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  // TODO  use envirunment
  app.use(
    session({
      name: 'iid',
      store: new RedisStore({
        client: redisClient,
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
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.get('/api', async (_, res) => {
    res.send({ message: 'Welcome to api!' });
  });

  const port = process.env.port || 3333;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
};

main().catch((error) => console.log(error));
