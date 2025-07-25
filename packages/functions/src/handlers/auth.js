import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, getShopByShopifyDomain, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes';
import {createWebhooks, initShopify} from '@functions/services/shopifyService';
import {create} from '@functions/repositories/notificationRepository';
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
    afterInstall: async ctx => {
      try {
        const shopDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopDomain);
        const shopify = initShopify(shop);
        // Fetch last 30 orders from Shopify
        const products = await shopify.product.list({
          limit: 30,
          order: 'created_at desc'
        });

        // add notifications
        await create(
          products.map(product => ({
            productId: product.id,
            productName: product.title,
            productImage: product.image?.src || 'https://picsum.photos/200',
            timestamp: product.created_at,
            shopDomain: shopDomain,
            shopId: shop.id,
            shopName: shop.name
          }))
        );
        console.log(`Successfully created ${products.length} notifications for shop}`);

        // register scriptTag
        await shopify.scriptTag.create({
          event: 'onload',
          src: 'https://cdn.jsdelivr.net/gh/ngtuanduong/testV2-6/avada-sale-pop.min.js'
        });
        console.log(`Successfully register scriptTag for shop ${shopDomain}}`);
      } catch (error) {
        console.error('Error in afterInstall hook:', error);
        throw error;
      }
    },

    afterLogin: async ctx => {
      try {
        const shopDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopDomain);
        const shopify = initShopify(shop);
        const accessToken = shopify.options.accessToken;
        console.log('shopify: ', shopify);
        console.log('accessToken:', accessToken);
        console.log('Recreating webhook url', shopDomain);
        await createWebhooks(shopDomain, accessToken);

        shopify.webhook.list().then(webhooks => {
          console.log('webhooks: ', webhooks);
        });
      } catch (err) {
        const body = err.response?.body;
        const status = err.response?.statusCode;
        console.error('Webhook create failed:', {status, body});
        throw err;
      }
    },
    optionalScopes: shopifyOptionalScopes
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
