export default function createNotificationObject({shop, shopDomain, order}) {
  return {
    shopId: shop.id,
    shopDomain: shopDomain || '',
    firstName: order.customer?.first_name || '',
    city: order.customer?.default_address?.city || '',
    productName: order.line_items[0]?.name || '',
    country: order.customer?.default_address?.country || '',
    productId: order.line_items[0].product_id || '',
    created_at: order.created_at || '',
    productImage: order.line_items[0]?.image?.src || ''
  };
}
