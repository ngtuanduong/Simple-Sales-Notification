import {BlockStack, InlineStack, SkeletonBodyText, Text} from '@shopify/polaris';
import React from 'react';

export default function PositionSettingSkeleton() {
  return (
    <>
      <Text as="h2" variant="headingMd">
        Position Settings
      </Text>

      <Text as="p" variant="bodyMd" fontWeight="semibold">
        Choose notification position:
      </Text>

      <InlineStack gap="400" align="start">
        {[...Array(4)].map((_, idx) => (
          <BlockStack gap="400" key={idx}>
            {/* Skeleton for radio button */}
            <SkeletonBodyText lines={1} />

            {/* Skeleton for preview box */}
            <div
              style={{
                width: '80px',
                height: '60px',
                border: '1px solid #000',

                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '10px',
                  backgroundColor: '#000',
                  position: 'absolute',
                  ...(idx === 0 && {bottom: '6px', left: '6px'}),
                  ...(idx === 1 && {bottom: '6px', right: '6px'}),
                  ...(idx === 2 && {top: '6px', left: '6px'}),
                  ...(idx === 3 && {top: '6px', right: '6px'})
                }}
              />
            </div>
          </BlockStack>
        ))}
      </InlineStack>
      <SkeletonBodyText lines={1} />
      <SkeletonBodyText lines={1} />
    </>
  );
}
