import React from 'react';
import {Page, Layout, BlockStack, Text, Tabs} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import defaultSetting from '@assets/const/defaultSetting';
import useEditApi from '@assets/hooks/api/useEditApi';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import Display from '@assets/pages/Settings/Display/Display';
import Trigger from '@assets/pages/Settings/Trigger/Trigger';
import useTab from '@assets/hooks/tab/useTab';
import {TitleBar, SaveBar, useAppBridge} from '@shopify/app-bridge-react';

export default function Settings() {
  const shopify = useAppBridge();

  const {loading, data: input, setData: setInput} = useFetchApi({
    url: '/settings',
    defaultData: defaultSetting
  });
  const {editing, handleEdit: saveSetting} = useEditApi({
    url: '/settings'
  });

  const handleChangeInput = (key, value) => {
    shopify.saveBar.show('save-bar');
    setInput(prev => ({...prev, [key]: value}));
  };

  const [selectedTab, handleTabChange] = useTab(0);

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

  const handleDiscard = () => {
    setInput(defaultSetting);
    shopify.saveBar.hide('save-bar');
  };

  const handleSave = () => {
    saveSetting(input);
    shopify.saveBar.hide('save-bar');
  };

  return (
    <Page
      title="Notification Settings"
      subtitle="Customize your popup notification preferences"
      primaryAction={{
        content: 'Save',
        onAction: handleSave,
        loading: editing
      }}
      secondaryActions={[
        {
          content: 'Reset to Default',
          onAction: handleDiscard
        }
      ]}
    >
      <Layout>
        <Layout.Section variant={'oneThird'}>
          <BlockStack gap="400">
            <Text as="p" variant="bodyMd" fontWeight="semibold">
              Preview popup notification:
            </Text>
            <NotificationPopup settings={input} />
          </BlockStack>
        </Layout.Section>
        <Layout.Section>
          <Tabs fitted={true} tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
          {tabs[selectedTab].body}
        </Layout.Section>
        <TitleBar title="Simple Sales Notification"></TitleBar>
        <SaveBar id="save-bar">
          <button variant="primary" onClick={handleSave} loading={loading}></button>
          <button onClick={handleDiscard}></button>
        </SaveBar>
      </Layout>
    </Page>
  );
}
