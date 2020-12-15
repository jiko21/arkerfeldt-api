import express from 'express';
import { postRouter } from './interfaces/api/router/postRouter';
import { userRouter } from './interfaces/api/router/userRouter';

export const app = express();

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
