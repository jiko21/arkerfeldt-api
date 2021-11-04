import express from 'express';
import { postRouter } from './interfaces/api/router/postRouter';
import { userRouter } from './interfaces/api/router/userRouter';
import { serve, setup } from 'swagger-ui-express';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import path from 'path';
import swaggerCombine from 'swagger-combine';


export const app = express();

const SWAGGER_PATH = path.join(__dirname, '../swagger/api.yaml');
// const swaggerDocument = yaml.safeLoad(fs.readFileSync(SWAGGER_PATH, 'utf-8'));

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
app.use('/api-docs', serve);
swaggerCombine(SWAGGER_PATH).then((res) => {
  app.get('/api-docs', setup(res));
});
