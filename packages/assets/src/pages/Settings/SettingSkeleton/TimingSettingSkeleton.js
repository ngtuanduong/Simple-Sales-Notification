import {BlockStack, Card, Grid, SkeletonBodyText, Text} from '@shopify/polaris';
import React from 'react';

export default function TimingSettingSkeleton() {
  return (
    <Card>
      <BlockStack gap="400">
        {/* Section Title */}
        <Text as="h2" variant="headingMd">
          Timing Settings
        </Text>
        <Grid>
          {[...Array(4)].map((_, idx) => (
            <Grid.Cell key={idx} columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
              <BlockStack gap="200">
                {/* Slider placeholder */}
                <SkeletonBodyText lines={1} />

                {/* Description below the slider */}
                <SkeletonBodyText lines={1} />
              </BlockStack>
            </Grid.Cell>
          ))}
        </Grid>
        {/* Each timing setting */}
      </BlockStack>
    </Card>
  );
}
