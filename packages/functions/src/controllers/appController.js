import {getCurrentShopData} from '@functions/helpers/auth';
import {initShopify} from '@functions/services/shopifyService';

export async function activation(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const shopify = initShopify(shopData);
    const scriptTag = await shopify.scriptTag.list();
    if (scriptTag.length > 0) {
      await shopify.scriptTag.delete(scriptTag[0].id);
      ctx.body = {data: scriptTag, shopData, success: true};
    } else {
      await shopify.scriptTag.create({
        event: 'onload',
        src: 'https://localhost:5000/scripttag/avada-sale-pop.min.js'
      });
    }
    ctx.body = {data: await shopify.scriptTag.list(), shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}
