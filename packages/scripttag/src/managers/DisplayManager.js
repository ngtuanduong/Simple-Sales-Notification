import {insertAfter} from '../helpers/insertHelpers.js';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup.js';
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();

    // Delay before first pop
    await this.sleep(settings.firstDelay || 0);

    // display logic
    for (const notification of notifications) {
      await this.display({notification: notification, setting: settings});

      await this.sleep(this.settings.duration || 5);

      this.fadeOut();

      await this.sleep(this.settings.popsInterval || 2);
    }
  }

  sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    render(null, container);
  }

  display({notification}) {
    const container = document.querySelector('#Avada-SalePop');
    const positionStyle = this.setPosition(this.settings.position || 'bottom-left');
    const popup = React.createElement(NotificationPopup, {
      ...notification,
      style: positionStyle
    });
    render(popup, container);
  }
  setPosition = position => {
    switch (position) {
      case 'bottom-left':
        return {bottom: '15px', left: '15px'};
      case 'bottom-right':
        return {bottom: '15px', right: '15px'};
      case 'top-left':
        return {top: '15px', left: '15px'};
      case 'top-right':
        return {top: '15px', right: '15px'};
      default:
        return {bottom: '15px', left: '15px'};
    }
  };

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
