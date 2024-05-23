import { CSVBoxButton } from '@csvbox/react';

export const CsvWidget = () => {
  return (
    <CSVBoxButton
      licenseKey="yThnXOZPn7DONeRl6azlmmIZNdC5tI"
      user={{
        user_id: 'default123',
      }}
      onImport={(result, data) => {
        if (result) {
          console.log('success');
          console.log({result, data})
          console.log(data.row_success + ' rows uploaded');
          //custom code
        } else {
          console.log('fail');
          //custom code
        }
      }}
      render={(launch, isLoading) => {
        return (
          !isLoading && launch()
        );
      }}
      dynamicColumns={[
        {
          "column_name" : "qualification"        
        },
        {
           "column_name": "experience"         
       }
]}
    >
      Import
    </CSVBoxButton>
  );
};
