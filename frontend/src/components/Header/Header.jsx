import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>🛡️</span>
          <span className={styles.logoText}>SafeNet Solutions</span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          {[
            { to: '/', label: 'Home', exact: true },
            { to: '/features', label: 'Features' },
            { to: '/pricing', label: 'Pricing' },
            { to: '/secure-chat', label: 'Secure Chat' },
            { to: '/login', label: 'Login' }
          ].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/signup"
            className={`${styles.navLink} ${styles.ctaButton}`}
            onClick={closeMenu}
          >
            Get Started Free
          </Link>
        </nav>

        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;

