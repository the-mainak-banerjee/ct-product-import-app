import omitEmpty from 'omit-empty-es';
import type { FormikErrors } from 'formik';

import TextInput from '@commercetools-uikit/text-input';

import type { TFormValues } from '../../types';

type TErrors = {
  from: { missing?: boolean };
  to: { missing?: boolean };
  type: { missing?: boolean; invalid?: boolean };
};

const validate = (formikValues: TFormValues): FormikErrors<TFormValues> => {
  const reg = new RegExp(/^301|302+$/);

  const errors: TErrors = {
    from: {},
    to: {},
    type: {},
  };

  if (TextInput.isEmpty(formikValues.from)) {
    errors.from.missing = true;
  }

  if (TextInput.isEmpty(formikValues.to)) {
    errors.to.missing = true;
  }

  if (TextInput.isEmpty(formikValues.type)) {
    errors.type.missing = true;
  }

  if (!TextInput.isEmpty(formikValues.type) && !reg.test(formikValues.type)) {
    errors.type.invalid = true;
  }

  return omitEmpty(errors);
};

export default validate;
