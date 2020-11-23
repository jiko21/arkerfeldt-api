import { authMiddleware } from '../../../../src/interfaces/api/middleware/authMiddleware';
import * as authService from '../../../../src/service/auth/firebaseAuthService';
import { createMockReq, createMockRes } from '../expressUtil';

describe('authMiddleware.ts', () => {
  describe('authMiddleware', () => {
    let nextMock: jest.Mock;

    beforeEach(() => {
      nextMock = jest.fn();
    });

    afterEach(() => {
      nextMock.mockClear();
      jest.clearAllMocks();
    });

    it('should correctly exec when idToken is valid', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'bbb';
      const req = createMockReq(ID_TOKEN);
      const res = createMockRes();
      jest.spyOn(authService, 'verifyIdToken').mockResolvedValueOnce(UID);
      await authMiddleware(req, res, nextMock);
      expect(authService.verifyIdToken).toHaveBeenCalledWith(ID_TOKEN);
      expect(nextMock).toHaveBeenCalled();
      expect(res.status).not.toBeCalled();
      expect(res.send).not.toBeCalled();
    });

    it('should correctly exec when idToken is invalid', async () => {
      const ID_TOKEN = 'aaa';
      const req = createMockReq(ID_TOKEN);
      const res = createMockRes();
      jest.spyOn(authService, 'verifyIdToken').mockRejectedValue(null);
      try {
        await authMiddleware(req, res, nextMock);
      } catch (e) {
        expect(authService.verifyIdToken).toHaveBeenCalledWith(ID_TOKEN);
        expect(nextMock).not.toHaveBeenCalled();
        expect(res.status).not.toBeCalledWith(403);
        expect(res.send).toBeCalled();
      }
    });
    it('should correctly return 403 when auth header is noe', async () => {
      const req = createMockReq(undefined);
      const res = createMockRes();
      jest.spyOn(authService, 'verifyIdToken').mockRejectedValue(null);
      try {
        await authMiddleware(req, res, nextMock);
      } catch (e) {
        expect(authService.verifyIdToken).not.toBeCalled();
        expect(nextMock).not.toHaveBeenCalled();
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalled();
      }
    });
  });
});
