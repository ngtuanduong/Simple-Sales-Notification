import {getCurrentShopData} from '@functions/helpers/auth';
import {updateOne} from '@functions/repositories/settingRepository';
import {getOne} from '@functions/repositories/settingRepository';
export async function getOneSetting(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const data = await getOne(shopData.id);
    ctx.body = {data, shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}

export async function updateOneSetting(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const data = await updateOne(shopData.id, ctx.req.body);
    ctx.body = {data, shopData, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], shopData: {}, success: false};
  }
}
