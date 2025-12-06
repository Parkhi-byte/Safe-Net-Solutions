import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  // Close menu if location changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            SafeNet<span className="text-primary">Solutions</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { to: '/', label: 'Home' },
            { to: '/features', label: 'Features' },
            { to: '/about', label: 'About Us' },
            { to: '/pricing', label: 'Pricing' },
            { to: '/secure-chat', label: 'Secure Chat' },
            ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
          ].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary font-semibold' : 'text-gray-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="flex items-center gap-4 ml-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                  <User className="w-4 h-4 text-primary" />
                  <span>{user?.name?.split(' ')[0] || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary font-semibold' : 'text-gray-600'
                    }`
                  }
                >
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 top-[70px] bg-white z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col p-6 gap-4">
          {[
            { to: '/', label: 'Home' },
            { to: '/features', label: 'Features' },
            { to: '/about', label: 'About Us' },
            { to: '/pricing', label: 'Pricing' },
            { to: '/secure-chat', label: 'Secure Chat' },
            ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
          ].map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-lg font-medium py-3 border-b border-gray-100 ${isActive ? 'text-primary' : 'text-gray-600'
                }`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{user?.name}</span>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 text-red-600 font-medium bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-lg font-medium py-3 border-b border-gray-100 text-gray-600"
                onClick={closeMenu}
              >
                Login
              </NavLink>
              <Link
                to="/register"
                className="mt-4 w-full py-3 bg-primary text-white text-center font-medium rounded-lg hover:bg-primary-dark transition-colors"
                onClick={closeMenu}
              >
                Get Started Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

