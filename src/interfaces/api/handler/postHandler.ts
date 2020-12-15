import { Post, PostUpdateInput } from '@prisma/client';
import { Response, Request } from 'express';
import {
  findPostById,
  findPosts,
  savePost,
  updatePost,
} from '../../../application/usercase/postUsecase';
import { PostFilterParam } from '../../../types/Post';
import { InnerRequest } from './request';

export const getPosts = async (
  req: Request<any, any, any, PostFilterParam>,
  res: Response,
): Promise<void> => {
  const params = req.query;
  try {
    const posts = await findPosts(params);
    res.status(200).json({
      total: posts.length,
      posts,
    });
  } catch (e) {
    res.status(500).json({
      msg: 'internal_server_error',
    });
  }
};

export const getPostById = async (
  req: Request<{ id: string }, any, any, any>,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const post = await findPostById(id);
    if (post === null) {
      res.status(404).json({
        msg: 'not_found',
      });
    } else {
      res.status(200).json({
        ...post,
      });
    }
  } catch (e) {
    res.status(500).json({
      msg: 'internal_server_error',
    });
  }
};

export const createPost = async (
  req: Request<any, any, Post, any>,
  res: Response,
): Promise<void> => {
  const post = req.body;
  post.authorId = (req as InnerRequest).uid;
  try {
    await savePost(post);
    res.json({
      msg: 'ok',
    });
  } catch (e) {
    res.status(500).json({
      msg: 'internal_server_error',
    });
  }
};

export const putPost = async (
  req: Request<{ id: string }, any, PostUpdateInput, any>,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);
  const post = req.body;
  try {
    await updatePost(id, post);
    res.json({
      msg: 'ok',
    });
  } catch (e) {
    res.status(500).json({
      msg: 'internal_server_error',
    });
  }
};
