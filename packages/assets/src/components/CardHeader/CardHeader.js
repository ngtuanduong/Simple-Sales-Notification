import {BlockStack, InlineStack, Text} from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';

export default function CardHeader({title, subtitle, children = null,}) {
  return (
    <InlineStack>
      <BlockStack gap="200">
        <Text as="h1" variant="headingMd">
          {title}
        </Text>
        <Text as="p" variant="subdued">
          {subtitle}
        </Text>
      </BlockStack>
      <BlockStack>{children}</BlockStack>
    </InlineStack>
  );
}

CardHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
}
