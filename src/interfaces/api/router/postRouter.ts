import { Router } from 'express';

import { authMiddleware } from '../middleware/authMiddleware';
import cors from 'cors';
import { createPost, getPostById, getPosts } from '../handler/postHandler';

// eslint-disable-next-line new-cap
export const postRouter = Router();
postRouter.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
);
postRouter.use(authMiddleware);
postRouter.get('/:id', getPostById);
postRouter.get('/', getPosts);
postRouter.post('/', createPost);
