import {BlockStack, Card, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';
import PositionDisplay from '@assets/components/PositionDisplay/PositionDisplay';
import CardHeader from '@assets/components/CardHeader/CardHeader';

export default function PositionSettingSkeleton() {
  return (
    <Card>
      <BlockStack gap="300">
        <CardHeader title="Appearance" subtitle="Adjust popup appearance in storefront" />

        <PositionDisplay label="Display type" />

        <SkeletonBodyText lines={1} />
        <SkeletonBodyText lines={1} />
      </BlockStack>
    </Card>
  );
}
