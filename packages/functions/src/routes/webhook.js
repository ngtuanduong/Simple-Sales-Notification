import Router from 'koa-router';
import * as webhookController from '@functions/controllers/webhookController';

export default function webhookRouter() {
  const router = new Router({prefix: '/webhook'});

  router.post('/products/create', webhookController.listenNewProduct);
  return router;
}
