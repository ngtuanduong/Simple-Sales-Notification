import React from 'react';
import {BlockStack, ResourceList, Text} from '@shopify/polaris';
import NotificationItem from '../NotificationItem/NotificationItem';
import usePaginate from '@assets/hooks/api/usePaginate';

const NotificationList = () => {
  const {data, loading, pageInfo, nextPage, prevPage} = usePaginate({
    url: '/notifications/many',
    defaultLimit: 10,
    initQueries: {hasCount: true}
  });

  return (
    <ResourceList
      resourceName={{singular: 'Notification', plural: 'Notifications'}}
      items={data}
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
      pagination={{
        onNext: nextPage,
        onPrevious: prevPage,
        hasNext: !!pageInfo?.hasNext,
        hasPrevious: !!pageInfo?.hasPre
      }}
    />
  );
};
export default NotificationList;
