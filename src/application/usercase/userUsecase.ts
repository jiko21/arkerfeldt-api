import { User } from '@prisma/client';
import * as userRepository from '../../infrastructure/datasource/userRepository';

export const saveUser = async (user: User) => {
  const exist = await userRepository.findUserByUid(user.uid);
  if (!exist) {
    await userRepository.createUser(user);
  }
};
