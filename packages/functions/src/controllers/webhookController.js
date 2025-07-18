import crypto from 'crypto';
import {getCurrentShopData} from '@functions/helpers/auth';

export async function handleOrderCreated(ctx) {
  console.log(ctx);
  try {
    const hmacHeader = ctx.request.headers['x-shopify-hmac-sha256'];
    const rawBody = ctx.request.rawBody;

    const shopData = getCurrentShopData(ctx);

    const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
    if (!secret) {
      ctx.status = 500;
      ctx.body = {success: false, message: 'Missing webhook secret'};
      return;
    }
    const digest = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('base64');

    if (digest !== hmacHeader) {
      ctx.status = 401;
      ctx.body = 'Unauthorized - Invalid HMAC';
      return;
    }
    const order = JSON.parse(rawBody);
    console.log(order);
    // await saveOrder(order);
    ctx.body = {data, shopData, success: true};
  } catch (error) {
    console.error('Error in handleOrderCreated:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
