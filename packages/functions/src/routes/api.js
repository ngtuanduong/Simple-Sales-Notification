import Router from 'koa-router';
import * as shopController from '@functions/controllers/shopController';
import * as appController from '@functions/controllers/appController';

import * as settingController from '@functions/controllers/settingController';
import * as notificationController from '@functions/controllers/notificationController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/shops', shopController.getUserShops);
  router.get('/settings', settingController.getOneSetting);
  router.put('/settings', settingController.updateOneSetting);
  router.get('/notifications', notificationController.getOneNotification);
  router.get('/notifications/many', notificationController.getNotifications);
  router.post('/notifications', notificationController.createOneNotification);
  router.post('/notifications/many', notificationController.createNotifications);
  router.get('/activation', appController.getActivation);
  router.get('/activation/toggle', appController.changeActivation);
  return router;
}
