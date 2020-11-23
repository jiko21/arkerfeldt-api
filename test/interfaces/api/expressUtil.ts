import { Request, Response } from 'express';

export const createMockReq = (idToken: string | undefined): Request => {
  const req = {} as Request;
  req.header = jest.fn().mockImplementation((param: string) => {
    if (param === 'Authorization') return idToken;
    return undefined;
  });
  return req;
};

export const createMockRes = () => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
