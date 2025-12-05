import React, { useState } from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Is this suitable for non-technical teams?',
      answer: 'Absolutely! SafeNet Solutions is designed with simplicity in mind. Our plug-and-play modules require no technical expertise to set up or manage. You can have enterprise-grade security running in minutes, with an intuitive dashboard that anyone on your team can use. We also provide 24/7 support to help you every step of the way.'
    },
    {
      question: 'How does the modular pricing work?',
      answer: 'Our modular pricing means you only pay for the security features you need. Start with our free trial to explore all modules, then choose the ones that fit your business. Mix and match password management, encrypted chat, file sharing, and vulnerability scanning. Each module is priced separately, so you can build a custom security package that scales with your business without paying for features you don\'t use.'
    },
    {
      question: 'What security standards do you comply with?',
      answer: 'SafeNet Solutions is fully compliant with SOC 2 Type II, ISO 27001, GDPR, and HIPAA standards. We undergo regular third-party security audits and maintain industry-leading encryption standards. All data is encrypted at rest and in transit using AES-256 encryption, and we follow zero-trust security principles throughout our infrastructure.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time with no penalties or fees. There are no long-term contracts or commitments. If you cancel during your free trial, you won\'t be charged. If you cancel after the trial, you\'ll continue to have access until the end of your current billing period.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data remains accessible for 30 days after cancellation, giving you time to export or migrate your information. After 30 days, all data is permanently deleted in accordance with our privacy policy. We never retain customer data after cancellation, ensuring your information is completely removed from our systems.'
    },
    {
      question: 'Do you offer support for larger teams?',
      answer: 'Yes! We offer dedicated support plans for teams of 50+ members, including priority support, dedicated account managers, custom integrations, and advanced security features. Contact our sales team to discuss enterprise solutions tailored to your organization\'s needs.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know about SafeNet Solutions
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.icon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>Still have questions?</p>
          <a href="mailto:support@safenet-solutions.com" className={styles.ctaButton}>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

