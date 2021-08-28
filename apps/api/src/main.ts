import * as express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from './resolvers/UserResolver';
import { buildSchema } from 'type-graphql';

import { User } from './entity/User';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

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

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.get('/api', async (_, res) => {
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.isActive = true;
    const data = await user.save();
    console.log(data);
    res.send({ message: 'Welcome to api!' });
  });

  const port = process.env.port || 3333;

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
};

main().catch((error) => console.log(error));
