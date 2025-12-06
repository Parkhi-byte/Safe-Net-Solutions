import React, { useMemo } from 'react';
import { useFileContext } from '../../../contexts/FileContext';
import { formatDate } from '../../../utils/fileUtils';
import styles from './AccessControls.module.css';

const AccessControls = ({ focusFile, onClearFocus }) => {
  const { files, revokeShareLink, activeSessions, auditLog } = useFileContext();
  const sharedFiles = useMemo(() => {
    const list = files.filter((file) => file.shareLinks?.length);
    if (focusFile && focusFile.shareLinks?.length) {
      return [focusFile, ...list.filter((file) => file._id !== focusFile._id)];
    }
    return list;
  }, [files, focusFile]);
  const permissionHistory = useMemo(
    () => auditLog.filter((log) => log.action.includes('permission')).slice(0, 4),
    [auditLog]
  );

  return (
    <section className={styles.card}>
      <header>
        <div>
          <h3>Access controls</h3>
          <p>Revoke or manage shared links instantly.</p>
        </div>
      </header>
      {focusFile && (
        <div className={styles.focus}>
          <div>
            <p>Managing access for</p>
            <strong>{focusFile.name}</strong>
          </div>
          <button type="button" onClick={onClearFocus}>
            Clear
          </button>
        </div>
      )}
      {sharedFiles.length === 0 ? (
        <p className={styles.empty}>No active share links.</p>
      ) : (
        <div className={styles.table}>
          {sharedFiles.slice(0, 3).map((file) =>
            file.shareLinks.map((link) => (
              <article key={link._id}>
                <div>
                  <strong>{file.name}</strong>
                  <p>Expires {formatDate(link.expires)}</p>
                </div>
                <div>
                  <span className={styles.pill}>
                    {link.passwordProtected ? 'Password protected' : 'Open link'}
                  </span>
                  <span className={styles.pill}>
                    {link.remainingDownloads}/{link.downloadLimit} downloads
                  </span>
                </div>
                <button type="button" onClick={() => revokeShareLink(file._id, link._id)}>
                  Revoke
                </button>
              </article>
            ))
          )}
        </div>
      )}

      <div className={styles.sessions}>
        <h4>Active sessions</h4>
        <ul>
          {activeSessions.map((session) => (
            <li key={session.id}>
              <div>
                <strong>{session.user}</strong>
                <p>
                  {session.device} · {session.location}
                </p>
              </div>
              <span>{session.lastActive}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.history}>
        <h4>Permission history</h4>
        <ul>
          {permissionHistory.length === 0 && <li>No permission updates yet.</li>}
          {permissionHistory.map((entry) => (
            <li key={entry.id}>
              <span>{formatDate(entry.timestamp)}</span>
              <p>{entry.user} · {entry.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AccessControls;

