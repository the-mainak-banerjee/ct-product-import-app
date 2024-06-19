import { useCallback } from 'react';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues, formValuesToDoc } from './conversions';
import AiAttributeForm from './ai-attribute-form';
import { IAIAttribute } from './AiAttribute';

export interface IAiAttributesDetails {
  onClose: () => void;
  isEdit?: boolean;
  data?: {
    key: string;
    value: IAIAttribute;
  };
}

const AiAttributesDetails = (props: IAiAttributesDetails) => {
  const handleSubmit = useCallback(async (formValues) => {
    const data = formValuesToDoc(formValues);
    // This would trigger the request, for example a mutation.
    //   const result = await createChannel(data);
    // If successful, show a notification and redirect
    // to the Channels details page.
    // If errored, show an error notification.
  }, []);

  return (
    <AiAttributeForm
      initialValues={docToFormValues(props.isEdit ? props.data : null)}
      onSubmit={handleSubmit}
      isEdit={props.isEdit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title={
              props.isEdit ? 'Edit the Ai Attribute' : 'Create an Ai Attribute'
            }
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
    </AiAttributeForm>
  );
};

export default AiAttributesDetails;
