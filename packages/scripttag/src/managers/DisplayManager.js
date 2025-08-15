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

    // display logic
    if (!this.shouldDisplay()) return;
    // Delay before first pop
    await this.sleep(this.settings.firstDelay);

    for (const notification of notifications) {
      await this.display(notification);

      await this.sleep(this.settings.duration);

      this.fadeOut();

      await this.sleep(this.settings.popsInterval);
    }
  }

  sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    render(null, container);
  }

  display(notification) {
    const container = document.querySelector('#Avada-SalePop');
    const popup = React.createElement(NotificationPopup, {
      ...notification,
      settings: this.settings
    });
    render(popup, container);
  }

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

  shouldDisplay() {
    const url = window.location.protocol + '//' + window.location.host + window.location.pathname;

    const {allowShow, includedUrls, excludedUrls} = this.settings;

    const includedUrlsArray = includedUrls.split('\n');
    const excludedUrlsArray = excludedUrls.split('\n');

    if (excludedUrlsArray.includes(url)) return false;
    if (allowShow === 'all') return true;
    if (allowShow === 'specific') return includedUrlsArray.includes(url);

    return false;
  }
}
