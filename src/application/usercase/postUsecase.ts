import { Post, PostCreateInput, PostUpdateInput } from '@prisma/client';
import * as postRepository from '../../infrastructure/datasource/postRepository';
import { PostFilterParam } from '../../types/Post';

export const findPostById = async (id: number): Promise<Post | null> => {
  return await postRepository.findPostById(id);
};

export const findPosts = async (params: PostFilterParam): Promise<Post[]> => {
  return await postRepository.findPosts(params);
};

export const savePost = async (post: PostCreateInput): Promise<void> => {
  const postInput = {
    ...post,
  };
  return await postRepository.createPost(postInput);
};

export const updatePost = async (id: number, postUpdateInput: PostUpdateInput): Promise<void> => {
  return await postRepository.updatePost(id, postUpdateInput);
};
