import { Request } from 'express';
import { InnerRequest } from '../../../../src/interfaces/api/handler/request';
import { createMockReq, createMockRes } from '../expressUtil';
import * as postUsecase from '../../../../src/application/usercase/postUsecase';
import { PublishStatus } from '../../../../src/types/Post';
import {
  createPost,
  getPostById,
  getPosts,
  putPost,
} from '../../../../src/interfaces/api/handler/postHandler';

const findPostsSpy = jest.spyOn(postUsecase, 'findPosts');
const findPostByIdSpy = jest.spyOn(postUsecase, 'findPostById');
const savePostSpy = jest.spyOn(postUsecase, 'savePost');
const updatePostSpy = jest.spyOn(postUsecase, 'updatePost');

describe('postHandler.ts', () => {
  describe('getPosts', () => {
    afterEach(() => {
      findPostsSpy.mockClear();
      jest.clearAllMocks();
    });

    it('correctly handle', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
      const PARAMS = {
        status: PublishStatus.PUBLISHED,
        title: 'hoge',
      };
      const req = createMockReq(ID_TOKEN);
      req.query = PARAMS;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      const expected = [
        {
          id: 1,
          title: 'A',
          content: 'AAA',
          createdAt: new Date('2020-12-12 12:00:00'),
          updatedAt: new Date('2020-12-12 12:00:00'),
          isDelete: false,
          status: PublishStatus.PUBLISHED,
          authorId: 'aaa',
        },
        {
          id: 2,
          title: 'A',
          content: 'AAA',
          createdAt: new Date('2020-12-12 12:00:00'),
          updatedAt: new Date('2020-12-12 12:00:00'),
          isDelete: false,
          status: PublishStatus.PUBLISHED,
          authorId: 'aaa',
        },
      ];
      findPostsSpy.mockResolvedValueOnce(expected);
      await getPosts(req, res);
      expect(findPostsSpy).toBeCalledWith(PARAMS);
      expect(res.json).toBeCalledWith({
        total: expected.length,
        posts: expected,
      });
    });

    it('500 when error occured', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
      const PARAMS = {
        status: PublishStatus.PUBLISHED,
        title: 'hoge',
      };
      const req = createMockReq(ID_TOKEN);
      req.query = PARAMS;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      findPostsSpy.mockRejectedValue(null);
      await getPosts(req, res);
      expect(findPostsSpy).toBeCalledWith(PARAMS);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({
        msg: 'internal_server_error',
      });
    });
  });

  describe('getPostById', () => {
    afterEach(() => {
      findPostByIdSpy.mockClear();
      jest.clearAllMocks();
    });

    it('correctly handle', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
      const ID = 1;
      const req = createMockReq(ID_TOKEN);
      req.params.id = `${ID}`;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      const expected = {
        id: 1,
        title: 'A',
        content: 'AAA',
        createdAt: new Date('2020-12-12 12:00:00'),
        updatedAt: new Date('2020-12-12 12:00:00'),
        isDelete: false,
        status: PublishStatus.PUBLISHED,
        authorId: 'aaa',
      };
      findPostByIdSpy.mockResolvedValueOnce(expected);
      await getPostById(req as Request<{ id: string }, any, any, any>, res);
      expect(findPostByIdSpy).toBeCalledWith(ID);
      expect(res.json).toBeCalledWith(expected);
    });

    it('404 when post is null', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
      const ID = 1;
      const req = createMockReq(ID_TOKEN);
      req.params.id = `${ID}`;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      findPostByIdSpy.mockResolvedValue(null);
      await getPostById(req as Request<{ id: string }, any, any, any>, res);
      expect(findPostByIdSpy).toBeCalledWith(ID);
      expect(res.status).toBeCalledWith(404);
      expect(res.json).toBeCalledWith({
        msg: 'not_found',
      });
    });

    it('500 when error occured', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
      const ID = 1;
      const req = createMockReq(ID_TOKEN);
      req.params.id = `${ID}`;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      findPostByIdSpy.mockRejectedValue(null);
      await getPostById(req as Request<{ id: string }, any, any, any>, res);
      expect(findPostByIdSpy).toBeCalledWith(ID);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({
        msg: 'internal_server_error',
      });
    });
  });

  describe('createPost', () => {
    afterEach(() => {
      savePostSpy.mockClear();
      jest.clearAllMocks();
    });

    it('correctly handle', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
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
      const req = createMockReq(ID_TOKEN);
      req.body = post;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      savePostSpy.mockResolvedValueOnce();
      await createPost(req, res);
      expect(savePostSpy).toBeCalledWith(post);
      expect(res.json).toBeCalledWith({
        msg: 'ok',
      });
    });

    it('500 when error occured', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
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
      const req = createMockReq(ID_TOKEN);
      req.body = post;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      savePostSpy.mockRejectedValue(null);
      await createPost(req, res);
      expect(savePostSpy).toBeCalledWith(post);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({
        msg: 'internal_server_error',
      });
    });
  });

  describe('putPost', () => {
    afterEach(() => {
      savePostSpy.mockClear();
      jest.clearAllMocks();
    });

    it('correctly handle', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
      const ID = 1;
      const post = {
        title: 'A',
        content: 'AAA',
      };
      const req = createMockReq(ID_TOKEN);
      req.body = post;
      req.params.id = `${ID}`;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      updatePostSpy.mockResolvedValueOnce();
      await putPost(req as Request<{ id: string }, any, any, any>, res);
      expect(updatePostSpy).toBeCalledWith(ID, post);
      expect(res.json).toBeCalledWith({
        msg: 'ok',
      });
    });

    it('500 when error occured', async () => {
      const ID_TOKEN = 'aaa';
      const UID = 'UID';
      const ID = 1;
      const post = {
        title: 'A',
        content: 'AAA',
      };
      const req = createMockReq(ID_TOKEN);
      req.body = post;
      req.params.id = `${ID}`;
      const res = createMockRes();
      (req as InnerRequest).uid = UID;
      updatePostSpy.mockRejectedValueOnce(null);
      await putPost(req as Request<{ id: string }, any, any, any>, res);
      expect(updatePostSpy).toBeCalledWith(ID, post);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({
        msg: 'internal_server_error',
      });
    });
  });
});
