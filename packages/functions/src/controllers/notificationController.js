import {getCurrentShop, getCurrentShopData} from '@functions/helpers/auth';
import {create, createOne, get, getOne} from '@functions/repositories/notificationRepository';

/**
 * Retrieves a single notification by ID for the current authenticated shop
 * @param {Object} ctx - Koa context object
 * @returns {Promise<void>} Resolves with notification data
 */
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

/**
 * Retrieves paginated notifications for the current authenticated shop
 * Supports pagination with cursor-based navigation
 * @param {Object} ctx - Koa context object
 * @returns {Promise<void>} Resolves with paginated notification data
 */
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

/**
 * Creates a single notification for the current authenticated shop
 * @param {Object} ctx - Koa context object
 * @returns {Promise<void>} Resolves when notification is created
 */
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

/**
 * Creates multiple notifications for the current authenticated shop using batch operations
 * @param {Object} ctx - Koa context object
 * @returns {Promise<void>} Resolves when all notifications are created
 */
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
