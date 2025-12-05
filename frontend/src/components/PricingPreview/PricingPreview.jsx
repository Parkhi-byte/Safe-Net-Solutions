import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PricingPreview.module.css';

const PricingPreview = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const features = [
    '14-day free trial',
    'All core security modules',
    'Up to 10 team members',
    '24/7 email support',
    'No credit card required',
    'Cancel anytime'
  ];

  return (
    <section className={styles.pricingPreview} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Start Your Free Trial Today</h2>
          <p className={styles.subtitle}>
            Experience enterprise-grade security without the enterprise price tag
          </p>
        </div>

        <div className={styles.pricingCard}>
          <div className={styles.cardHeader}>
            <div className={styles.badge}>Most Popular</div>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>0</span>
              <span className={styles.period}>/month</span>
            </div>
            <h3 className={styles.planName}>Free Trial</h3>
            <p className={styles.planDescription}>
              Full access to all features for 14 days. No commitment, no credit card required.
            </p>
          </div>

          <div className={styles.featuresList}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span className={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>

          <div className={styles.cardFooter}>
            <Link
              to="/signup"
              className={`${styles.ctaButton} ${isLoading ? styles.loading : ''}`}
              onClick={handleSignup}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Starting...
                </>
              ) : (
                'Start Free Trial'
              )}
            </Link>
            <p className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>🛡️</span>
              30-day money-back guarantee
            </p>
          </div>
        </div>

        <div className={styles.trustNote}>
          <p>
            <strong>After your trial:</strong> Choose from flexible monthly or annual plans starting at $29/month.
            Pay only for the modules you need.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;

