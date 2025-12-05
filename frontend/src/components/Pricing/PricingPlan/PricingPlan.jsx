import React from 'react';
import styles from './PricingPlan.module.css';

const PricingPlan = ({ plan }) => {
  return (
    <div className={`${styles.card} ${plan.popular ? styles.popular : ''}`}>
      {plan.popular && <span className={styles.ribbon}>Most Popular</span>}
      <div className={styles.header}>
        <h3>{plan.name}</h3>
        <p>{plan.subtitle}</p>
      </div>
      <div className={styles.priceRow}>
        <div className={styles.price}>
          <span>{plan.price}</span>
          <small>/month</small>
        </div>
        {plan.discount && <span className={styles.discount}>{plan.discount}</span>}
      </div>
      <ul className={styles.featureList}>
        {plan.features.map(feature => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button type="button" className={styles.cta}>
        {plan.cta}
      </button>
      {plan.note && <p className={styles.note}>{plan.note}</p>}
    </div>
  );
};

export default PricingPlan;


