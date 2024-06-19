import { FormikHelpers, useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import Spacings from '@commercetools-uikit/spacings';
import { validate } from './validate';
import { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { TFormValues } from '../../../types';
import Papa from 'papaparse';
import styles from './JobRuns.module.css';
import { PagesIcon } from '@commercetools-uikit/icons';

type Formik = ReturnType<typeof useFormik>;
type FormProps = {
  formElements: ReactElement;
  values: Formik['values'];
  isDirty: Formik['dirty'];
  isSubmitting: Formik['isSubmitting'];
  submitForm: Formik['handleSubmit'];
  handleCancel: Formik['handleReset'];
};
type TJobRunsFormProps = {
  onSubmit: (
    values: TFormValues,
    formikHelpers: FormikHelpers<TFormValues>
  ) => void | Promise<unknown>;
  initialValues: TFormValues;
  isReadOnly?: boolean;
  dataLocale?: string;
  children: (formProps: FormProps) => JSX.Element;
  isEdit?: boolean;
};

const JobRunsForm = (props: TJobRunsFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  const uploadFileHasError =
    formik.errors.aifiledata && formik.errors.aifiledata.missing;

  const handleChangeImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    setUploadedFileName(fileUploaded?.name ?? '');
    Papa.parse(fileUploaded, {
      chunkSize: 3,
      skipEmptyLines: true,
      header: true,
      complete: function (resp: { data: [] }) {
        if (resp.data) {
          formik.setFieldValue('aifiledata', resp.data);
        }
      },
    });
  };

  // Only contains the form elements, no buttons.
  const formElements = (
    <Spacings.Stack scale="l">
      <TextField
        name="attributeName"
        title="Name"
        value={formik.values.attributeName}
        errors={TextField.toFieldErrors(formik.errors).attributeName}
        touched={formik.touched.attributeName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderError={(key: string) => {
          switch (key) {
            case 'missing':
              return 'This field is required.';
            default:
              return null;
          }
        }}
        isRequired
        horizontalConstraint={16}
      />
      <SelectField
        name="attributeProfile"
        title="Attribute Profile"
        value={formik.values.attributeProfile}
        options={[
          { value: 'Test Profile 1', label: 'Test Profile 1' },
          { value: 'Test Profile 2', label: 'Test Profile 2' },
          { value: 'Test Profile 3', label: 'Test Profile 3' },
          { value: 'Test Profile 4', label: 'Test Profile 4' },
          { value: 'Test Profile 5', label: 'Test Profile 5' },
          { value: 'Test Profile 6', label: 'Test Profile 6' },
        ]}
        errors={SelectField.toFieldErrors(formik.errors).attributeProfile}
        touched={formik.touched.attributeProfile}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderError={(key: string) => {
          switch (key) {
            case 'missing':
              return 'This field is required.';
            default:
              return null;
          }
        }}
        isRequired
        horizontalConstraint={16}
      />
      <SelectField
        name="aigeneratedfields"
        title="Ai Generated Fields"
        value={formik.values.aigeneratedfields}
        isMulti={true}
        options={[
          { value: 'Test Field 1', label: 'Test Field 1' },
          { value: 'Test Field 2', label: 'Test Field 2' },
          { value: 'Test Field 3', label: 'Test Field 3' },
          { value: 'Test Field 4', label: 'Test Field 4' },
          { value: 'Test Field 5', label: 'Test Field 5' },
          { value: 'Test Field 6', label: 'Test Field 6' },
        ]}
        errors={SelectField.toFieldErrors(formik.errors).aigeneratedfields}
        touched={formik.touched.aigeneratedfields}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        renderError={(key: string) => {
          switch (key) {
            case 'missing':
              return 'This field is required.';
            default:
              return null;
          }
        }}
        isRequired
        horizontalConstraint={16}
      />
      <div>
        <button
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
              fileInputRef.current.value = '';
            }
          }}
          className={`${styles.fileUploadInput} ${
            uploadFileHasError && styles.fileUploadInputError
          }`}
          disabled={formik.isSubmitting}
        >
          <PagesIcon size="big" />
          {uploadedFileName && <strong>{uploadedFileName}</strong>}
          {uploadedFileName ? (
            <span>Change the file</span>
          ) : (
            <span>Drag to upload</span>
          )}
        </button>
        <input
          name="aifiledata"
          required={true}
          type="file"
          accept=".csv"
          id="csv_input"
          ref={fileInputRef}
          hidden
          onChange={handleChangeImportFile}
        />
        {uploadFileHasError && (
          <p className={styles.error}>This field is required</p>
        )}
      </div>
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleCancel: formik.handleReset,
  });
};

export default JobRunsForm;
