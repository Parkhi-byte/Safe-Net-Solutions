import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModulePageLayout.module.css';

const ModulePageLayout = ({
  tag,
  title,
  subtitle,
  highlights = [],
  children,
  actions,
}) => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link to="/" className={styles.backLink}>
            ← Back to home
          </Link>
          {tag && <p className={styles.tag}>{tag}</p>}
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {highlights.length > 0 && (
            <ul className={styles.highlightList}>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </section>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default ModulePageLayout;


