import {getByDomain} from '@functions/repositories/notificationRepository';
import {getOneByDomain} from '@functions/repositories/settingRepository';
import moment from 'moment';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotifications(ctx) {
  try {
    const shopDomain = ctx.req.query.shop;
    const notifications = await getByDomain({domain: shopDomain});

    const updatedNotifications = notifications.map(notification => {
      return {
        ...notification,
        timeAgo: moment(notification.timestamp).fromNow()
      };
    });
    const setting = await getOneByDomain(shopDomain);
    const data = {
      settings: setting,
      notifications: updatedNotifications
    };

    ctx.body = {...data};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopDomain: '', success: false};
  }
}
