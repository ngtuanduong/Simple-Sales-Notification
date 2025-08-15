import {BlockStack, Card, Checkbox, Text} from '@shopify/polaris';
import React from 'react';
import {object, func} from 'prop-types';
import PositionDisplay from '@assets/components/PositionDisplay/PositionDisplay';
import CardHeader from '@assets/components/CardHeader/CardHeader';

export default function PositionSetting({input, handleChangeInput}) {
  return (
    <Card>
      <BlockStack gap="300">
        <CardHeader title="Appearance" subtitle="Adjust popup appearance in storefront" />

        <PositionDisplay
          label="Display type"
          value={input.position}
          onChange={value => handleChangeInput('position', value)}
        />

        <Checkbox
          label="Hide time ago"
          checked={input.hideTimeAgo}
          onChange={() => handleChangeInput('hideTimeAgo', !input.hideTimeAgo)}
        />
        <Checkbox
          label="Truncate content text"
          checked={input.truncateProductName}
          onChange={() => handleChangeInput('truncateProductName', !input.truncateProductName)}
          helpText="If your product name is too long for one line, it will be truncated with '...'"
        />
      </BlockStack>
    </Card>
  );
}

PositionSetting.propTypes = {
  input: object,
  handleChangeInput: func
};
