import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { checksRoutes } from './express/routes';
import errorHandler from './express/error-handler';
import { createDb } from './db';

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'develepment') {
  app.use(morgan('dev'));
}

app.use('/api/v1/checks', checksRoutes);

app.use(errorHandler);

(async () => {
  try {
    await createDb();
    app.listen(process.env.APP_PORT);
  } catch (error) {
    console.error(error);
  }
})();
