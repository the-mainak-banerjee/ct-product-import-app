import { v4 as uuidv4 } from 'uuid';

import type { TQuery } from '../types/generated/ctp';
import type { TFormValues } from '../types';
import { REDIRECT_CONTAINER } from '../constants';

export const docToFormValues = (
  customObject: TQuery['customObject'] | null
): TFormValues => ({
  container: REDIRECT_CONTAINER,
  key: customObject?.key ?? '',
  from: (customObject?.value.from as string) ?? '',
  to: (customObject?.value.to as string) ?? '',
  type: !!customObject?.value.type ? String(customObject.value.type) : '',
  vertical: customObject?.value?.vertical,
  version: customObject?.version ?? undefined,
});

export const formValuesToDoc = (formValues: TFormValues) => {
  return ({
  key: formValues.key || uuidv4(),
  container: formValues.container,
  value: JSON.stringify({
    from: formValues.from,
    to: formValues.to,
    type: Number(formValues.type),
    vertical: formValues.vertical
  }),
  version: formValues.version,
})};
