import React from 'react';
import {Text, ResourceItem, InlineStack} from '@shopify/polaris';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';

const NotificationItem = ({data}) => {
  const fromNow = moment(data.createdAt).fromNow();
  const formattedDate = moment(data.createdAt).format('HH:MM MMM DD, YYYY');
  return (
    <ResourceItem id={data.id}>
      <InlineStack
        align="space-between"
        gap="400"
        wrap={false}
        blockAlign="center"
        style={{padding: '12px 0'}}
      >
        <NotificationPopup {...data} timeAgo={fromNow} />
        <Text as={'p'} variant="bodySm" tone="subdued">
          Created at
          <br />
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
