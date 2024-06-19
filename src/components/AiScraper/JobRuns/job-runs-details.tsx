import { useCallback } from 'react';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues, formValuesToDoc } from './conversions';
import JobRunsForm from './job-runs-form';

export interface IAttributeGroupDetails {
  onClose: () => void;
  isEdit?: boolean;
  data?: {
    key: string;
    value: {
      name: string;
      attributeProfile: string[];
      aigeneratedfields: string[];
      aifiledata: string[];
    };
  };
}

const JobRunsDetails = (props: IAttributeGroupDetails) => {
  const handleSubmit = useCallback(async (formValues) => {
    const data = formValuesToDoc(formValues);

    // This would trigger the request, for example a mutation.
    //   const result = await createChannel(data);
    // If successful, show a notification and redirect
    // to the Channels details page.
    // If errored, show an error notification.
  }, []);

  return (
    <JobRunsForm
      initialValues={docToFormValues(null)}
      onSubmit={handleSubmit}
      isEdit={props.isEdit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title="Create Job Run"
            isOpen
            onClose={props.onClose}
            isPrimaryButtonDisabled={formProps.isSubmitting}
            onSecondaryButtonClick={(e) => {
              formProps.handleCancel(e);
              props.onClose();
            }}
            onPrimaryButtonClick={() => formProps.submitForm()}
          >
            {formProps.formElements}
          </FormModalPage>
        );
      }}
    </JobRunsForm>
  );
};

export default JobRunsDetails;
