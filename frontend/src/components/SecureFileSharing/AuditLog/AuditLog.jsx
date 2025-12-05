import React from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import { formatDate } from '../../../utils/fileUtils';
import styles from './AuditLog.module.css';

const AuditLog = () => {
  const { auditLog } = useFileContext();

  const exportAudit = () => {
    const csv = ['action,target,user,timestamp,status'];
    auditLog.forEach((entry) => {
      csv.push(
        [entry.action, entry.target, entry.user, entry.timestamp, entry.status]
          .map((value) => `"${value}"`)
          .join(',')
      );
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'audit-log.csv';
    link.click();
  };

  return (
    <section className={styles.card}>
      <header>
        <div>
          <h3>Audit log</h3>
          <p>Track every access operation with immutable trails.</p>
        </div>
        <button type="button" onClick={exportAudit}>
          Export
        </button>
      </header>
      <ul>
        {auditLog.slice(0, 6).map((entry) => (
          <li key={entry.id}>
            <div>
              <strong>{entry.action}</strong>
              <p>{entry.target}</p>
            </div>
            <div className={styles.meta}>
              <span>{entry.user}</span>
              <small>{formatDate(entry.timestamp)}</small>
              <span className={styles.status}>{entry.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AuditLog;

