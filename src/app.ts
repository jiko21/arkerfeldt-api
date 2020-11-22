import express from 'express';
import { userRouter } from './interfaces/api/router/userRouter';

export const app = express();

app.use(express.json());
app.use('/api/user', userRouter);
