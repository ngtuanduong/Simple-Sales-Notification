const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-app-store.myshopify.com',
    accessToken: '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'
  });
  const scriptTags = await shopify.scriptTag.list();
  await shopify.scriptTag.delete(scriptTags[0].id);
  // //
  await shopify.scriptTag.create({
    event: 'onload',
    src: 'https://cdn.jsdelivr.net/gh/ngtuanduong/test10/avada-sale-pop.min.js'
  });
  console.log(scriptTags);
})();
