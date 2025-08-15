import React from 'react';
import {FormLayout, Select, TextField} from '@shopify/polaris';
import {object, bool, func} from 'prop-types';
import TriggerPageOptions from '@assets/const/TriggerPageOptions';

export default function Trigger({input, handleChangeInput, loading}) {
  const options = TriggerPageOptions;
  const LINE_NUMBER = 4;

  return (
    <FormLayout>
      <Select
        label="Page restriction"
        options={Object.values(options)}
        onChange={value => {
          handleChangeInput('allowShow', value);
        }}
        value={input.allowShow}
      />
      {input.allowShow === options.SPECIFIC_PAGES.value && (
        <TextField
          label="Included pages"
          value={input.includedUrls}
          onChange={value => handleChangeInput('includedUrls', value)}
          helpText="Pages URLs show the pop-up (seperated by new lines)"
          multiline={LINE_NUMBER}
          autoComplete="off"
          loading={loading}
        />
      )}
      <TextField
        label="Excluded pages"
        value={input.excludedUrls}
        onChange={value => handleChangeInput('excludedUrls', value)}
        helpText="Pages URLs NOT to show the pop-up (seperated by new lines)"
        multiline={LINE_NUMBER}
        autoComplete="off"
        loading={loading}
      />
    </FormLayout>
  );
}

Trigger.propTypes = {
  input: object,
  handleChangeInput: func,
  loading: bool
};
