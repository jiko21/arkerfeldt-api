import { Router } from 'express';
import { saveUserHandler } from '../handler/userHandler';
import { authMiddleware } from '../middleware/authMiddleware';
import cors from 'cors';

// eslint-disable-next-line new-cap
export const userRouter = Router();
userRouter.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
);
userRouter.use(authMiddleware);
userRouter.post('/', saveUserHandler);
