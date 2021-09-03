import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';

export type MyContext = {
  em: EntityManager;
  req: Request;
  res: Response;
};

declare module 'express-session' {
  interface Session {
    userId: number;
  }
}
