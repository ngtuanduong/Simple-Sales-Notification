import React, {useContext, useState} from 'react';
import {BlockStack, Button, Card, InlineStack, Layout, Page, Text} from '@shopify/polaris';
import {MaxModalContext} from '@assets/contexts/maxModalContext';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const {openFullscreen} = useContext(MaxModalContext);

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
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
