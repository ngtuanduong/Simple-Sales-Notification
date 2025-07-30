import React, {useCallback, useState} from 'react';
import {FormLayout, Select, TextField} from '@shopify/polaris';
import {object, bool, func} from 'prop-types';
export default function Trigger({input, handleChangeInput, loading}) {
  const [selected, setSelected] = useState('all');
  const handleSelectChange = useCallback(value => setSelected(value), []);
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];

  return (
    <>
      <FormLayout>
        <Select
          label="Page restriction"
          options={options}
          onChange={value => {
            handleSelectChange(value);
            handleChangeInput('allowShow', value);
          }}
          value={selected}
        />
        {input.allowShow === 'specific' && (
          <TextField
            label="Included pages"
            value={input.includedUrls}
            onChange={value => handleChangeInput('includedUrls', value)}
            helpText="Pages URLs show the pop-up (seperated by new lines)"
            multiline={4}
            autoComplete="off"
            loading={loading}
          />
        )}
        <TextField
          label="Excluded pages"
          value={input.excludedUrls}
          onChange={value => handleChangeInput('excludedUrls', value)}
          helpText="Pages URLs NOT to show the pop-up (seperated by new lines)"
          multiline={4}
          autoComplete="off"
          loading={loading}
        />
      </FormLayout>
    </>
  );
}

Trigger.propTypes = {
  input: object,
  handleChangeInput: func,
  loading: bool
};
