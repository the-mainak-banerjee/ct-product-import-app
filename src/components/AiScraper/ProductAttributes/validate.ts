import omitEmpty from 'omit-empty-es';
import type { FormikErrors } from 'formik';

import TextInput from '@commercetools-uikit/text-input';

import type { TFormValues } from '../../../types';

type TErrors = {
  attributeName: { missing?: boolean };
  description: { missing?: boolean };
};

const validate = (formikValues: TFormValues): FormikErrors<TFormValues> => {
  const errors: TErrors = {
    attributeName: {},
    description: {},
  };

  if (TextInput.isEmpty(formikValues.attributeName)) {
    errors.attributeName.missing = true;
  }

  if (TextInput.isEmpty(formikValues.description)) {
    errors.description.missing = true;
  }

  return omitEmpty(errors);
};

export default validate;
