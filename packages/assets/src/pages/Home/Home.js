import React, {useContext} from 'react';
import {Badge, BlockStack, Button, Card, InlineStack, Layout, Page, Text} from '@shopify/polaris';
import {MaxModalContext} from '@assets/contexts/maxModalContext';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {AppExtensionIcon, ExternalSmallIcon} from '@shopify/polaris-icons';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const {openFullscreen} = useContext(MaxModalContext);

  const {data} = useFetchApi({url: '/activation', defaultData: [{activation: false}]});

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <InlineStack gap="200" blockAlign="center" align={'space-between'}>
                <InlineStack gap="200" blockAlign="center">
                  <AppExtensionIcon width={20} height={20} />
                  <Text as="span">Theme store app embed</Text>
                  <Badge tone={data[0].activation ? 'success' : ''}>
                    {data[0].activation ? 'On' : 'Off'}
                  </Badge>
                </InlineStack>
                <Button
                  icon={ExternalSmallIcon}
                  external
                  url={`shopify://admin/themes/current/editor?context=apps&activateAppId=49da59fd7b0db0b1e1966e6198967ce0/app-embed`}
                >
                  App embed settings
                </Button>
              </InlineStack>
            </Card>
            <Card>
              <InlineStack gap="200" blockAlign="center">
                <Text as="span">Fullscreen</Text>
                <Button onClick={() => openFullscreen('/settings')}>Settings</Button>
                <Button onClick={() => openFullscreen('/notifications')}>Notifications</Button>
              </InlineStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
