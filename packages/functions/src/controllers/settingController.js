import {getCurrentShopData} from '@functions/helpers/auth';
import * as settingRepository from '@functions/repositories/settingRepository';

/**
 * Retrieves settings for the current authenticated shop
 * Initializes Shopify service and returns formatted settings data
 * @param {Object} ctx - Koa context object
 * @returns {Promise<void>} Resolves with shop settings data
 */
export async function getOneSetting(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const data = await settingRepository.getOne(shopData.id);
    ctx.body = {data, shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}

/**
 * Updates settings for the current authenticated shop
 * Merges new settings with existing data and updates timestamp
 * @param {Object} ctx - Koa context object
 * @returns {Promise<void>} Resolves when settings are updated
 */
export async function updateOneSetting(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const data = await settingRepository.updateOne(shopData, ctx.req.body);
    ctx.body = {data, shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}
