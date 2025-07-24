import * as functions from 'firebase-functions';

const {shopify} = functions.config();

export default {
  secret: shopify.secret,
  apiKey: shopify.api_key,
  firebaseApiKey: shopify.firebase_api_key,
  scopes: shopify.scopes?.split(',') || [
    'read_products',
    'read_inventory',
    'read_checkouts',
    'read_script_tags',
    'write_script_tags',
    'read_themes',
    'write_themes',
    'read_script_tags',
    'write_script_tags'
  ],
  accessTokenKey: shopify.access_token_key || 'avada-apps-access-token'
};
