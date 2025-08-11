import React, {useContext} from 'react';
import {Badge, BlockStack, Button, Card, InlineStack, Layout, Page, Text} from '@shopify/polaris';
import {MaxModalContext} from '@assets/contexts/maxModalContext';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const {openFullscreen} = useContext(MaxModalContext);

  const {loading, data, fetchApi} = useFetchApi({
    url: '/activation'
  });

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <InlineStack gap="200" blockAlign="center" align={'space-between'}>
                <InlineStack gap="200" blockAlign="center">
                  <Text as="span">Turn on/off app in your store</Text>
                  <Badge tone={data.activation ? 'success' : 'warning'}>
                    {data.activation ? 'On' : 'Off'}
                  </Badge>
                </InlineStack>
                <Button onClick={() => fetchApi('/activation/toggle')} loading={loading}>
                  Turn {data.activation ? 'off' : 'on'}
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
