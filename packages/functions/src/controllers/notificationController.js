import {getCurrentShop} from '@functions/helpers/auth';
import {get} from '@functions/repositories/notificationRepository';
import {getOne} from '@functions/repositories/notificationRepository';
export async function getOneNotification(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const data = await getOne(shopData.id);
    ctx.body = {data, shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}

export async function getNotifications(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    console.log(shopId);
    const data = await get({id: shopId});
    ctx.body = {data, shopId, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}
