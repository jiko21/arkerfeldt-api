import Admin from 'firebase-admin';
import admin from './admin';

export const verifyIdToken = async (idToken: string) => {
  const token = await admin.auth().verifyIdToken(idToken);
  return token.uid;
};

export const verifyAndGetUserInfo = async (idToken: string): Promise<Admin.auth.UserRecord> => {
  const token = await admin.auth().verifyIdToken(idToken);
  return await admin.auth().getUser(token.uid);
};
