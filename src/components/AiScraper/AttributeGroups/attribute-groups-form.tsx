import { FormikHelpers, useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
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
type TAttributeGroupsFormProps = {
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

const AttributeGroupForm = (props: TAttributeGroupsFormProps) => {
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
        horizontalConstraint={16}
      />
      <SelectField
        name="attributefields"
        title="Fields"
        value={formik.values.attributefields}
        isMulti={true}
        options={[
          { value: 'Test Field 1', label: 'Test Field 1' },
          { value: 'Test Field 2', label: 'Test Field 2' },
          { value: 'Test Field 3', label: 'Test Field 3' },
          { value: 'Test Field 4', label: 'Test Field 4' },
          { value: 'Test Field 5', label: 'Test Field 5' },
          { value: 'Test Field 6', label: 'Test Field 6' },
        ]}
        errors={SelectField.toFieldErrors(formik.errors).attributefields}
        touched={formik.touched.attributefields}
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
        horizontalConstraint={16}
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

export default AttributeGroupForm;
