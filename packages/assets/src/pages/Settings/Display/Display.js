import PositionSettingSkeleton from '@assets/pages/Settings/SettingSkeleton/PositionSettingSkeleton';
import TimingSettingSkeleton from '@assets/pages/Settings/SettingSkeleton/TimingSettingSkeleton';
import PositionSetting from '@assets/pages/Settings/Display/PositionSetting/PositionSetting';
import TimingSetting from '@assets/pages/Settings/Display/TimingSetting/TimingSetting';
import {BlockStack} from '@shopify/polaris';
import React from 'react';
import PropTypes from 'prop-types';
export default function Display({loading, input, handleChangeInput}) {
  return (
    <BlockStack gap="500">
      {loading ? (
        <>
          <PositionSettingSkeleton />
          <TimingSettingSkeleton />
        </>
      ) : (
        <>
          <PositionSetting handleChang eInput={handleChangeInput} input={input} />
          <TimingSetting handleChangeInput={handleChangeInput} input={input} />
        </>
      )}
    </BlockStack>
  );
}

Display.propTypes = {
  loading: PropTypes.bool,
  input: PropTypes.object,
  handleChangeInput: PropTypes.func
};
