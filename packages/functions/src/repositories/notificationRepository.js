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
  queriedRef = queriedRef.where('shopId', '==', shopId);
  queriedRef = queriedRef.orderBy('created_at', 'desc');

  return await paginateQuery({
    queriedRef,
    collection,
    query: {after, before, limit, withDocs, hasCount}
  });
}

export async function getByDomain({after, before, limit, withDocs, hasCount, shopDomain}) {
  let queriedRef = collection;
  queriedRef = queriedRef.where('shopDomain', '==', shopDomain);
  queriedRef = queriedRef.orderBy('created_at', 'desc');
  return await paginateQuery({
    queriedRef,
    collection,
    query: {after, before, limit, withDocs, hasCount}
  });
}

export async function getOne(id) {
  const doc = await collection.doc(id).get();
  return doc.data();
}
