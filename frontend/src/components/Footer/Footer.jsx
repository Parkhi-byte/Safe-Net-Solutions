import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Linkedin, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react';

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
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'GitHub', icon: Github, url: 'https://github.com' }
  ];

  return (
    <footer className="bg-white text-slate-600 py-16 border-t border-slate-200 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group decoration-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SafeNet Solutions</span>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-xs text-sm">
              Enterprise-grade cybersecurity made simple for growing businesses. Secure your digital assets with confidence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-slate-100 hover:border-blue-100 text-slate-400"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6 tracking-wide text-sm uppercase">Product</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {quickLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-sm hover:text-blue-600 transition-colors flex items-center gap-1 group decoration-0">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6 tracking-wide text-sm uppercase">Company</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {quickLinks.slice(3).map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-sm hover:text-blue-600 transition-colors flex items-center gap-1 group decoration-0">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6 tracking-wide text-sm uppercase">Contact</h3>
            <ul className="space-y-4 list-none p-0 m-0">
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:hello@safenet-solutions.com" className="text-sm hover:text-blue-600 transition-colors mt-1 decoration-0">
                  hello@safenet-solutions.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+1-800-SAFENET" className="text-sm hover:text-blue-600 transition-colors mt-1 decoration-0">
                  +1 (800) SAFENET
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm mt-1">
                  123 Security Blvd, Suite 100<br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {legalLinks.map((link, index) => (
              <Link key={index} to={link.path} className="text-slate-500 hover:text-blue-600 transition-colors decoration-0">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="text-sm text-slate-400">
            <p>&copy; {currentYear} SafeNet Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

