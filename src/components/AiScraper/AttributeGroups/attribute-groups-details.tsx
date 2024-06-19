import { useCallback } from 'react';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues, formValuesToDoc } from './conversions';
import AttributeGroupForm from './attribute-groups-form';
import { IAttributeGroups } from './AttributeGroups';

export interface IAttributeGroupDetails {
  onClose: () => void;
  isEdit?: boolean;
  data?: {
    key: string;
    value: IAttributeGroups;
  };
}

const AiAttributesDetails = (props: IAttributeGroupDetails) => {
  const handleSubmit = useCallback(async (formValues) => {
    const data = formValuesToDoc(formValues);
    // This would trigger the request, for example a mutation.
    //   const result = await createChannel(data);
    // If successful, show a notification and redirect
    // to the Channels details page.
    // If errored, show an error notification.
  }, []);

  return (
    <AttributeGroupForm
      initialValues={docToFormValues(props.isEdit ? props.data : null)}
      onSubmit={handleSubmit}
      isEdit={props.isEdit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title={
              props.isEdit
                ? 'Edit the Attribute Group'
                : 'Create an Attribute Group'
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
    </AttributeGroupForm>
  );
};

export default AiAttributesDetails;
