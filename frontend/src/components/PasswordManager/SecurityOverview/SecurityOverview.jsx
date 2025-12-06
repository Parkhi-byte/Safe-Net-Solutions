import React from 'react';
import { usePassword } from '../../../contexts/PasswordContext';
import { Link } from 'react-router-dom';
import styles from './SecurityOverview.module.css';
import { Lock, AlertTriangle, RefreshCw, ShieldCheck, ArrowRight, ShieldAlert } from 'lucide-react';

const SecurityOverview = () => {
  const { getSecurityStats } = usePassword();
  const stats = getSecurityStats();

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 60) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
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
        {/* Only show View All link if we are NOT on the password manager page already.
            Assuming SecurityOverview might be used on Dashboard too.
            If used inside PasswordVault which is on /password-manager, this link is redundant but harmless.
        */}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Lock className="w-6 h-6 text-blue-500" />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalCount}</div>
            <div className={styles.statLabel}>Total Passwords</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${stats.weakCount > 0 ? styles.warning : ''}`}>
          <div className={`${styles.statIcon} ${stats.weakCount > 0 ? 'bg-orange-100' : ''}`}>
            <AlertTriangle className={`w-6 h-6 ${stats.weakCount > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.weakCount}</div>
            <div className={styles.statLabel}>Weak Passwords</div>
          </div>
          {stats.weakCount > 0 && (
            <div className={styles.alertBadge}>!</div>
          )}
        </div>

        <div className={`${styles.statCard} ${stats.reusedCount > 0 ? styles.warning : ''}`}>
          <div className={`${styles.statIcon} ${stats.reusedCount > 0 ? 'bg-orange-100' : ''}`}>
            <RefreshCw className={`w-6 h-6 ${stats.reusedCount > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.reusedCount}</div>
            <div className={styles.statLabel}>Reused Passwords</div>
          </div>
          {stats.reusedCount > 0 && (
            <div className={styles.alertBadge}>!</div>
          )}
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>
          <div className={styles.statContent}>
            <div
              className={styles.statValue}
              style={{ color: getScoreColor(stats.securityScore) }}
            >
              {stats.securityScore}
            </div>
            <div className={styles.statLabel}>
              Security Score
              <span className={styles.scoreLabel} style={{ color: getScoreColor(stats.securityScore) }}>
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
              <span className={styles.alertIcon}>
                <ShieldAlert className="w-5 h-5 text-red-500" />
              </span>
              <div className={styles.alertContent}>
                <strong>Weak Passwords Detected</strong>
                <p>You have {stats.weakCount} password{stats.weakCount !== 1 ? 's' : ''} that need strengthening.</p>
              </div>
            </div>
          )}
          {stats.reusedCount > 0 && (
            <div className={styles.alert}>
              <span className={styles.alertIcon}>
                <RefreshCw className="w-5 h-5 text-orange-500" />
              </span>
              <div className={styles.alertContent}>
                <strong>Reused Passwords Warning</strong>
                <p>You're using the same password for {stats.reusedCount} account{stats.reusedCount !== 1 ? 's' : ''}. Consider using unique passwords.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecurityOverview;

