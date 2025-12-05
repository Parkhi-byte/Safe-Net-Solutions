import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Security', path: '/security' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'GDPR', path: '/gdpr' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoIcon}>🛡️</span>
              <span className={styles.logoText}>SafeNet Solutions</span>
            </Link>
            <p className={styles.tagline}>
              Enterprise cybersecurity made simple for growing businesses.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Product</h3>
            <ul className={styles.linkList}>
              {quickLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <ul className={styles.linkList}>
              {quickLinks.slice(3).map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className={styles.footerLink}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Contact</h3>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}>📧</span>
                <a href="mailto:hello@safenet-solutions.com" className={styles.footerLink}>
                  hello@safenet-solutions.com
                </a>
              </li>
              <li>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+1-800-SAFENET" className={styles.footerLink}>
                  +1 (800) SAFENET
                </a>
              </li>
              <li>
                <span className={styles.contactIcon}>📍</span>
                <span className={styles.footerLink}>
                  123 Security Blvd, Suite 100<br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.legalLinks}>
            {legalLinks.map((link, index) => (
              <Link key={index} to={link.path} className={styles.legalLink}>
                {link.name}
              </Link>
            ))}
          </div>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} SafeNet Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

