import DisplayManager from './managers/DisplayManager.js';
import ApiManager from './managers/ApiManager.js';

console.log('Avada Sale Pop initialized!');

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, settings} = await apiManager.getNotifications();
  displayManager.initialize({notifications, settings});
})();
