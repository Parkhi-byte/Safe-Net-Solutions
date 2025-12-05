import React from 'react';
import styles from './FeatureComparison.module.css';

const FeatureComparison = ({ features }) => {
  const renderIndicator = value => {
    if (value === true) {
      return <span className={styles.check}>✓</span>;
    }
    if (value === false) {
      return <span className={styles.cross}>—</span>;
    }
    return <span className={styles.detail}>{value}</span>;
  };

  return (
    <div className={styles.wrapper}>
      <h3>Compare plans at a glance</h3>
      <div className={styles.table} role="table" aria-label="Pricing feature comparison">
        <div className={`${styles.row} ${styles.headerRow}`} role="row">
          <div className={styles.cell} role="columnheader">
            Features
          </div>
          <div className={styles.cell} role="columnheader">
            Free
          </div>
          <div className={styles.cell} role="columnheader">
            Professional
          </div>
          <div className={styles.cell} role="columnheader">
            Enterprise
          </div>
        </div>

        {features.map(feature => (
          <div className={styles.row} role="row" key={feature.label}>
            <div className={`${styles.cell} ${styles.feature}`} role="rowheader">
              {feature.label}
            </div>
            <div className={styles.cell} role="cell" data-label="Free">
              {renderIndicator(feature.free)}
            </div>
            <div className={styles.cell} role="cell" data-label="Professional">
              {renderIndicator(feature.professional)}
            </div>
            <div className={styles.cell} role="cell" data-label="Enterprise">
              {renderIndicator(feature.enterprise)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureComparison;


