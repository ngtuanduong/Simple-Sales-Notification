import {prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';
import Shopify from 'shopify-api-node';
import {isEmpty} from '@avada/utils';
import appConfig from '../config/app';
import * as notificationRepository from '@functions/repositories/notificationRepository';
import {updateOne} from '@functions/repositories/settingRepository';
import defaultSetting from '@functions/const/defaultSetting';
import prepareNotification from '@functions/helpers/prepareNotification';
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
  return new Shopify({
    shopName: shopifyDomain,
    accessToken,
    apiVersion,
    autoLimit: true
  });
}

/**
 * Creates webhooks for order notifications
 * @param {Shopify} shopify - Shopify API instance
 * @returns {Promise<Shopify.IWebhook>}
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
 * Syncs recent orders and creates notifications
 * @param {Shopify} shopify - Shopify API instance
 * @param {Object} shop - Shop data object
 * @returns {Promise<void>}
 */
export async function syncOrders(shopify, shop) {
  const query = loadGraphQL('/notifications.graphql');
  const result = await shopify.graphql(query, {
    first: 30
  });
  await notificationRepository.create(
    result.orders.edges.map(order => prepareNotification(shop, order.node))
  );
  console.log(
    `Successfully created ${result.orders.edges.length} notifications for shop ${shopify.options.shopName}`
  );
}

/**
 * Registers script tag for the shop
 * @param {string} shopDomain - Shop domain
 * @param {Shopify} shopify - Shopify API instance
 * @returns {Promise<void>}
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
 * Creates default settings for the shop
 * @param {Object} shop - Shop data object
 * @returns {Promise<void>}
 */
