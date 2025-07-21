import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes';
import {getShopByShopifyDomain} from '@functions/repositories/shopRepository';
import {initShopify} from '@functions/services/shopifyService';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    accessTokenKey: shopifyConfig.accessTokenKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    },
    // afterInstall: async ctx => {
    //   const {
    //     state: {shop}
    //   } = useStore();
    //   const orders = await api(
    //     `https://${shop.shopDomain}/admin/api/2025-07/orders.json?status=any`
    //   );
    //   const notification = await api(
    //     `/notifications`,
    //
    //   );
    // },
    afterLogin: async ctx => {
      try {
        const shopifyDomain = ctx.request.header['x-shopify-shop-domain'];
        const shop = await getShopByShopifyDomain(shopifyDomain);
        if (appConfig.baseUrl !== shop.domain && appConfig.baseUrl.includes('trycloudflare')) {
          const shopify = initShopify(shop);
          console.log('Recreating webhook url', shop.domain);
          await createWebhooks(shopify, appConfig.baseUrl);
        }
      } catch (e) {
        console.log(e);
      }
    },
    optionalScopes: shopifyOptionalScopes
  }).routes()
);

const createWebhooks = async (shopify, baseUrl) => {
  return shopify.webhook.create({
    topic: 'orders/create',
    address: `https://${baseUrl}/api/webhooks/orders`,
    format: 'json'
  });
};

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
