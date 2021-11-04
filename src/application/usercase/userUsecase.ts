import * as userRepository from '../../infrastructure/datasource/userRepository';
import { User } from '../../generated/client';

export const saveUser = async (user: User) => {
  const exist = await userRepository.findUserByUid(user.uid);
  if (!exist) {
    await userRepository.createUser(user);
  }
};
