const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'avada-app-store.myshopify.com',
    accessToken: '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'
  });
  // const scriptTags = await shopify.scriptTag.list();
  // console.log(scriptTags);

  await shopify.scriptTag.create({
    event: 'onload',
    src: 'https://cdn.jsdelivr.net/gh/ngtuanduong/testV2-2/avada-sale-pop.min.js'
  });
})();
