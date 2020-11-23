import Admin from 'firebase-admin';
import admin from './admin';

export const verifyIdToken = async (idToken: string) => {
  const token = await admin.auth().verifyIdToken(idToken);
  return token.uid;
};

export const verifyAndGetUserInfo = async (uid: string): Promise<Admin.auth.UserRecord> => {
  return await admin.auth().getUser(uid);
};
