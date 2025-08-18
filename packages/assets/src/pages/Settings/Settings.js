import React from 'react';
import {Page, Layout, BlockStack, Text, Tabs} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import defaultSetting from '@assets/const/defaultSetting';
import useEditApi from '@assets/hooks/api/useEditApi';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import Display from '@assets/pages/Settings/Display/Display';
import Trigger from '@assets/pages/Settings/Trigger/Trigger';
import useTab from '@assets/hooks/tab/useTab';
import {TitleBar, SaveBar} from '@shopify/app-bridge-react';
import useSaveBar from '@assets/hooks/saveBar/useSaveBar';

export default function Settings() {
  const {loading, data: input, setData: setInput} = useFetchApi({
    url: '/settings',
    defaultData: defaultSetting
  });
  const {handleEdit: saveSetting} = useEditApi({
    url: '/settings'
  });

  const {discard, save, loading: saveLoading, showSaveBar} = useSaveBar({
    input,
    setInput,
    saveSetting
  });

  const handleChangeInput = (key, value) => {
    setInput(prev => ({...prev, [key]: value}));
    showSaveBar();
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

  return (
    <Page title="Notification Settings" subtitle="Customize your popup notification preferences">
      <Layout>
        <SaveBar id="save-bar">
          <button variant="primary" onClick={save} loading={saveLoading}></button>
          <button onClick={discard}></button>
        </SaveBar>
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
        <Layout.Section></Layout.Section>
      </Layout>
    </Page>
  );
}
