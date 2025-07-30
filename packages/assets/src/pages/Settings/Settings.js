import React, {useCallback} from 'react';
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
  Text,
  Tabs,
  Grid
} from '@shopify/polaris';

import useFetchApi from '@assets/hooks/api/useFetchApi';
import defaultSetting from '@assets/const/defaultSetting';
import useEditApi from '@assets/hooks/api/useEditApi';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import SettingSkeleton from '@assets/pages/Settings/SettingSkeleton/PositionSettingSkeleton';
import TimingSettingSkeleton from '@assets/pages/Settings/SettingSkeleton/TimingSettingSkeleton';
import TimingSetting from '@assets/pages/Settings/Display/TimingSetting/TimingSetting';
import PositionSettingSkeleton from '@assets/pages/Settings/SettingSkeleton/PositionSettingSkeleton';
import PositionSetting from '@assets/pages/Settings/Display/PositionSetting/PositionSetting';
import Display from '@assets/pages/Settings/Display/Display';
import Trigger from '@assets/pages/Settings/Trigger/Trigger';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {loading, data: input, setData: setInput} = useFetchApi({
    url: '/settings',
    defaultData: defaultSetting
  });
  const {handleEdit: saveSetting} = useEditApi({
    url: '/settings'
  });

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangeInput = (key, value) => {
    setInput(prev => ({...prev, [key]: value}));
  };

  const handleReset = () => {
    setInput(defaultSetting);
  };

  const handleSave = () => {
    saveSetting(input);
  };

  const tabs = [
    {
      id: 'display',
      content: 'Display',
      body: <Display input={input} handleChangeInput={handleChangeInput} loading={loading} />
    },
    {
      id: 'trigger',
      content: 'Trigger',
      body: <Trigger input={input} handleChangeInput={handleChangeInput} loading={loading} />
    }
  ];

  const handleTabChange = useCallback(selectedTabIndex => setSelectedTab(selectedTabIndex), []);

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
          <Grid>
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 4, xl: 4}}>
              <BlockStack gap="400">
                <Text as="p" variant="bodyMd" fontWeight="semibold">
                  Preview popup notification:
                </Text>
                <NotificationPopup settings={input} />
              </BlockStack>
            </Grid.Cell>
            <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 8, xl: 8}}>
              <Card>
                <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
                  {tabs[selectedTab].body}
                </Tabs>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
