import { Post, PostCreateInput } from '@prisma/client';
import { PostFilterParam } from '../../types/Post';
import { prismaClient } from './client';

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
  await prismaClient.post.create({
    data: post,
  });
};
