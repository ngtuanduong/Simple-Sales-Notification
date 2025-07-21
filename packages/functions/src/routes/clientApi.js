import Router from 'koa-router';
import * as clientController from '../controllers/clientController';

export default function clientApiRouter() {
  const router = new Router({prefix: '/clientApi'});

  router.get('/notifications', clientController.getNotifications);
  return router;
}
