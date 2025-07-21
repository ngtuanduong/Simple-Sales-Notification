import {getByDomain} from '@functions/repositories/notificationRepository';
import {getOneByDomain} from '@functions/repositories/settingRepository';
/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getNotifications(ctx) {
  try {
    const shopDomain = ctx.query.domain;
    const notifications = await getByDomain(shopDomain);
    const setting = getOneByDomain(shopDomain);
    const data = {
      ...setting,
      ...notifications
    };
    ctx.body = {data, shopDomain, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopDomain: '', success: false};
  }
}
