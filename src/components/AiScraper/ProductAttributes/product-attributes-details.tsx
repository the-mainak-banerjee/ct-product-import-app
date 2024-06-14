import { useCallback } from 'react';
import { FormModalPage } from '@commercetools-frontend/application-components';
import { docToFormValues, formValuesToDoc } from './conversions';
import ProductAttributeForm from './product-attributes-form';
import { IProductAttributes } from './ProductAttributes';

export interface IProductAttributesDetails {
  onClose: () => void;
  isEdit?: boolean;
  data?: {
    key: string;
    value: IProductAttributes;
  };
}

const ProductAttributesDetails = (props: IProductAttributesDetails) => {
  const handleSubmit = useCallback(async (formValues) => {
    const data = formValuesToDoc(formValues);
    // This would trigger the request, for example a mutation.
    //   const result = await createChannel(data);
    // If successful, show a notification and redirect
    // to the Channels details page.
    // If errored, show an error notification.
  }, []);

  return (
    <ProductAttributeForm
      initialValues={docToFormValues(props.isEdit ? props.data : null)}
      onSubmit={handleSubmit}
      isEdit={props.isEdit}
    >
      {(formProps) => {
        return (
          <FormModalPage
            title="Create a Product Attribute"
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
    </ProductAttributeForm>
  );
};

export default ProductAttributesDetails;
