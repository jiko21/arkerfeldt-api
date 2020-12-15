import { Post } from '@prisma/client';
import * as postRepository from '../../infrastructure/datasource/postRepository';
import { PostFilterParam } from '../../types/Post';

export const findPostById = async (id: number): Promise<Post | null> => {
  return await postRepository.findPostById(id);
};

export const findPosts = async (params: PostFilterParam): Promise<Post[]> => {
  return await postRepository.findPosts(params);
};

export const savePost = async (post: Post): Promise<void> => {
  const postInput = {
    ...post,
    author: {
      connect: {
        uid: post.authorId,
      },
    },
  };
  return await postRepository.createPost(postInput);
};
