import React from 'react';
import './NoticationPopup.scss';
import {string, object} from 'prop-types';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timeAgo = 'a day ago',
  productImage = 'https://cdn.shopify.com/s/files/1/0703/2596/0876/files/Main_0a4e9096-021a-4c1e-8750-24b233166a12.jpg?v=1752746092',
  settings = {
    truncateProductName: false,
    hideTimeAgo: false
  }
}) => {
  const truncateString = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + '...' : str;
  };
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                purchased{' '}
                {settings.truncateProductName ? truncateString(productName, 15) : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {!settings.hideTimeAgo && timeAgo}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: string,
  city: string,
  country: string,
  productName: string,
  timeAgo: string,
  productImage: string,
  settings: object
};

export default NotificationPopup;
