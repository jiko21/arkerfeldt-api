import { Request, Response } from 'express';
import { verifyAndGetUserInfo } from '../../../service/auth/firebaseAuthService';
import { InnerRequest } from './request';
import { saveUser } from '../../../application/usercase/userUsecase';

export const saveUserHandler = async (req: Request, res: Response): Promise<void> => {
  const uid = (req as InnerRequest).uid;
  try {
    const userInfo = await verifyAndGetUserInfo(uid);
    await saveUser({
      uid: userInfo.uid,
      displayName: userInfo.displayName ? userInfo.displayName : '',
      photoUrl: userInfo.photoURL ? userInfo.photoURL : null,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      msg: 'internal_server_error',
    });
  }
  res.json({
    msg: 'ok',
  });
};
