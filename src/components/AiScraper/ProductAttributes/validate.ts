import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import omitEmpty from 'omit-empty-es';
import { TFormValues } from '../../../types';
import { FormikErrors } from 'formik';

type TErrors = {
  attributeName: { missing?: boolean };
  attributeDescription: { missing?: boolean };
};

export const validate = (values: TFormValues): FormikErrors<TFormValues> => {
  const errors: TErrors = {
    attributeName: {},
    attributeDescription: {},
  };

  if (LocalizedTextInput.isEmpty(values.attributeName)) {
    errors.attributeName = { missing: true };
  }

  if (LocalizedTextInput.isEmpty(values.attributeDescription)) {
    errors.attributeDescription = { missing: true };
  }

  return omitEmpty(errors);
};
