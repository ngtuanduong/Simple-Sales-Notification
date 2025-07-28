import {getShopByShopifyDomain, prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';
import Shopify from 'shopify-api-node';
import {isEmpty} from '@avada/utils';
import appConfig from '../config/app';
import {create} from '@functions/repositories/notificationRepository';
import {updateOne} from '@functions/repositories/settingRepository';
import defaultSetting from '@functions/const/defaultSetting';
import createNotificationObject from '@functions/helpers/createNotificationObject';
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
    address: `https://${appConfig.baseUrl}/webhook/products/create`
  });
  if (webhooks.length === 0) {
    return shopify.webhook.create({
      topic: 'products/create',
      address: `https://${appConfig.baseUrl}/webhook/products/create`,
      format: 'json'
    });
  }
}

/**
 *
 * @param shopDomain
 * @param shopify
 * @param shop
 * @returns {Promise<void>}
 */
export async function syncOrders({shopDomain, shopify, shop}) {
  const orders = await shopify.order.list({status: 'any', limit: 30, orderBy: 'created_at DESC'});
  // add notifications
  await create(orders.map(order => createNotificationObject({shop, shopDomain, order})));
  console.log(
    `Successfully created ${orders.length} notifications for shop ${shopify.options.shopName}`
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
    src: 'https://cdn.jsdelivr.net/gh/ngtuanduong/testV2-6/avada-sale-pop.min.js'
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
