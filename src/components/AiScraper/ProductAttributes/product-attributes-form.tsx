import { FormikHelpers, useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import MultilineTextField from '@commercetools-uikit/multiline-text-field';
import Spacings from '@commercetools-uikit/spacings';
import { validate } from './validate';
import { ReactElement } from 'react';
import { TFormValues } from '../../../types';

type Formik = ReturnType<typeof useFormik>;
type FormProps = {
  formElements: ReactElement;
  values: Formik['values'];
  isDirty: Formik['dirty'];
  isSubmitting: Formik['isSubmitting'];
  submitForm: Formik['handleSubmit'];
  handleCancel: Formik['handleReset'];
};
type TRedirectFormProps = {
  onSubmit: (
    values: TFormValues,
    formikHelpers: FormikHelpers<TFormValues>
  ) => void | Promise<unknown>;
  initialValues: TFormValues;
  isReadOnly?: boolean;
  dataLocale?: string;
  children: (formProps: FormProps) => JSX.Element;
  isEdit?: boolean;
};

const ProductAttributeForm = (props: TRedirectFormProps) => {
  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  // Only contains the form elements, no buttons.
  const formElements = (
    <Spacings.Stack scale="l">
      <TextField
        name="attributeName"
        title="Name"
        value={formik.values.attributeName}
        errors={TextField.toFieldErrors(formik.errors).attributeName}
        // touched={formik.touched.attributeName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderError={(key: string) => {
          switch (key) {
            case 'missing':
              return 'This field is required.';
            default:
              return null;
          }
        }}
        isRequired
        horizontalConstraint={8}
      />
      <MultilineTextField
        name="attributeDescription"
        title="Description"
        isRequired
        value={formik.values.attributeDescription}
        errors={TextField.toFieldErrors(formik.errors).attributeDescription}
        renderError={(key: string) => {
          switch (key) {
            case 'missing':
              return 'This field is required.';
            default:
              return null;
          }
        }}
        // touched={formik.touched.attributeDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        horizontalConstraint={8}
      />
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleCancel: formik.handleReset,
  });
};

export default ProductAttributeForm;
