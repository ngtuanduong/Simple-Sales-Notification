import makeRequest from '../helpers/api/makeRequest.js';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      `https://localhost:5000/clientApi/notifications?shop=${shopifyDomain}`
    );

    return {notifications, settings};
  };
}
