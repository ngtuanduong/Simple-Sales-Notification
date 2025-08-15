import {getCurrentShopData} from '@functions/helpers/auth';
import {initShopify} from '../../lib/services/shopifyService';

export async function getActivation(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const shopify = initShopify(shopData);

    const themes = await shopify.theme.list();
    const targetThemeId = themes.find(t => t.role === 'main').id;
    const asset = await shopify.asset.get(targetThemeId, {
      asset: {key: 'config/settings_data.json'}
    });
    const settingData = JSON.parse(asset.value);
    const appEmbed = Object.values(settingData.current.blocks).find(item =>
      item.type.startsWith('shopify://apps/simple-sales-notification/blocks/app-embed')
    );
    const activate = !appEmbed.disabled;
    const data = [{activation: activate, shopData}];

    ctx.body = {data, shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}
