import { CSVBoxButton } from '@csvbox/react';
import styles from './CsvWidget.module.css';

export const CsvWidget = () => {
  return (
    <CSVBoxButton
      licenseKey="qDz4ISm9m8TMZ6HL3I4YzircVGS5A4"
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
          <button onClick={launch} className={styles.btn}>
            {isLoading ? 'loading..' : 'Upload file'}
          </button>
        );
      }}
    >
      Import
    </CSVBoxButton>
  );
};
