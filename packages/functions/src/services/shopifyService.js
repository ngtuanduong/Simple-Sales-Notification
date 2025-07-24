import {prepareShopData} from '@avada/core';
import shopifyConfig from '../config/shopify';
import Shopify from 'shopify-api-node';
import appConfig from '../config/app';
import {isEmpty} from '@avada/utils';

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
  console.log('shopifyService/initShopify/accessToken:', accessToken);
  return new Shopify({
    shopName: shopifyDomain,
    accessToken,
    apiVersion,
    autoLimit: true
  });
}

/**
 *
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<Shopify.IWebhook>}
 */
export async function createWebhooks(shopifyDomain, accessToken) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken
  });

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
