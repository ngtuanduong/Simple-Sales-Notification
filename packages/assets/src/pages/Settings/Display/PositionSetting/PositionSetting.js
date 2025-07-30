import {BlockStack, Checkbox, ChoiceList, InlineStack, Text} from '@shopify/polaris';
import React from 'react';
import topLeftImage from '../../../../resources/images/Top left.png';
import topRightImage from '../../../../resources/images/Top right.png';
import bottomLeftImage from '../../../../resources/images/Bottom left.png';
import bottomRightImage from '../../../../resources/images/Bottom right.png';
import {object} from 'prop-types';
export default function PositionSetting({input, handleChangeInput}) {
  const positionOptions = [
    {label: 'Bottom left', value: 'bottom-left', image: bottomLeftImage},
    {label: 'Bottom right', value: 'bottom-right', image: bottomRightImage},
    {label: 'Top left', value: 'top-left', image: topLeftImage},
    {label: 'Top right', value: 'top-right', image: topRightImage}
  ];

  const positionChoices = positionOptions.map(option => ({
    label: option.label,
    value: option.value,
    renderChildren: () => (
      <img
        src={option.image}
        alt={option.label}
        style={{
          width: '100px',
          height: '60px',
          objectFit: 'contain',
          marginTop: '8px'
        }}
      />
    )
  }));

  return (
    <BlockStack>
      <Text as="h2" variant="headingMd">
        Appearance
      </Text>

      <Text as="p" variant="bodyMd">
        Choose notification position:
      </Text>

      <InlineStack gap="400" align="start">
        {positionChoices.map(choice => (
          <div key={choice.value} style={{minWidth: '120px'}}>
            <ChoiceList
              title=""
              tone="magic"
              choices={[choice]}
              selected={input.position === choice.value ? [choice.value] : []}
              onChange={() => handleChangeInput('position', choice.value)}
            />
          </div>
        ))}
      </InlineStack>

      <Checkbox
        label="Hide time ago"
        checked={input.hideTimeAgo}
        onChange={() => handleChangeInput('hideTimeAgo', !input.hideTimeAgo)}
      />
      <Checkbox
        label="Truncate content text"
        checked={input.truncateProductName}
        onChange={() => handleChangeInput('truncateProductName', !input.truncateProductName)}
        helpText="if your product name is too long for one line, it will be truncated with '...'"
      />
    </BlockStack>
  );
}

PositionSetting.propTypes = {
  input: object,
  handleChangeInput: object
};
