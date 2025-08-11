import {getCurrentShopData} from '@functions/helpers/auth';
import {initShopify} from '@functions/services/shopifyService';

/**
 * Retrieves activation status by checking the presence of script tags for the current shop.
 *
 * @param {Object} ctx - The context object, typically containing request and response information.
 * @return {Promise<void>} Resolves with activation status and shop data on success, or error response on failure.
 */
export async function getActivation(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const shopify = initShopify(shopData);
    const scriptTag = await shopify.scriptTag.list();
    ctx.body = {data: {activation: scriptTag.length > 0}, shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}

/**
 * Toggles the activation state of a Shopify script tag for a shop.
 *
 * @param {Object} ctx - The context object representing the request and response. It contains the shop's information and necessary details for the operation.
 * @return {Promise<void>} Resolves with no return value. Updates the response body in the context object (`ctx.body`) with the operation result, including the activation state, shop data, and success status.
 */
export async function changeActivation(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const shopify = initShopify(shopData);
    const scriptTag = await shopify.scriptTag.list();
    if (scriptTag.length > 0) {
      await shopify.scriptTag.delete(scriptTag[0].id);
      ctx.body = {data: {activation: false}, shopData, success: true};
    } else {
      await shopify.scriptTag.create({
        event: 'onload',
        src: 'https://localhost:5000/scripttag/avada-sale-pop.min.js'
      });
      ctx.body = {data: {activation: true}, shopData, success: true};
    }
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}
