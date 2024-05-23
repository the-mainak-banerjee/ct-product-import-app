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
          <CButton color="primary">Products Import Report</CButton>
          <CButton color="primary">Variants Import Report</CButton>
          <CButton color="primary">Pricing Import Report</CButton>
        </section>
        <TableReports />
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
