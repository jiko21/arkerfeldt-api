import { saveUser } from '../../src/application/usercase/userUsecase';
import * as userRepository from '../../src/infrastructure/datasource/userRepository';

describe('userUsecase.ts', () => {
  describe('saveUser', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('correctly calls when user exists', async () => {
      const UID = 'abc';
      const EXPECTED = {
        uid: UID,
        displayName: 'taro',
        photoUrl: 'aaa',
      };
      jest.spyOn(userRepository, 'findUserByUid').mockResolvedValueOnce(EXPECTED);
      jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce();
      await saveUser(EXPECTED);
      expect(userRepository.findUserByUid).toBeCalledWith(UID);
      expect(userRepository.createUser).not.toBeCalled();
    });

    it('correctly calls when user not exists', async () => {
      const UID = 'abc';
      const EXPECTED = {
        uid: UID,
        displayName: 'taro',
        photoUrl: 'aaa',
      };
      jest.spyOn(userRepository, 'findUserByUid').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce();
      await saveUser(EXPECTED);
      expect(userRepository.findUserByUid).toBeCalledWith(UID);
      expect(userRepository.createUser).toBeCalledWith(EXPECTED);
    });

    it('fails when error occured in findUserByUid', async () => {
      const UID = 'abc';
      const EXPECTED = {
        uid: UID,
        displayName: 'taro',
        photoUrl: 'aaa',
      };
      jest.spyOn(userRepository, 'findUserByUid').mockRejectedValueOnce({ msg: 'error' });
      try {
        await saveUser(EXPECTED);
      } catch (e) {
        expect(userRepository.findUserByUid).toBeCalledWith(UID);
        expect(userRepository.createUser).not.toHaveBeenCalled();
      }
    });

    it('fails when error occured in createUser', async () => {
      const UID = 'abc';
      const EXPECTED = {
        uid: UID,
        displayName: 'taro',
        photoUrl: 'aaa',
      };
      jest.spyOn(userRepository, 'findUserByUid').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'createUser').mockRejectedValueOnce({ msg: 'error' });
      try {
        await saveUser(EXPECTED);
      } catch (e) {
        expect(userRepository.findUserByUid).toBeCalledWith(UID);
        expect(userRepository.createUser).toBeCalledWith(EXPECTED);
      }
    });
  });
});
