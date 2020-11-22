import { User } from '@prisma/client';
import { prismaClient } from './client';

export const findUserByUid = async (uid: string): Promise<User | null> => {
  return await prismaClient.user.findOne({
    where: {
      uid,
    },
  });
};

export const createUser = async (user: User) => {
  await prismaClient.user.create({
    data: user,
  });
};
