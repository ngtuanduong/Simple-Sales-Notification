export default function createNotificationObject(shop, order) {
  console.log('createNotificationObject order: ');
  console.dir(order, {depth: null});
  return {
    shopId: shop.id,
    shopDomain: shop.domain || '',
    firstName: order.customer?.firstName || '',
    city: order.customer?.defaultAddress?.city || '',
    country: order.customer?.defaultAddress?.country || '',
    productName: order.lineItems.edges[0]?.node.name || '',
    productId: order.lineItems.edges[0].node.product.id || '',
    productImage: order.lineItems.edges[0]?.node.product.images?.edges[0]?.node.originalSrc || '',
    created_at: order.createdAt || ''
  };
}
