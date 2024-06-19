import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import omitEmpty from 'omit-empty-es';
import { TFormValues } from '../../../types';
import { FormikErrors } from 'formik';

type TErrors = {
  attributeName: { missing?: boolean };
  attributefields: { missing?: boolean };
};

export const validate = (values: TFormValues): FormikErrors<TFormValues> => {
  const errors: TErrors = {
    attributeName: {},
    attributefields: {},
  };

  if (LocalizedTextInput.isEmpty(values.attributeName)) {
    errors.attributeName = { missing: true };
  }
  if (!values.attributefields?.length) {
    errors.attributefields = { missing: true };
  }

  return omitEmpty(errors);
};
