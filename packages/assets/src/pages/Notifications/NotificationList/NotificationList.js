import React from 'react';
import {BlockStack, ResourceList, Text} from '@shopify/polaris';
import NotificationItem from '../NotificationItem/NotificationItem';
import useFetchApi from '@assets/hooks/api/useFetchApi';
const NotificationList = () => {
  const {loading, data: notifications, setData: updateNotifications, setLoading} = useFetchApi({
    url: '/notifications/many'
  });
  console.log(notifications);
  return (
    <ResourceList
      resourceName={{singular: 'Notification', plural: 'Notifications'}}
      items={notifications}
      showHeader
      renderItem={item => <NotificationItem data={item} />}
      loading={loading}
      emptyState={
        <BlockStack gap="200" alignment="center">
          <Text as={'p'} variant="headingSm">
            No notifications yet
          </Text>
          <Text as={'p'} variant="bodyMd" tone="subdued">
            You&#39;ll see real-time customer activity here.
          </Text>
        </BlockStack>
      }
    />
  );
};
export default NotificationList;
