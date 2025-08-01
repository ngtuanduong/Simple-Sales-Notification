import {Firestore} from '@google-cloud/firestore';
import {formatDateFields} from '@avada/firestore-utils';

/**
 * @documentation
 * Repository for settings collection - handles only settings collection operations
 */
const firestore = new Firestore();

/** @type CollectionReference */
const collection = firestore.collection('settings');

/**
 * Retrieves a single settings document by ID with formatted date fields
 * @param {string} id - The settings document ID
 * @returns {Promise<Object|null>} The settings document data with formatted dates or null if not found
 * @returns {string} [returns.id] - The settings document ID
 * @returns {string} [returns.domain] - The shop domain
 * @returns {Object} [returns.notificationSettings] - Notification display settings
 * @returns {Object} [returns.positionSettings] - Position configuration settings
 * @returns {Object} [returns.timingSettings] - Timing configuration settings
 * @returns {Object} [returns.triggerSettings] - Trigger configuration settings
 * @returns {Date} [returns.createdAt] - Creation timestamp (formatted)
 * @returns {Date} [returns.updatedAt] - Last update timestamp (formatted)
 */
export async function getOne(id) {
  const doc = await collection.doc(id).get();
  return {id: id, ...formatDateFields(doc.data())};
}

/**
 * Retrieves a single settings document by shop domain with formatted date fields
 * @param {string} shopDomain - The shop domain to filter settings by
 * @returns {Promise<Object|null>} The settings document data with formatted dates or null if not found
 * @returns {string} [returns.shopDomain] - The shop domain
 * @returns {Object} [returns.notificationSettings] - Notification display settings
 * @returns {Object} [returns.positionSettings] - Position configuration settings
 * @returns {Object} [returns.timingSettings] - Timing configuration settings
 * @returns {Object} [returns.triggerSettings] - Trigger configuration settings
 * @returns {Date} [returns.createdAt] - Creation timestamp (formatted)
 * @returns {Date} [returns.updatedAt] - Last update timestamp (formatted)
 */
export async function getOneByDomain(shopDomain) {
  const doc = await collection
    .where('domain', '==', shopDomain)
    .limit(1)
    .get();
  return {shopDomain: shopDomain, ...formatDateFields(doc.docs[0].data())};
}

/**
 * Updates a settings document with new data and automatically sets updatedAt timestamp
 * @param {Object} shopData - The shop data object
 * @param {string} shopData.id - The shop ID (used as document ID)
 * @param {string} shopData.domain - The shop domain
 * @param {Object} data - The settings data to update
 * @param {Object} [data.notificationSettings] - Notification display settings
 * @param {Object} [data.positionSettings] - Position configuration settings
 * @param {Object} [data.timingSettings] - Timing configuration settings
 * @param {Object} [data.triggerSettings] - Trigger configuration settings
 * @returns {Promise<WriteResult>} Firestore write result
 */
export async function updateOne(shopData, data) {
  return collection
    .doc(shopData.id)
    .set({...data, domain: shopData.domain, updatedAt: new Date()}, {merge: true});
}
