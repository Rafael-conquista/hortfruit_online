import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

const listen = () => {
  app.listen(8000,  () => {
      console.log(`App listening at 8000 port`);
  });
}

const setMiddleware = () => {
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.use(routes);
}

setMiddleware()
listen()

export default app;