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
    src:
      'https://comparing-therapist-desire-refer.trycloudflare.com/scripttag/avada-sale-pop.min.js'
  });
})();
