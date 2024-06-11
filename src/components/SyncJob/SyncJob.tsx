import SyncJobCard from '../SyncJobCard/SyncJobCard';
import styles from './SyncJob.module.css';

const SyncJob = () => {
  return (
    <div>
      <h2>Reindex Jobs</h2>
      <div className={styles.cardContainer}>
        <SyncJobCard
          heading="Full Algoia Sync"
          description="Triggers a full sync of all commercetools products to Algolia"
          handleStartJob={() => alert('Full Algoia Sync')}
        />
        <SyncJobCard
          heading="Contentful Category Sync"
          description="Triggers a of each category within commercetools to contentful"
          handleStartJob={() => alert('Contentful Category Sync')}
        />
      </div>
    </div>
  );
};

export default SyncJob;
