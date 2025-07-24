import {getShopByShopifyDomain} from '@functions/repositories/shopRepository';
import {createOne} from '@functions/repositories/notificationRepository';

export async function listenNewProduct(ctx) {
  try {
    const shopDomain = ctx.request.header['x-shopify-shop-domain'];
    const product = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopDomain);
    const notification = {
      shopId: shop.id || '',
      shopName: shop.name || '',
      shopDomain: shop.domain || '',
      type: 'new_product',
      productName: product.title || '',
      productId: product.id || '',
      timestamp: product.created_at || '',
      productImage: product.image?.src || ''
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

export async function listenNewCheckout(ctx) {
  try {
    const shopDomain = ctx.request.header['x-shopify-shop-domain'];
    const checkout = ctx.request.body;

    const shop = await getShopByShopifyDomain(shopDomain);

    const lineItem = checkout?.line_items?.[0];

    const notification = {
      shopId: shop.id || '',
      shopName: shop.name || '',
      shopDomain: shop.domain || '',
      productName: lineItem?.title || '',
      productId: lineItem?.product_id || '',
      productImage: lineItem?.image?.src || '',
      country: checkout?.shipping_address?.country || '',
      timestamp: checkout?.created_at || new Date().toISOString()
    };

    await createOne(notification);

    ctx.body = {success: true};
  } catch (e) {
    console.error('Error in listenNewCheckout:', e);
    ctx.body = {success: false};
  }
}
