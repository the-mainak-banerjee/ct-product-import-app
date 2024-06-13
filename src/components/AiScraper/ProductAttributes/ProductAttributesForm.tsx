import type { ReactElement } from 'react';
import { useFormik, type FormikHelpers } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import type { TFormValues } from '../../../types';
import validate from './validate';

type Formik = ReturnType<typeof useFormik>;
type FormProps = {
  formElements: ReactElement;
  values: Formik['values'];
  isDirty: Formik['dirty'];
  isSubmitting: Formik['isSubmitting'];
  submitForm: Formik['handleSubmit'];
  handleReset: Formik['handleReset'];
};
type TProductAttributesFormProps = {
  onSubmit: (
    values: TFormValues,
    formikHelpers: FormikHelpers<TFormValues>
  ) => void | Promise<unknown>;
  initialValues: TFormValues;
  isReadOnly: boolean;
  dataLocale: string;
  children: (formProps: FormProps) => JSX.Element;
  isEdit?: boolean;
};

const ProductAttributesForm = (props: TProductAttributesFormProps) => {
  const formik = useFormik<TFormValues>({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <TextField
        name="attributeName"
        title="Name"
        value={formik.values.attributeName}
        errors={
          TextField.toFieldErrors<TFormValues>(formik.errors).attributeName
        }
        touched={formik.touched.attributeName}
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
        placeholder="Attribute Name"
      />
      <TextField
        name="from"
        title="Description"
        value={formik.values.description || ''}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).description}
        touched={formik.touched.description}
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
        placeholder="Attribute Description"
      />
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
ProductAttributesForm.displayName = 'ProductAttributesForm';

export default ProductAttributesForm;
