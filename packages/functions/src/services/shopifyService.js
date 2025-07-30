import {getShopByShopifyDomain, prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';
import Shopify from 'shopify-api-node';
import {isEmpty} from '@avada/utils';
import appConfig from '../config/app';
import {create} from '@functions/repositories/notificationRepository';
import {updateOne} from '@functions/repositories/settingRepository';
import defaultSetting from '@functions/const/defaultSetting';
import createNotificationObject from '@functions/helpers/createNotificationObject';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
export const API_VERSION = '2024-04';

/**
 * Create Shopify instance with the latest API version and auto limit enabled
 *
 * @param {Shop} shopData
 * @param {string} apiVersion
 * @return {Shopify}
 */
export function initShopify(shopData, apiVersion = API_VERSION) {
  const shopParsedData = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const {shopifyDomain, accessToken} = shopParsedData;
  console.log('accessToken:', accessToken);
  return new Shopify({
    shopName: shopifyDomain,
    accessToken,
    apiVersion,
    autoLimit: true
  });
}

/**
 *
 * @returns {Promise<Shopify.IWebhook>}
 * @param shopify
 */
export async function createWebhooks(shopify) {
  const currentWebhooks = await shopify.webhook.list();
  const unusedWebhooks = currentWebhooks.filter(
    webhook => !webhook.address.includes(appConfig.baseUrl)
  );
  if (!isEmpty(unusedWebhooks)) {
    await Promise.all(unusedWebhooks.map(webhook => shopify.webhook.delete(webhook.id)));
  }

  const webhooks = await shopify.webhook.list({
    address: `https://${appConfig.baseUrl}/webhook/orders/new`
  });
  if (webhooks.length === 0) {
    return shopify.webhook.create({
      topic: 'orders/create',
      address: `https://${appConfig.baseUrl}/webhook/orders/new`,
      format: 'json'
    });
  }
}

/**
 *
 * @param shopify
 * @param shop
 * @returns {Promise<void>}
 */
export async function syncOrders(shopify, shop) {
  const query = loadGraphQL('/notifications.graphql');
  const result = await shopify.graphql(query, {
    first: 30
  });
  console.dir(result, {depth: null});
  await create(result.orders.edges.map(order => createNotificationObject(shop, order.node)));
  console.log(
    `Successfully created ${result.orders.edges.length} notifications for shop ${shopify.options.shopName}`
  );
}

/**
 *
 * @returns {Promise<void>}
 * @param shopDomain
 * @param shopify
 */
export async function registerScriptTag(shopDomain, shopify) {
  // register scriptTag
  await shopify.scriptTag.create({
    event: 'onload',
    src: 'https://localhost:5000/scripttag/avada-sale-pop.min.js'
  });
  console.log(`Successfully register scriptTag for shop ${shopify.options.shopName}`);
}

/**
 *
 * @param shop
 * @returns {Promise<void>}
 */
export async function createDefaultSetting(shop) {
  await updateOne(shop, defaultSetting);
  console.log(`Successfully create default setting for shop ${shop.name}`);
}
