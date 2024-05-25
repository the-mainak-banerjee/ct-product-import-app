import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react';
import styles from './CreateImportJobModal.module.css';
import React, { useState, Dispatch, SetStateAction } from 'react';

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setShowCSVBox: Dispatch<SetStateAction<boolean>>;
}

const options = [
  { label: '', value: '' },
  { label: 'Products', value: 'Products' },
  { label: 'Variants', value: 'Variants' },
];

const CreateImportJobModal = ({
  visible,
  setVisible,
  setShowCSVBox,
}: IProps) => {
  const [selectBoxValue, setSelectBoxValue] = useState('');
  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => {
        setVisible(false);
        setSelectBoxValue('');
      }}
      aria-labelledby="VerticallyCenteredScrollableExample2"
    >
      <CModalHeader className={styles.modalHeader}>
        <CModalTitle id="VerticallyCenteredScrollableExample2">
          Create Job
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            type="text"
            id="Name"
            label="Name *"
            aria-describedby="name"
            required
            className={styles.nameInput}
          />
          <CFormSelect
            aria-label="Types"
            options={options}
            label="Types *"
            required
            className={styles.selectBox}
            onChange={(event) => {
              setSelectBoxValue(event.target.value);
            }}
          />
        </CForm>
      </CModalBody>
      <CModalFooter className={styles.modalFooter}>
        <CButton
          color="secondary"
          onClick={() => {
            setVisible(false);
            setSelectBoxValue('');
            setShowCSVBox(false);
          }}
        >
          Cancel
        </CButton>
        <CButton
          color="primary"
          onClick={() => {
            setShowCSVBox(true);
            setVisible(false);
          }}
        >
          Start Import
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default CreateImportJobModal;
