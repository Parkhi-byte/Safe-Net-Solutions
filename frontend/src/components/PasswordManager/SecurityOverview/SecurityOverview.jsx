import React from 'react';
import { usePassword } from '../../../contexts/PasswordContext';
import { Link } from 'react-router-dom';
import styles from './SecurityOverview.module.css';

const SecurityOverview = () => {
  const { getSecurityStats } = usePassword();
  const stats = getSecurityStats();

  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50';
    if (score >= 60) return '#ff9800';
    return '#f44336';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className={styles.overview}>
      <div className={styles.header}>
        <h2 className={styles.title}>Security Overview</h2>
        <Link to="/password-manager" className={styles.viewAll}>
          View All →
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🔐</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalCount}</div>
            <div className={styles.statLabel}>Total Passwords</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${stats.weakCount > 0 ? styles.warning : ''}`}>
          <div className={styles.statIcon}>⚠️</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.weakCount}</div>
            <div className={styles.statLabel}>Weak Passwords</div>
          </div>
          {stats.weakCount > 0 && (
            <div className={styles.alertBadge}>!</div>
          )}
        </div>

        <div className={`${styles.statCard} ${stats.reusedCount > 0 ? styles.warning : ''}`}>
          <div className={styles.statIcon}>🔄</div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.reusedCount}</div>
            <div className={styles.statLabel}>Reused Passwords</div>
          </div>
          {stats.reusedCount > 0 && (
            <div className={styles.alertBadge}>!</div>
          )}
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🛡️</div>
          <div className={styles.statContent}>
            <div 
              className={styles.statValue}
              style={{ color: getScoreColor(stats.securityScore) }}
            >
              {stats.securityScore}
            </div>
            <div className={styles.statLabel}>
              Security Score
              <span className={styles.scoreLabel}>
                ({getScoreLabel(stats.securityScore)})
              </span>
            </div>
          </div>
        </div>
      </div>

      {(stats.weakCount > 0 || stats.reusedCount > 0) && (
        <div className={styles.alerts}>
          {stats.weakCount > 0 && (
            <div className={styles.alert}>
              <span className={styles.alertIcon}>⚠️</span>
              <div className={styles.alertContent}>
                <strong>Weak Passwords Detected</strong>
                <p>You have {stats.weakCount} password{stats.weakCount !== 1 ? 's' : ''} that need strengthening.</p>
              </div>
            </div>
          )}
          {stats.reusedCount > 0 && (
            <div className={styles.alert}>
              <span className={styles.alertIcon}>🔄</span>
              <div className={styles.alertContent}>
                <strong>Reused Passwords Warning</strong>
                <p>You're using the same password for {stats.reusedCount} account{stats.reusedCount !== 1 ? 's' : ''}. Consider using unique passwords.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {stats.totalCount === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔒</div>
          <h3 className={styles.emptyTitle}>No Passwords Yet</h3>
          <p className={styles.emptyText}>
            Start securing your accounts by adding your first password.
          </p>
          <Link to="/password-manager" className={styles.emptyButton}>
            Add Your First Password
          </Link>
        </div>
      )}
    </div>
  );
};

export default SecurityOverview;

