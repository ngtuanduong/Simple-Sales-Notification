import {insertAfter} from '../helpers/insertHelpers.js';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup.js';
import {settings} from '../../.eslintrc';

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
    if (settings.firstDelay) {
      await this.sleep(settings.firstDelay);
    }

    // display logic
    for (let i = 0; i < notifications.length; i++) {
      await this.display({notification: notifications[i],setting: settings});

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

    container.style = this.setPosition(settings.position || 'bottom-left');
    render(React.createElement(NotificationPopup, notification), container);
  }
  setPosition = position => {
    switch (position) {
      case 'bottom-left':
        return {bottom: '10px', left: '10px'};
      case 'bottom-right':
        return {bottom: '10px', right: '10px'};
      case 'top-left':
        return {top: '10px', left: '10px'};
      case 'top-right':
        return {top: '10px', right: '10px'};
      default:
        return {bottom: '10px', left: '10px'};
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
