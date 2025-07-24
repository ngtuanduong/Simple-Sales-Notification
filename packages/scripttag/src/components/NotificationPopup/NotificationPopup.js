import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  productName = 'Puffer Jacket With Hidden Hood',
  timeAgo = 'a day ago',
  productImage = 'https://picsum.photos/200',
  style = {}
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated" style={style}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>A new product is available!</div>
              <div className={'Avada-SP__Subtitle'}>{productName}</div>
              <div className={'Avada-SP__Footer'}>
                {timeAgo}{' '}
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
  productName: PropTypes.string,
  timeAgo: PropTypes.string,
  productImage: PropTypes.string,
  style: PropTypes.object
};

export default NotificationPopup;
