import { v4 as uuidv4 } from 'uuid';
import type { TFormValues } from '../../../types';
import { IAiAttributesDetails } from './ai-attribute-details';

export const docToFormValues = (
  customObject: IAiAttributesDetails['data'] | null
): TFormValues => ({
  key: customObject?.key ?? '',
  attributeName: (customObject?.value.name as string) ?? '',
  attributePrompt: (customObject?.value.prompt as string) ?? '',
  attributebackground: (customObject?.value.background as string) ?? '',
  minLength: customObject?.value.minLength as number,
  maxLength: customObject?.value.maxLength as number,
});

export const formValuesToDoc = (formValues: TFormValues) => {
  return {
    key: formValues.key || uuidv4(),
    container: formValues.container,
    value: JSON.stringify({
      attributeName: formValues.attributeName,
      attributePrompt: formValues.attributePrompt,
      attributebackground: formValues.attributebackground,
      minLength: formValues.minLength,
      maxLength: formValues.maxLength,
    }),
    version: formValues.version,
  };
};
