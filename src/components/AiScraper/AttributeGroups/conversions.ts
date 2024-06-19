import { v4 as uuidv4 } from 'uuid';
import type { TFormValues } from '../../../types';
import { IAttributeGroupDetails } from './attribute-groups-details';

export const docToFormValues = (
  customObject: IAttributeGroupDetails['data'] | null
): TFormValues => ({
  key: customObject?.key ?? '',
  attributeName: (customObject?.value.name as string) ?? '',
  attributefields: customObject?.value.fields as string[],
});

export const formValuesToDoc = (formValues: TFormValues) => {
  return {
    key: formValues.key || uuidv4(),
    container: formValues.container,
    value: JSON.stringify({
      attributeName: formValues.attributeName,
      attributefields: formValues.attributefields,
    }),
    version: formValues.version,
  };
};
