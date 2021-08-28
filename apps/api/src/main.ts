import * as express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { User } from './entity/User';

const app = express();

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

  app.get('/api', async (req, res) => {
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.isActive = true;
    const data = await user.save();
    console.log(data);
    res.send({ message: 'Welcome to api!' });
  });

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
};

main().catch((error) => console.log(error));
