/**
 * Creates a notification object from shop and order data
 * @param {Object} shop - Shop data object
 * @param {Object} order - Order data from Shopify GraphQL
 * @returns {Object} Formatted notification object
 */
export default function prepareNotification(shop, order) {
  return {
    shopId: shop.id,
    shopDomain: shop.domain || '',
    firstName: order.customer?.firstName || '',
    city: order.customer?.defaultAddress?.city || '',
    country: order.customer?.defaultAddress?.country || '',
    productName: order.lineItems.edges[0]?.node.name || '',
    productId: order.lineItems.edges[0].node.product.id || '',
    productImage: order.lineItems.edges[0]?.node.product.images?.edges[0]?.node.originalSrc || '',
    createdAt: new Date(order.createdAt)
  };
}
