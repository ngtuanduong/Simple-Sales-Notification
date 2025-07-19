import React from 'react';
import {Text, ResourceItem, InlineStack, BlockStack} from '@shopify/polaris';
import PropTypes from 'prop-types';

const NotificationItem = ({data}) => {
  const formattedDate =
    data.timestamp && data.timestamp._seconds
      ? new Date(data.timestamp._seconds * 1000).toLocaleString()
      : 'Unknown time';
  return (
    <ResourceItem id={data.id}>
      <InlineStack
        align="space-between"
        gap="400"
        wrap={false}
        blockAlign="center"
        style={{padding: '12px 0'}}
      >
        {/* Image + Info */}
        <InlineStack gap="300" blockAlign="center">
          <img
            src={data.productImage}
            alt={data.productName}
            width={48}
            height={48}
            style={{
              borderRadius: 6,
              objectFit: 'cover',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
            }}
          />

          <BlockStack gap="050">
            <Text variant="bodyMd" fontWeight="medium">
              {data.productName}
            </Text>
            <Text variant="bodySm" tone="subdued">
              {data.firstName}
            </Text>
          </BlockStack>
        </InlineStack>

        {/* Timestamp */}
        <Text variant="bodySm" tone="subdued">
          {formattedDate}
        </Text>
      </InlineStack>
    </ResourceItem>
  );
};
export default NotificationItem;

NotificationItem.propTypes = {
  data: PropTypes.object.isRequired
};
