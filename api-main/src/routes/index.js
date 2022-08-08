import { Router } from 'express';
import * as fruits from './fruits.js'

const routes = Router();

routes.get('/fruits', fruits.findAll);
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;