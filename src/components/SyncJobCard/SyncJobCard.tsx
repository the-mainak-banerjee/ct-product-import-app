import { CButton } from '@coreui/react';
import styles from './SyncJobCard.module.css';

interface IProps {
  heading: string;
  description: string;
  handleStartJob: () => void;
}

const SyncJobCard = ({ description, heading, handleStartJob }: IProps) => {
  return (
    <div className={styles.container}>
      <div>
        <h4>{heading}</h4>
        <p>{description}</p>
      </div>
      <CButton color="primary" onClick={() => handleStartJob()}>
        Start Job
      </CButton>
    </div>
  );
};

export default SyncJobCard;
