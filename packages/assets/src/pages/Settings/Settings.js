import React, {useEffect} from 'react';
import {
  Page,
  Layout,
  BlockStack,
  Card,
  Checkbox,
  ChoiceList,
  InlineStack,
  RangeSlider,
  SkeletonBodyText,
  Text
} from '@shopify/polaris';

import topLeftImage from '../../resources/images/Top left.png';
import topRightImage from '../../resources/images/Top right.png';
import bottomLeftImage from '../../resources/images/Bottom left.png';
import bottomRightImage from '../../resources/images/Bottom right.png';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import defaultSetting from '@assets/const/defaultSetting';
import useEditApi from '@assets/hooks/api/useEditApi';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {loading, data: input, setData: setInput, setLoading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSetting
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
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {/* Position Settings */}
            <Card>
              <BlockStack gap="400">
                {loading ? (
                  <>
                    <Text as="h2" variant="headingMd">
                      Position Settings
                    </Text>

                    <Text as="p" variant="bodyMd" fontWeight="semibold">
                      Choose notification position:
                    </Text>

                    <InlineStack gap="400" align="start">
                      {[...Array(4)].map((_, idx) => (
                        <BlockStack gap="200" key={idx}>
                          {/* Skeleton for radio button */}
                          <SkeletonBodyText lines={1} />

                          {/* Skeleton for preview box */}
                          <div
                            style={{
                              width: '80px',
                              height: '60px',
                              border: '1px solid #000',
                              borderRadius: '6px',
                              position: 'relative'
                            }}
                          >
                            <div
                              style={{
                                width: '20px',
                                height: '10px',
                                backgroundColor: '#000',
                                position: 'absolute',
                                ...(idx === 0 && {bottom: '6px', left: '6px'}),
                                ...(idx === 1 && {bottom: '6px', right: '6px'}),
                                ...(idx === 2 && {top: '6px', left: '6px'}),
                                ...(idx === 3 && {top: '6px', right: '6px'})
                              }}
                            />
                          </div>
                        </BlockStack>
                      ))}
                    </InlineStack>

                    <SkeletonBodyText lines={1} />
                    <SkeletonBodyText lines={1} />
                  </>
                ) : (
                  <>
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

                    <Checkbox
                      label="Hide time ago"
                      checked={input.hideTimeAgo}
                      onChange={() => handleChangeInput('hideTimeAgo', !input.hideTimeAgo)}
                    />
                    <Checkbox
                      label="Truncate content text"
                      checked={input.truncateProductName}
                      onChange={() =>
                        handleChangeInput('truncateProductName', !input.truncateProductName)
                      }
                      helpText="if your product name is too long for one line, it will be truncated with '...'"
                    />
                  </>
                )}
              </BlockStack>
            </Card>
            {/* Timing Settings */}
            {loading ? (
              <Card>
                <BlockStack gap="400">
                  {/* Section Title */}
                  <Text as="h2" variant="headingMd">
                    Timing Settings
                  </Text>

                  {/* Each timing setting */}
                  {[...Array(4)].map((_, idx) => (
                    <BlockStack key={idx} gap="200">
                      {/* Slider placeholder */}
                      <SkeletonBodyText lines={1} />

                      {/* Description below the slider */}
                      <SkeletonBodyText lines={1} />
                    </BlockStack>
                  ))}
                </BlockStack>
              </Card>
            ) : (
              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Timing Settings
                  </Text>

                  <RangeSlider
                    label="Time before first popup (seconds)"
                    value={input.firstDelay}
                    onChange={value => handleChangeInput('firstDelay', value)}
                    min={1}
                    max={30}
                    step={1}
                    output
                    helpText={`First popup will visible after ${input.firstDelay} seconds`}
                  />

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
            )}
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
