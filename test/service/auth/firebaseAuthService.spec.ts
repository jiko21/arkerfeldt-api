import admin from '../../../src/service/auth/admin';
import { verifyAndGetUserInfo, verifyIdToken } from '../../../src/service/auth/firebaseAuthService';

const authMock = jest.spyOn(admin, 'auth');

describe('firebaseAuthService.ts', () => {
  let verifyIdTokenMock: jest.Mock;
  let getUserMock: jest.Mock;
  beforeEach(() => {
    verifyIdTokenMock = jest.fn();
    getUserMock = jest.fn();
    authMock.mockReturnValue({
      verifyIdToken: verifyIdTokenMock,
      getUser: getUserMock,
    } as any);
  });

  afterEach(() => {
    verifyIdTokenMock.mockClear();
    authMock.mockClear();
    getUserMock.mockClear();
  });

  describe('verifyIdToken', () => {
    it('correctly call', async () => {
      const TOKEN = '123';
      const UID = 'aaa';
      verifyIdTokenMock.mockResolvedValueOnce({
        uid: UID,
      });
      const result = await verifyIdToken(TOKEN);
      expect(verifyIdTokenMock).toHaveBeenCalledWith(TOKEN);
      expect(result).toBe(UID);
    });

    it('exception occured', async () => {
      const TOKEN = '123';
      verifyIdTokenMock.mockRejectedValueOnce({ msg: 'error' });
      try {
        await verifyIdToken(TOKEN);
      } catch (e) {
        expect(verifyIdTokenMock).toHaveBeenCalledWith(TOKEN);
      }
    });
  });

  describe('verifyAndGetUserInfo', () => {
    it('correctly call', async () => {
      const TOKEN = '123';
      const UID = 'aaa';
      verifyIdTokenMock.mockResolvedValueOnce({
        uid: UID,
      });
      getUserMock.mockResolvedValueOnce({
        uid: UID,
      });
      const result = await verifyAndGetUserInfo(TOKEN);
      expect(verifyIdTokenMock).toHaveBeenCalledWith(TOKEN);
      expect(getUserMock).toHaveBeenCalledWith(UID);
      expect(result).toEqual({
        uid: UID,
      });
    });

    it('exception occured in getToken', async () => {
      const TOKEN = '123';
      verifyIdTokenMock.mockRejectedValueOnce({ msg: 'error' });
      try {
        await verifyIdToken(TOKEN);
      } catch (e) {
        expect(verifyIdTokenMock).toHaveBeenCalledWith(TOKEN);
      }
    });

    it('exception occured in getUser', async () => {
      const TOKEN = '123';
      const UID = 'aaa';
      verifyIdTokenMock.mockResolvedValueOnce({
        uid: UID,
      });
      getUserMock.mockRejectedValueOnce({ msg: 'error' });
      try {
        await verifyIdToken(TOKEN);
      } catch (e) {
        expect(verifyIdTokenMock).toHaveBeenCalledWith(TOKEN);
        expect(getUserMock).toHaveBeenCalledWith(UID);
      }
    });
  });
});
