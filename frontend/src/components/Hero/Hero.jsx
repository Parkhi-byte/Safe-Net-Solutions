import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleTrialClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleDemoClick = () => {
    // Demo video functionality
    console.log('Opening demo video...');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🔒</span>
            <span>Trusted by 500+ SMEs</span>
          </div>
          
          <h1 className={styles.headline}>
            Enterprise Cybersecurity for{' '}
            <span className={styles.highlight}>Growing Businesses</span>
          </h1>
          
          <p className={styles.subheadline}>
            Affordable, modular protection for startups and SMEs without the technical complexity.
            Get enterprise-grade security that scales with your business.
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>⚡</span>
              <span>Plug-and-play</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>💰</span>
              <span>Affordable</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📈</span>
              <span>Scalable</span>
            </div>
          </div>

          <div className={styles.ctaGroup}>
            <Link
              to="/signup"
              className={`${styles.ctaPrimary} ${isLoading ? styles.loading : ''}`}
              onClick={handleTrialClick}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Starting...
                </>
              ) : (
                <>
                  <span>Start Free Trial</span>
                  <span className={styles.arrow}>→</span>
                </>
              )}
            </Link>
            
            <button
              className={styles.ctaSecondary}
              onClick={handleDemoClick}
            >
              <span className={styles.playIcon}>▶</span>
              Watch Demo
            </button>
          </div>

          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>14-day</span>
              <span className={styles.trustLabel}>Free Trial</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>No CC</span>
              <span className={styles.trustLabel}>Required</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustNumber}>24/7</span>
              <span className={styles.trustLabel}>Support</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.shieldContainer}>
            <div className={styles.shield}>
              <div className={styles.shieldInner}>
                <div className={styles.shieldIcon}>🛡️</div>
                <div className={styles.shieldRings}>
                  <div className={styles.ring}></div>
                  <div className={styles.ring}></div>
                  <div className={styles.ring}></div>
                </div>
              </div>
            </div>
            <div className={styles.floatingElements}>
              <div className={styles.floatingElement}>🔐</div>
              <div className={styles.floatingElement}>🔒</div>
              <div className={styles.floatingElement}>🔑</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
};

export default Hero;

