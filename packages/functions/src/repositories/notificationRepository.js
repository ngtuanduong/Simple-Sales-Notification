import {Firestore} from '@google-cloud/firestore';
import {batchCreate, paginateQuery} from '@functions/repositories/helper';

const firestore = new Firestore();

const collection = firestore.collection('notifications');

export async function createOne(data) {
  const created = await collection.add(data);
  return created.id;
}

export async function create(dataList) {
  await batchCreate({firestore: firestore, collection: collection, data: dataList});
}

export async function get({after, before, limit, withDocs, hasCount, shopId}) {
  let queriedRef = collection;
  if (shopId) {
    queriedRef = queriedRef.where('shopId', '==', shopId);
  }
  queriedRef = queriedRef.orderBy('timestamp', 'desc'); // nhớ phải orderBy để phân trang

  return await paginateQuery({
    queriedRef,
    collection,
    query: {after, before, limit, withDocs, hasCount},
    pickedFields: ['productName', 'productImage', 'timestamp']
  });
}

export async function getByDomain({domain, limit = 10, offset = 0}) {
  const snapshot = await collection
    .where('shopDomain', '==', domain)
    .orderBy('timestamp', 'desc')
    .limit(limit)
    .offset(offset)
    .get();
  return snapshot.docs.map(doc => doc.data());
}

export async function getOne(id) {
  const doc = await collection.doc(id).get();
  return doc.data();
}
