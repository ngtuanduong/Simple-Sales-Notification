import React from 'react';
import './PositionDisplay.scss';
import PropTypes from 'prop-types';
import {BlockStack, InlineStack, Text} from '@shopify/polaris';

const defaultOptions = [
  {
    label: 'Bottom left',
    value: 'bottom-left',
    variant: 'popup'
  },
  {
    label: 'Bottom right',
    value: 'bottom-right',
    variant: 'popup'
  },
  {
    label: 'Top left',
    value: 'top-left',
    variant: 'popup'
  },
  {
    label: 'Top right',
    value: 'top-right',
    variant: 'popup'
  }
];

const PositionDisplay = ({label, value, onChange, helpText, options = defaultOptions}) => {
  return (
    <BlockStack gap="400">
      <Text as="h1" fontWeight="medium">
        {label}
      </Text>
      <InlineStack gap="300">
        {options.map((option, key) => (
          <BlockStack key={key}>
            <div
              key={key}
              className={`DisplayType ${option.value === value && 'DisplayType--selected'}`}
              onClick={() => onChange(option.value)}
            >
              <div
                className={`
            DisplayType__Input
            DisplayType__Input--${option.variant}
            DisplayType__Input--${option.value}
            ${option.value === value && 'DisplayType__Input--selected'}`}
              />
            </div>
            <Text as="p" fontWeight="medium" alignment={'center'}>
              {option.label}
            </Text>
          </BlockStack>
        ))}
      </InlineStack>
      <Text as="p" color="subdued">
        {helpText}
      </Text>
    </BlockStack>
  );
};

PositionDisplay.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default PositionDisplay;
