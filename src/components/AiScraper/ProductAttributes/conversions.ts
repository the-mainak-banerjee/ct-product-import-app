import { v4 as uuidv4 } from 'uuid';
import type { TFormValues } from '../../../types';
import { IProductAttributesDetails } from './product-attributes-details';

export const docToFormValues = (
  customObject: IProductAttributesDetails['data'] | null
): TFormValues => ({
  key: customObject?.key ?? '',
  attributeName: (customObject?.value.name as string) ?? '',
  attributeDescription: (customObject?.value.description as string) ?? '',
});

export const formValuesToDoc = (formValues: TFormValues) => {
  return {
    key: formValues.key || uuidv4(),
    container: formValues.container,
    value: JSON.stringify({
      attributeName: formValues.attributeName,
      attributeDescription: formValues.attributeDescription,
    }),
    version: formValues.version,
  };
};
