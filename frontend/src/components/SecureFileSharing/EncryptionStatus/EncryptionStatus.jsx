import React from 'react';
import styles from './EncryptionStatus.module.css';

const EncryptionStatus = () => {
  const badges = [
    { label: 'E2E Encrypted', value: 'Active', status: 'ok' },
    { label: 'Key Rotation', value: 'Every 24h', status: 'ok' },
    { label: 'Zero-knowledge', value: 'Verified', status: 'ok' },
    { label: 'Watermarking', value: 'Adaptive', status: 'warn' },
  ];

  return (
    <section className={styles.card}>
      <h3>Encryption status</h3>
      <p>Multi-layer security across data, keys, and sessions.</p>
      <div className={styles.badges}>
        {badges.map((badge) => (
          <article key={badge.label}>
            <span className={`${styles.dot} ${styles[badge.status]}`} />
            <div>
              <strong>{badge.label}</strong>
              <p>{badge.value}</p>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.footer}>
        <p>Key management</p>
        <strong>HSM-backed · FIPS 140-2 Level 3</strong>
      </div>
    </section>
  );
};

export default EncryptionStatus;

