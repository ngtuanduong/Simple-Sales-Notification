import {Firestore} from '@google-cloud/firestore';
import {formatDateFields} from '@avada/firestore-utils';

const firestore = new Firestore();

const collection = firestore.collection('settings');

export async function getOne(id) {
  const doc = await collection.doc(id).get();
  return {id: id, ...formatDateFields(doc.data())};
}
export async function getOneByDomain(shopDomain) {
  const doc = await collection
    .where('shopDomain', '==', shopDomain)
    .limit(1)
    .get();
  return {shopDomain: shopDomain, ...formatDateFields(doc.docs[0].data())};
}

export async function updateOne(id, data) {
  return collection.doc(id).set({...data, updatedAt: new Date()}, {merge: true});
}
