import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import router from './src/routes';

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors())
app.use(express.json());
app.use('/api', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
