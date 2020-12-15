import { prismaClient } from '../../../src/infrastructure/datasource/client';
import {
  findPostById,
  findPosts,
  createPost,
  updatePost,
} from '../../../src/infrastructure/datasource/postRepository';
import { PublishStatus } from '../../../src/types/Post';
jest.mock('../../../src/infrastructure/datasource/client');

describe('postRepository.ts', () => {
  describe('findPostById', () => {
    let findOneMock: jest.Mock;

    beforeEach(() => {
      findOneMock = jest.fn();
      prismaClient.post.findOne = findOneMock;
    });

    afterEach(() => {
      findOneMock.mockClear();
    });

    it('correctly calls when post exists', async () => {
      const ID = 1;
      const EXPECTED = {
        id: ID,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        author: {
          uid: 'aaa',
          displayName: 'taro',
          photoUrl: 'aaa',
        },
      };
      findOneMock.mockReturnValueOnce(EXPECTED);
      const actual = await findPostById(ID);
      expect(actual).toBe(EXPECTED);
      expect(findOneMock).toBeCalledWith({
        where: {
          id: ID,
        },
        include: { author: true },
      });
    });

    it('correctly calls when user not exists', async () => {
      const ID = 1;
      findOneMock.mockReturnValueOnce(null);
      const actual = await findPostById(ID);
      expect(actual).toBe(null);
      expect(findOneMock).toBeCalledWith({
        where: {
          id: ID,
        },
        include: { author: true },
      });
    });

    it('fails when error occured', async () => {
      const ID = 1;
      findOneMock.mockRejectedValue({ msg: 'error' });
      try {
        await findPostById(ID);
      } catch (e) {
        expect(findOneMock).toBeCalledWith({
          where: {
            id: ID,
          },
          include: { author: true },
        });
      }
    });
  });

  describe('findPosts', () => {
    let findManyMock: jest.Mock;

    beforeEach(() => {
      findManyMock = jest.fn();
      prismaClient.post.findMany = findManyMock;
    });

    afterEach(() => {
      findManyMock.mockClear();
    });

    it('correctly calls when post exists', async () => {
      const params = {
        title: 'a',
        status: PublishStatus.PUBLISHED,
      };

      const EXPECTED = {
        id: 1,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        author: {
          uid: 'aaa',
          displayName: 'taro',
          photoUrl: 'aaa',
        },
      };
      findManyMock.mockReturnValueOnce([EXPECTED]);
      const actual = await findPosts(params);
      expect(actual).toEqual([EXPECTED]);
      expect(findManyMock).toBeCalledWith({
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
    });

    it('correctly calls when user not exists', async () => {
      const params = {
        title: 'a',
        status: PublishStatus.PUBLISHED,
      };
      findManyMock.mockReturnValueOnce(null);
      const actual = await findPosts(params);
      expect(actual).toBe(null);
      expect(findManyMock).toBeCalledWith({
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
    });

    it('fails when error occured', async () => {
      const params = {
        title: 'a',
        status: PublishStatus.PUBLISHED,
      };

      findManyMock.mockRejectedValue({ msg: 'error' });
      try {
        await findPosts(params);
      } catch (e) {
        expect(findManyMock).toBeCalledWith({
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
      }
    });
  });

  describe('createPost', () => {
    let createPostMock: jest.Mock;

    beforeEach(() => {
      createPostMock = jest.fn();
      prismaClient.post.create = createPostMock;
    });

    afterEach(() => {
      createPostMock.mockClear();
    });

    it('correctly calls when post successfully created', async () => {
      const POST = {
        id: 1,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        author: {
          connect: {
            uid: 'aaa',
          },
        },
      };
      createPostMock.mockReturnValueOnce({});
      await createPost(POST);
      expect(createPostMock).toBeCalledWith({
        data: POST,
      });
    });

    it('fails when error occured', async () => {
      const POST = {
        id: 1,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        author: {
          connect: {
            uid: 'aaa',
          },
        },
      };
      createPostMock.mockRejectedValue({ msg: 'error' });
      try {
        await createPost(POST);
      } catch (e) {
        expect(createPostMock).toBeCalledWith({
          data: POST,
        });
      }
    });
  });

  describe('updatePost', () => {
    let updatePostMock: jest.Mock;

    beforeEach(() => {
      updatePostMock = jest.fn();
      prismaClient.post.update = updatePostMock;
    });

    afterEach(() => {
      updatePostMock.mockClear();
    });

    it('correctly calls when post successfully update', async () => {
      const ID = 1;
      const postUpdateInput = {
        title: 'A',
        content: 'AAA',
        status: PublishStatus.PUBLISHED,
      };
      updatePostMock.mockReturnValueOnce({});
      await updatePost(ID, postUpdateInput);
      expect(updatePostMock).toBeCalledWith({
        where: { id: ID },
        data: {
          ...postUpdateInput,
        },
      });
    });

    it('fails when error occured', async () => {
      const ID = 1;
      const postUpdateInput = {
        title: 'A',
        content: 'AAA',
        status: PublishStatus.PUBLISHED,
      };
      updatePostMock.mockRejectedValue({ msg: 'error' });
      try {
        await updatePost(ID, postUpdateInput);
      } catch (e) {
        expect(updatePostMock).toBeCalledWith({
          where: { id: ID },
          data: {
            ...postUpdateInput,
          },
        });
      }
    });
  });
});
