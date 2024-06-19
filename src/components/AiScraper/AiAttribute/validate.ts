import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import omitEmpty from 'omit-empty-es';
import { TFormValues } from '../../../types';
import { FormikErrors } from 'formik';

type TErrors = {
  attributeName: { missing?: boolean };
  attributePrompt: { missing?: boolean };
  attributebackground: { missing?: boolean };
  minLength: { missing?: boolean };
  maxLength: { missing?: boolean };
};

export const validate = (values: TFormValues): FormikErrors<TFormValues> => {
  const errors: TErrors = {
    attributeName: {},
    attributePrompt: {},
    attributebackground: {},
    minLength: {},
    maxLength: {},
  };

  if (LocalizedTextInput.isEmpty(values.attributeName)) {
    errors.attributeName = { missing: true };
  }

  if (LocalizedTextInput.isEmpty(values.attributePrompt)) {
    errors.attributePrompt = { missing: true };
  }

  if (LocalizedTextInput.isEmpty(values.attributebackground)) {
    errors.attributebackground = { missing: true };
  }

  if (values.minLength === undefined) {
    errors.minLength = { missing: true };
  }

  if (values.maxLength === undefined) {
    errors.minLength = { missing: true };
  }

  return omitEmpty(errors);
};
