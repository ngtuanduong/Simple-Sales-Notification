export default async function getRawBody(ctx, next) {
  if (ctx.method === 'POST' && ctx.url === '/webhook/order-created') {
    ctx.request.rawBody = await getRawBody(ctx.req, {
      length: ctx.request.length,
      limit: '2mb',
      encoding: ctx.request.charset || 'utf-8'
    });
  }
  await next();
}
