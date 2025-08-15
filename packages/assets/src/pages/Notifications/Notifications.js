import React from 'react';
import {Page, Layout, Card, BlockStack, Text} from '@shopify/polaris';
import NotificationList from './NotificationList/NotificationList';

const Notifications = () => {
  return (
    <Page title="Notifications">
      <Layout>
        <Layout.Section>
          <Card roundedAbove="sm" padding="400">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">
                Recent Notifications
              </Text>
              <NotificationList />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Notifications;
