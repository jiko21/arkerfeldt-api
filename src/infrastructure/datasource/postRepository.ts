import { PostFilterParam } from '../../types/Post';
import { prismaClient } from './client';
import { Post, PostCreateInput, PostUpdateInput } from "../../generated/client";

export const findPostById = async (id: number): Promise<Post | null> => {
  return await prismaClient.post.findOne({
    where: {
      id: id,
    },
    include: { author: true },
  });
};

export const findPosts = async (params: PostFilterParam): Promise<Post[]> => {
  return await prismaClient.post.findMany({
    where: {
      AND: [
        {
          title: params.title,
        },
        {
          status: params.status,
        },
        {
          isDelete: false,
        },
      ],
    },
    include: { author: true },
  });
};

export const createPost = async (post: PostCreateInput) => {
  try {
    await prismaClient.post.create({
      data: post,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updatePost = async (id: number, postUpdateInput: PostUpdateInput) => {
  await prismaClient.post.update({
    where: { id },
    data: {
      ...postUpdateInput,
    },
  });
};
