import React, { useState } from 'react';
import styles from './PricingFAQ.module.css';

const PricingFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p>Pricing FAQ</p>
          <h3>Everything you need to know</h3>
        </div>
        <a href="mailto:security@safenet.in" className={styles.contact}>
          Contact support →
        </a>
      </div>

      <div className={styles.list}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={`${styles.item} ${isOpen ? styles.open : ''}`} key={faq.question}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className={styles.answer}>{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingFAQ;


