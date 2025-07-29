import {getShopByShopifyDomain} from '@functions/repositories/shopRepository';
import {createOne} from '@functions/repositories/notificationRepository';
import createNotificationObject from '@functions/helpers/createNotificationObject';

export async function listenNewOrder(ctx) {
  try {
    const shopDomain = ctx.request.header['x-shopify-shop-domain'];
    const order = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopDomain);
    console.log('order:', order);
    const notification = createNotificationObject({shop, shopDomain, order});
    await createOne(notification);

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
