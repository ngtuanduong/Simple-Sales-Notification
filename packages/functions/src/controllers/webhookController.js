import {getShopByShopifyDomain} from '@functions/repositories/shopRepository';
import {createOne} from '@functions/repositories/notificationRepository';

export async function listenNewOrder(ctx) {
  try {
    const shopDomain = ctx.request.header['x-shopify-shop-domain'];
    const order = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopDomain);
    const notification = {
      shopId: shop.id || '',
      shopName: shop.name || '',
      shopDomain: shop.domain || '',
      firstName: order.customer?.first_name || '',
      city: order.customer?.default_address.city || '',
      productName: order.line_items[0]?.name || '',
      country: order.customer?.default_address.country || '',
      productId: order.line_items[0].product_id || '',
      timestamp: order.created_at || '',
      productImage: order.line_items[0]?.image?.src || ''
    };
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
