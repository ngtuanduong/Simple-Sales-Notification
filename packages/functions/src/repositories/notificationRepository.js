import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const collection = firestore.collection('notifications');

export async function createOne(data) {
  const created = await collection.add({
    ...data,
    createdAt: new Date()
  });
  return created.id;
}

export async function get({id, limit = 10, offset = 0}) {
  const snapshot = await collection
    .where('shopId', '==', id)
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
