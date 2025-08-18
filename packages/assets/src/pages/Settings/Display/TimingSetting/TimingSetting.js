import React from 'react';
import {BlockStack, RangeSlider, Grid, Card} from '@shopify/polaris';
import {func, object} from 'prop-types';
import CardHeader from '@assets/components/CardHeader/CardHeader';
export default function TimingSetting({input, handleChangeInput}) {
  return (
    <Card>
      <BlockStack gap="400">
        <CardHeader title="Timing" subtitle="Adjust popup timing in storefront" />
        <Grid>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <RangeSlider
              label="Time before first popup (seconds)"
              value={input.firstDelay}
              onChange={value => handleChangeInput('firstDelay', value)}
              min={1}
              max={30}
              step={1}
              output
              helpText={`First popup will visible after ${input.firstDelay} seconds`}
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <RangeSlider
              label="Popup duration (seconds)"
              value={input.displayDuration}
              onChange={value => handleChangeInput('displayDuration', value)}
              min={1}
              max={30}
              step={1}
              output
              helpText={`Popup will stay visible for ${input.displayDuration} seconds`}
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <RangeSlider
              label="Delay between popups (seconds)"
              value={input.popsInterval}
              onChange={value => handleChangeInput('popsInterval', value)}
              min={1}
              max={60}
              step={1}
              output
              helpText={`Wait ${input.popsInterval} seconds before showing next popup`}
            />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <RangeSlider
              label="Maximum popups per session"
              value={input.maxPopsDisplay}
              onChange={value => handleChangeInput('maxPopsDisplay', value)}
              min={1}
              max={50}
              step={1}
              output
              helpText={`Show maximum ${input.maxPopsDisplay} popups per session`}
            />
          </Grid.Cell>
        </Grid>
      </BlockStack>
    </Card>
  );
}

TimingSetting.propTypes = {
  input: object,
  handleChangeInput: func
};
