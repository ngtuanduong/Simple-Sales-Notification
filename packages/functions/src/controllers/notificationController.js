import {getCurrentShop, getCurrentShopData} from '@functions/helpers/auth';
import {create, createOne, get, getOne} from '@functions/repositories/notificationRepository';

export async function getOneNotification(ctx) {
  try {
    const shopId = getCurrentShopData(ctx);
    const data = await getOne(shopId);
    ctx.body = {data, shopId, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}

export async function getNotifications(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const {after, before, limit, hasCount} = ctx.query;
    const data = await get({
      after,
      before,
      limit: limit ? parseInt(limit) : 10,
      hasCount: hasCount === 'true',
      shopId
    });
    ctx.body = {...data, shopId, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}

export async function createOneNotification(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const input = ctx.req.body;
    const data = await createOne(input, shopId);
    ctx.body = {data, shopId, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}

export async function createNotifications(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const input = ctx.req.body;
    const data = await create(input, shopId);
    ctx.body = {data, shopId, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}
