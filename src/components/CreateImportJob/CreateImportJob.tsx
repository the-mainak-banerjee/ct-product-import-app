import { CButton } from '@coreui/react';
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
          <CButton color="primary" onClick={() => setTableType('pricing')}>
            Pricing Import Report
          </CButton>
        </section>
        <TableReports tableType={tableType} />
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
