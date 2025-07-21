import makeRequest from '../helpers/api/makeRequest.js';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      `licensing-av-pakistan-linda.trycloudflare.com/clientApi/notifications?shop=${shopifyDomain}`
    );

    return {notifications, settings};
  };
}
