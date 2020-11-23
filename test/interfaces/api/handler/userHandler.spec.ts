import Admin from 'firebase-admin';
import { InnerRequest } from '../../../../src/interfaces/api/handler/request';
import { createMockReq, createMockRes } from '../expressUtil';
import * as firebaseAuthService from '../../../../src/service/auth/firebaseAuthService';
import * as userUsecase from '../../../../src/application/usercase/userUsecase';
import { saveUserHandler } from '../../../../src/interfaces/api/handler/userHandler';

const saveUserSpy = jest.spyOn(userUsecase, 'saveUser');

describe('userHandler.ts', () => {
  describe('saveUserHandler', () => {
    afterEach(() => {
      saveUserSpy.mockClear();
      jest.clearAllMocks();
    });

    it('correctly handle', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'bbb';
      const req = createMockReq(ID_TOKEN);
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      jest.spyOn(firebaseAuthService, 'verifyAndGetUserInfo').mockResolvedValueOnce({
        uid: UID,
        displayName: 'aa',
        photoURL: 'bb',
      } as Admin.auth.UserRecord);
      saveUserSpy.mockResolvedValueOnce();
      await saveUserHandler(req, res);
      expect(firebaseAuthService.verifyAndGetUserInfo).toBeCalledWith(UID);
      expect(saveUserSpy).toBeCalledWith({
        uid: UID,
        displayName: 'aa',
        photoUrl: 'bb',
      });
      expect(res.json).toBeCalledWith({
        msg: 'ok',
      });
    });

    it('call error when verify failed', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'bbb';
      const req = createMockReq(ID_TOKEN);
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      jest.spyOn(firebaseAuthService, 'verifyAndGetUserInfo').mockRejectedValueOnce(null);
      saveUserSpy.mockResolvedValueOnce();
      await saveUserHandler(req, res);
      expect(firebaseAuthService.verifyAndGetUserInfo).toBeCalledWith(UID);
      expect(saveUserSpy).not.toBeCalled();
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({
        msg: 'internal_server_error',
      });
    });
  });
});
