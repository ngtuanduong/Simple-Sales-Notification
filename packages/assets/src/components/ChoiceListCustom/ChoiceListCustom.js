import React from 'react';
import {Box, InlineStack} from '@shopify/polaris';
import PropTypes from 'prop-types';

const ChoiceListCustom = ({selected, onChange, choices}) => {
  return (
    <InlineStack gap="300">
      {choices.map((option, index) => (
        <Box key={index} onClick={() => onChange(option.value)}>
          {option.element(option.value === selected)}
        </Box>
      ))}
    </InlineStack>
  );
};

ChoiceListCustom.propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
  choices: PropTypes.arrayOf(PropTypes.object)
};

export default ChoiceListCustom;
