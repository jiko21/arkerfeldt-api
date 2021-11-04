import { prismaClient } from '../../../src/infrastructure/datasource/client';
import { createUser, findUserByUid } from '../../../src/infrastructure/datasource/userRepository';
jest.mock('../../../src/infrastructure/datasource/client');

jest.mock('../../../src/infrastructure/datasource/client', () => ({
  prismaClient: {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    }
  }
}));

describe('userRepository.ts', () => {
  describe('findUserByUid', () => {
    let findFirstMock: jest.Mock;

    beforeEach(() => {
      findFirstMock = jest.fn();
      prismaClient.user.findFirst = findFirstMock;
    });

    afterEach(() => {
      findFirstMock.mockClear();
    });

    it('correctly calls when user exists', async () => {
      const UID = 'abc';
      const EXPECTED = {
        uid: UID,
        displayName: 'taro',
        photoUrl: 'aaa',
      };
      findFirstMock.mockReturnValueOnce(EXPECTED);
      const actual = await findUserByUid(UID);
      expect(actual).toBe(EXPECTED);
      expect(findFirstMock).toBeCalledWith({
        where: {
          uid: UID,
        },
      });
    });

    it('correctly calls when user not exists', async () => {
      const UID = 'abc';
      findFirstMock.mockReturnValueOnce(null);
      const actual = await findUserByUid(UID);
      expect(actual).toBe(null);
      expect(findFirstMock).toBeCalledWith({
        where: {
          uid: UID,
        },
      });
    });

    it('fails when error occured', async () => {
      const UID = 'abc';
      findFirstMock.mockRejectedValue({ msg: 'error' });
      try {
        await findUserByUid(UID);
      } catch (e) {
        expect(findFirstMock).toBeCalledWith({
          where: {
            uid: UID,
          },
        });
      }
    });
  });

  describe('createUser', () => {
    let createUserMock: jest.Mock;

    beforeEach(() => {
      createUserMock = jest.fn();
      prismaClient.user.create = createUserMock;
    });

    afterEach(() => {
      createUserMock.mockClear();
    });

    it('correctly calls when user successfully created', async () => {
      const USER = {
        uid: 'aaa',
        displayName: 'taro',
        photoUrl: 'aaa',
      };
      createUserMock.mockReturnValueOnce({});
      await createUser(USER);
      expect(createUserMock).toBeCalledWith({
        data: USER,
      });
    });

    it('fails when error occured', async () => {
      const USER = {
        uid: 'aaa',
        displayName: 'taro',
        photoUrl: 'aaa',
      };
      createUserMock.mockRejectedValue({ msg: 'error' });
      try {
        await createUser(USER);
      } catch (e) {
        expect(createUserMock).toBeCalledWith({
          data: USER,
        });
      }
    });
  });
});
