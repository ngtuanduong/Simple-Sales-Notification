import React, {useState} from 'react';
import {
  BlockStack,
  Card,
  Checkbox,
  ChoiceList,
  InlineStack,
  Page,
  RangeSlider,
  Text,
  TextField
} from '@shopify/polaris';

import topLeftImage from '../../resources/images/Top left.png';
import topRightImage from '../../resources/images/Top right.png';
import bottomLeftImage from '../../resources/images/Bottom left.png';
import bottomRightImage from '../../resources/images/Bottom right.png';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import defaultSetting from '@assets/const/defaultSetting';
import {value} from 'firebase-tools/lib/deploymentTool';
import useEditApi from '@assets/hooks/api/useEditApi';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {loading, data: input, setData: setInput, setLoading} = useFetchApi({
    url: '/settings',
    defaultSetting
  });
  const {editing: editingSetting, handleEdit: saveSetting} = useEditApi({
    url: '/settings'
  });

  const handleChangeInput = (key, value) => {
    setInput(prev => ({...prev, [key]: value}));
  };

  const handleReset = () => {
    setInput(defaultSetting);
  };

  const handleSave = () => {
    saveSetting(input);
  };

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
    <Page
      title="Notification Settings"
      subtitle="Customize your popup notification preferences"
      primaryAction={{
        content: 'Save Settings',
        onAction: handleSave
      }}
      secondaryActions={[
        {
          content: 'Reset to Default',
          onAction: handleReset
        }
      ]}
      loading={!loading && !editingSetting}
    >
      <BlockStack gap="500">
        {/* Position Settings */}
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Position Settings
            </Text>

            <Text as="p" variant="bodyMd" fontWeight="semibold">
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
          </BlockStack>
        </Card>
        {/* Timing Settings */}
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Timing Settings
            </Text>

            <RangeSlider
              label="Popup duration (seconds)"
              value={input.duration}
              onChange={value => handleChangeInput('duration', value)}
              min={1}
              max={30}
              step={1}
              output
              helpText={`Popup will stay visible for ${input.duration} seconds`}
            />

            <RangeSlider
              label="Delay between popups (seconds)"
              value={input.popsInterval}
              onChange={value => handleChangeInput('popsInterval', value)}
              min={1}
              max={60}
              step={1}
              output
              helpText={`Wait ${input.popsInterval} seconds before showing next popup`}
            />

            <RangeSlider
              label="Maximum popups per session"
              value={input.maxPopsDisplay}
              onChange={value => handleChangeInput('maxPopsDisplay', value)}
              min={1}
              max={50}
              step={1}
              output
              helpText={`Show maximum ${input.maxPopsDisplay} popups per session`}
            />
          </BlockStack>
        </Card>
        z
      </BlockStack>
    </Page>
  );
}

Settings.propTypes = {};
