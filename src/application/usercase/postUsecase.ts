import * as postRepository from '../../infrastructure/datasource/postRepository';
import { PostFilterParam } from '../../types/Post';
import { Post, Prisma } from "../../generated/client";
import PostCreateInput = Prisma.PostCreateInput;
import PostUpdateInput = Prisma.PostUpdateInput;

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
