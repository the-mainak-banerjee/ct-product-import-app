import type { ReactElement } from 'react';
import { useFormik, type FormikHelpers } from 'formik';
import { useIntl } from 'react-intl';

import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import RadioField from '@commercetools-uikit/radio-field';
import RadioInput from '@commercetools-uikit/radio-input';

import type { TFormValues } from '../../types';
import validate from './validate';
import { messages } from '../../helperss';

type Formik = ReturnType<typeof useFormik>;
type FormProps = {
  formElements: ReactElement;
  values: Formik['values'];
  isDirty: Formik['dirty'];
  isSubmitting: Formik['isSubmitting'];
  submitForm: Formik['handleSubmit'];
  handleReset: Formik['handleReset'];
};
type TRedirectFormProps = {
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

const RedirectForm = (props: TRedirectFormProps) => {
  const intl = useIntl();
  const formik = useFormik<TFormValues>({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <TextField
        name="vertical"
        title={intl.formatMessage(messages.redirectVerticalInputFieldTitle)}
        value={formik.values.vertical}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).vertical}
        touched={formik.touched.vertical}
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
        placeholder={intl.formatMessage(
          messages.redirectVerticalInputFieldTitle
        )}
      />
      <TextField
        name="from"
        title={intl.formatMessage(messages.redirectFromInputFieldTitle)}
        value={formik.values.from || ''}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).from}
        touched={formik.touched.from}
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
        placeholder={intl.formatMessage(
          messages.redirectFromInputFieldPlaceholder
        )}
      />
      <TextField
        name="to"
        title={intl.formatMessage(messages.redirectToInputFieldTitle)}
        value={formik.values.to || ''}
        errors={TextField.toFieldErrors<TFormValues>(formik.errors).to}
        touched={formik.touched.to}
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
        placeholder={intl.formatMessage(
          messages.redirectToInputFieldPlaceholder
        )}
      />
      <RadioField
        title={intl.formatMessage(messages.redirectTypeRadioFieldTitle)}
        name="type"
        value={String(formik.values.type || '')}
        errors={RadioField.toFieldErrors<TFormValues>(formik.errors).type}
        touched={formik.touched.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderError={(key: string) => {
          switch (key) {
            case 'missing':
              return 'This field is required.';
            case 'invalid':
              return 'This field is invalid. Value must be 301 or 302';
            default:
              return null;
          }
        }}
        isRequired
      >
        <RadioInput.Option value="301">{'301 (permanent)'}</RadioInput.Option>
        <RadioInput.Option value="302">{'302 (temporary)'}</RadioInput.Option>
      </RadioField>
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
RedirectForm.displayName = 'RedirectForm';

export default RedirectForm;
