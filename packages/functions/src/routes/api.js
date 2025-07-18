import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as webhookController from '@functions/controllers/webhookController';
import * as settingController from '@functions/controllers/settingController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/settings', settingController.getOneSetting);
  router.put('/settings', settingController.updateOneSetting);
  router.post('/webhook/order-created', webhookController.handleOrderCreated);
  return router;
}
