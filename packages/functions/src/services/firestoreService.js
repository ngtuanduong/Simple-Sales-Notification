import * as settingRepository from '@functions/repositories/settingRepository';
import defaultSetting from '@functions/const/defaultSetting';

export async function createDefaultSetting(shop) {
  await settingRepository.updateOne(shop, defaultSetting);
  console.log(`Successfully create default setting for shop ${shop.name}`);
}
