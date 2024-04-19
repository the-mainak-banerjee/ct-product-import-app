import React from 'react';
import { CSVBoxButton } from '@csvbox/react';

export const CsvWidget = () => {
  return (
    <CSVBoxButton
      licenseKey="${env:LICENSE_KEY}"
      user={{
        user_id: 'default123',
      }}
      onImport={(result, data) => {
        if (result) {
          console.log('success');
          console.log(data.row_success + ' rows uploaded');
          //custom code
        } else {
          console.log('fail');
          //custom code
        }
      }}
      render={(launch, isLoading) => {
        return (
          <button disabled={isLoading} onClick={launch}>
            Upload file
          </button>
        );
      }}
    >
      Import
    </CSVBoxButton>
  );
};
