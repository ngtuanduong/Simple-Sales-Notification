import {createOne} from '@functions/repositories/notificationRepository';
import createNotificationObject from '@functions/helpers/createNotificationObject';
import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {getShopByShopifyDomain} from '@avada/core';

/**
 * Handles new order webhook events from Shopify
 * Creates a notification when a new order is placed
 * @param {Object} ctx - Koa context object
 * @returns {Promise<void>} Resolves when notification is created
 */
export async function listenNewOrder(ctx) {
  try {
    const order = ctx.req.body;
    const shopDomain = ctx.request.header['x-shopify-shop-domain'];
    const shop = await getShopByShopifyDomain(shopDomain);
    const shopify = initShopify(shop);
    const query = loadGraphQL('/notification.graphql');
    const notificationGraphql = await shopify.graphql(query, {
      orderId: order.admin_graphql_api_id
    });

    await createOne(createNotificationObject(shop, notificationGraphql.order));
    ctx.body = {data: notificationGraphql, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], success: false};
  }
}
