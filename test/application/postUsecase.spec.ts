import { findPostById, findPosts, savePost } from '../../src/application/usercase/postUsecase';
import * as postRepository from '../../src/infrastructure/datasource/postRepository';
import { PublishStatus } from '../../src/types/Post';

describe('userUsecase.ts', () => {
  describe('findPostById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('correctly find post by id', async () => {
      const id = 1;
      const post = {
        id,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        authorId: 'aaa',
      };
      jest.spyOn(postRepository, 'findPostById').mockResolvedValueOnce(post);
      const rslt = await findPostById(id);
      expect(postRepository.findPostById).toBeCalledWith(id);
      expect(rslt).toBe(post);
    });

    it('return null when id of post is not found', async () => {
      const id = 1;
      jest.spyOn(postRepository, 'findPostById').mockResolvedValueOnce(null);
      const rslt = await findPostById(id);
      expect(postRepository.findPostById).toBeCalledWith(id);
      expect(rslt).toBeNull();
    });

    it('throws error when repository throws error', async () => {
      const id = 1;
      jest.spyOn(postRepository, 'findPostById').mockRejectedValueOnce({ msg: 'error' });
      try {
        await findPostById(id);
      } catch (e) {
        expect(postRepository.findPostById).toBeCalledWith(id);
      }
    });
  });

  describe('findPosts', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('correctly find posts by params', async () => {
      const post = {
        id: 1,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        authorId: 'aaa',
      };
      const params = {
        title: 'a',
        status: PublishStatus.PUBLISHED,
      };
      jest.spyOn(postRepository, 'findPosts').mockResolvedValueOnce([post]);
      const rslt = await findPosts(params);
      expect(postRepository.findPosts).toBeCalledWith(params);
      expect(rslt).toEqual([post]);
    });

    it('return null when id of post is not found', async () => {
      const params = {
        title: 'a',
        status: PublishStatus.PUBLISHED,
      };
      jest.spyOn(postRepository, 'findPosts').mockResolvedValueOnce([]);
      const rslt = await findPosts(params);
      expect(postRepository.findPosts).toBeCalledWith(params);
      expect(rslt).toEqual([]);
    });

    it('throws error when repository throws error', async () => {
      const params = {
        title: 'a',
        status: PublishStatus.PUBLISHED,
      };
      jest.spyOn(postRepository, 'findPosts').mockRejectedValueOnce({ msg: 'error' });
      try {
        await findPosts(params);
      } catch (e) {
        expect(postRepository.findPosts).toBeCalledWith(params);
      }
    });
  });

  describe('saveUser', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('correctly calls when user not exists', async () => {
      const uid = 'aaa';
      const post = {
        id: 1,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        authorId: uid,
      };
      jest.spyOn(postRepository, 'createPost').mockResolvedValueOnce();
      await savePost(post);
      expect(postRepository.createPost).toBeCalledWith({
        ...post,
        author: {
          connect: {
            uid,
          },
        },
      });
    });

    it('fails when error occured in createUser', async () => {
      const uid = 'aaa';
      const post = {
        id: 1,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        authorId: uid,
      };
      jest.spyOn(postRepository, 'createPost').mockRejectedValueOnce({ msg: 'error' });
      try {
        await savePost(post);
      } catch (e) {
        expect(postRepository.createPost).toBeCalledWith({
          ...post,
          author: {
            connect: {
              uid,
            },
          },
        });
      }
    });
  });
});
