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
