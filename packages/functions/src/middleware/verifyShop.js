export default async function verifyShop(ctx, next) {
  const shop = ctx.params.shop || ctx.query.shop;
  if (!shop || typeof shop !== 'string') {
    ctx.status = 400;
    ctx.body = {success: false, message: "Missing or invalid 'shop' parameter"};
    return;
  }
  await next();
}
