import { Request } from 'express';

export interface InnerRequest extends Request {
  uid: string;
}
