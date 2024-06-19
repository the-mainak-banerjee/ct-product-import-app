import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import omitEmpty from 'omit-empty-es';
import { TFormValues } from '../../../types';
import { FormikErrors } from 'formik';

type TErrors = {
  attributeName: { missing?: boolean };
  attributeProfile: { missing?: boolean };
  aigeneratedfields: { missing?: boolean };
  aifiledata: { missing?: boolean };
};

export const validate = (values: TFormValues): FormikErrors<TFormValues> => {
  const errors: TErrors = {
    attributeName: {},
    attributeProfile: {},
    aigeneratedfields: {},
    aifiledata: {},
  };

  if (LocalizedTextInput.isEmpty(values.attributeName)) {
    errors.attributeName = { missing: true };
  }

  if (!values.attributeProfile?.length) {
    errors.attributeProfile = { missing: true };
  }

  if (!values.aigeneratedfields?.length) {
    errors.aigeneratedfields = { missing: true };
  }

  if (!values.aifiledata?.length) {
    errors.aifiledata = { missing: true };
  }

  return omitEmpty(errors);
};
