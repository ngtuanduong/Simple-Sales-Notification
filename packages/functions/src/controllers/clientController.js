import {get, getByDomain} from '@functions/repositories/notificationRepository';
import {getOneByDomain} from '@functions/repositories/settingRepository';
import moment from 'moment';

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotifications(ctx) {
  try {
    const {shop} = ctx.query;
    const notifications = await getByDomain(shop);
    console.log(notifications);
    const updatedNotifications = notifications.map(notification => {
      return {
        ...notification,
        timeAgo: moment(notification.created_at).fromNow()
      };
    });
    const setting = await getOneByDomain(shop);
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
