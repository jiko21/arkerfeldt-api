import { Request, Response, NextFunction } from 'express';
import { verifySessionCookie } from "../../../service/auth/firebaseAuthService";
import { InnerRequest } from '../handler/request';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.header('Authorization');
  if (!idToken) {
    res.status(403).send();
  }
  try {
    (req as InnerRequest).uid = await verifySessionCookie(idToken as string);
  } catch (e) {
    res.status(403).send();
  }
  next();
};
