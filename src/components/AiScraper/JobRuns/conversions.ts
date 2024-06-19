import { v4 as uuidv4 } from 'uuid';
import type { TFormValues } from '../../../types';
import { IAttributeGroupDetails } from './job-runs-details';

export const docToFormValues = (
  customObject: IAttributeGroupDetails['data'] | null
): TFormValues => ({
  key: customObject?.key ?? '',
  attributeName: (customObject?.value.name as string) ?? '',
  aifiledata: customObject?.value.aifiledata as string[],
  attributeProfile: customObject?.value.attributeProfile as string[],
  aigeneratedfields: customObject?.value.aigeneratedfields as string[],
});

export const formValuesToDoc = (formValues: TFormValues) => {
  return {
    key: formValues.key || uuidv4(),
    container: formValues.container,
    value: JSON.stringify({
      attributeName: formValues.attributeName,
      attributeProfile: formValues.attributeProfile,
      aigeneratedfields: formValues.aigeneratedfields,
      aifiledata: formValues.aifiledata,
    }),
    version: formValues.version,
  };
};
