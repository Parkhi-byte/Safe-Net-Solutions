import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Features.module.css';

const Features = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: '🔐',
      title: 'Password Manager',
      description: 'Secure credential storage with enterprise-grade encryption. Never lose access to critical accounts with our centralized password vault.',
      color: '#1a4d7a',
      link: '/password-manager'
    },
    {
      icon: '💬',
      title: 'Encrypted Chat',
      description: 'End-to-end secure messaging for your team. Communicate sensitive information without worrying about interception or data breaches.',
      color: '#00d4aa',
      link: '/secure-chat'
    },
    {
      icon: '📁',
      title: 'Safe File Sharing',
      description: 'Protected document transfer with access controls and expiration dates. Share confidential files with confidence and track access.',
      color: '#2d6ba3',
      link: '/file-sharing'
    },
    {
      icon: '🔍',
      title: 'Vulnerability Scanner',
      description: 'SQL injection detection and automated security scanning. Identify vulnerabilities before attackers do with our intelligent threat detection.',
      color: '#00b894',
      link: '/vulnerability-scanner'
    }
  ];

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Complete Security Suite</h2>
          <p className={styles.subtitle}>
            Everything you need to protect your business, all in one platform
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.card}
              style={{ '--accent-color': feature.color }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
                <div className={styles.iconGlow}></div>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.learnMore}
                  onClick={() => navigate(feature.link)}
                >
                  Learn More <span className={styles.arrow}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

