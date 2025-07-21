import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
import presentShop from '@functions/presenters/shopPresenter';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('shops');

/**
 * @param id
 * @returns {Promise<{Shop}>}
 */
export async function getShopById(id) {
  const doc = await collection.doc(id).get();
  return presentDataAndFormatDate(doc, presentShop);
}

export async function getShopByShopifyDomain(shopifyDomain) {
  const doc = await collection
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get();
  if (doc.empty) {
    return null;
  }
  const [shop] = doc.docs;
  return presentDataAndFormatDate(shop, presentShop);
}
