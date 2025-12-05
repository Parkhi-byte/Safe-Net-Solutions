import React from 'react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Sign Up in 60 Seconds',
      description: 'Create your account with just your email. No credit card required, no lengthy forms. Get started instantly and secure your business today.',
      icon: '✍️'
    },
    {
      number: '02',
      title: 'Choose Your Modules',
      description: 'Select the security features you need. Mix and match modules to create a custom security package that fits your business perfectly.',
      icon: '🧩'
    },
    {
      number: '03',
      title: 'Stay Protected',
      description: 'Your security is now active. Monitor threats, manage access, and scale your protection as your business grows. We handle the complexity.',
      icon: '🛡️'
    }
  ];

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            Get enterprise-grade security up and running in minutes, not months
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.connectorLine}></div>
                  <div className={styles.connectorArrow}>↓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Ready to get started?</p>
          <a href="#pricing" className={styles.ctaButton}>
            View Pricing Plans
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

