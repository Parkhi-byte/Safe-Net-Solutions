import React from 'react';
import styles from './SocialProof.module.css';

const SocialProof = () => {
  const testimonials = [
    {
      quote: 'SafeNet Solutions helped us secure retail operations across Mumbai within days. The India-ready templates saved weeks of implementation.',
      author: 'Parkhi',
      role: 'Security Operations Lead, Mumbai, India',
      avatar: '🛡️'
    },
    {
      quote: 'We monitor policy rollouts for our Lucknow data center directly from SafeNet. The visibility and automation are unmatched.',
      author: 'Satyam Katiyar',
      role: 'Infrastructure Manager, Lucknow, India',
      avatar: '🧠'
    },
    {
      quote: 'Our fintech audits in Bengaluru are smoother because every session is encrypted end-to-end with detailed logs.',
      author: 'Prachi Gangwar',
      role: 'Compliance Lead, Bengaluru, India',
      avatar: '💼'
    },
    {
      quote: 'The platform keeps our distributed SOC in Kanpur collaborating securely, even during peak incident loads.',
      author: 'Sneha Gangwar',
      role: 'SOC Manager, Kanpur, India',
      avatar: '👩‍💻'
    },
    {
      quote: 'Rolling out secure chat for executives in Noida was effortless. SafeNet has become our central communication layer.',
      author: 'Shardul Saxena',
      role: 'CISO, Noida, India',
      avatar: '👨‍💼'
    }
  ];

  const certifications = [
    { name: 'SOC 2', icon: '🏆' },
    { name: 'ISO 27001', icon: '✅' },
    { name: 'GDPR', icon: '🔒' },
    { name: 'HIPAA', icon: '⚕️' }
  ];

  return (
    <section className={styles.socialProof}>
      <div className={styles.container}>
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>70%</div>
            <div className={styles.statLabel}>of cyber attacks target SMEs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>$200K+</div>
            <div className={styles.statLabel}>average cost of a data breach</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>businesses protected</div>
          </div>
        </div>

        <div className={styles.testimonialsSection}>
          <h2 className={styles.sectionTitle}>Trusted by Growing Businesses</h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <div className={styles.author}>
                  <span className={styles.avatar}>{testimonial.avatar}</span>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{testimonial.author}</div>
                    <div className={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.certificationsSection}>
          <h3 className={styles.certTitle}>Compliance & Certifications</h3>
          <div className={styles.certifications}>
            {certifications.map((cert, index) => (
              <div key={index} className={styles.certBadge}>
                <span className={styles.certIcon}>{cert.icon}</span>
                <span className={styles.certName}>{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

