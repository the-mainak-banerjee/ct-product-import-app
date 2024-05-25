import { CButton, CFormSelect } from '@coreui/react';
import styles from './CreateImportJob.module.css';
import React, { Dispatch, SetStateAction, useState } from 'react';
import CreateImportJobModal from '../CreateImportJobModal';
import TableReports from '../TableReports';

interface IProps {
  setShowCSVBox: Dispatch<SetStateAction<boolean>>;
}

const CreateImportJob = ({ setShowCSVBox }: IProps) => {
  const [visible, setVisible] = useState(false);
  const [tableType, setTableType] = useState('products');
  const [statusText, setStatusText] = useState('');

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.createImportJob}>
          <h2 className={styles.title}>PIM</h2>
          <CButton
            color="primary"
            onClick={() => {
              return setVisible(true);
            }}
          >
            Create Import Job
          </CButton>
        </section>
        <section className={styles.buttons}>
          <CButton color="primary" onClick={() => setTableType('products')}>
            Products Import Report
          </CButton>
          <CButton color="primary" onClick={() => setTableType('variants')}>
            Variants Import Report
          </CButton>
          <CFormSelect
            aria-label="Default select example"
            options={[
              { label: '', value: '' },
              { label: 'Success', value: 'Success' },
              { label: 'Failed', value: 'Failed' },
            ]}
            className={styles.statusSelectBox}
            onChange={(e) => {
              setStatusText(e.target.value);
            }}
          />
        </section>
        <TableReports tableType={tableType} statusText={statusText} />
      </div>
      <CreateImportJobModal
        visible={visible}
        setVisible={setVisible}
        setShowCSVBox={setShowCSVBox}
      />
    </>
  );
};

export default CreateImportJob;
