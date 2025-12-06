import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { PasswordProvider } from './contexts/PasswordContext';
import { ChatProvider } from './contexts/ChatContext';
import { FileProvider } from './contexts/FileContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import HowItWorks from './components/HowItWorks/HowItWorks';
import SocialProof from './components/SocialProof/SocialProof';
import PricingPreview from './components/PricingPreview/PricingPreview';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import AboutUs from './pages/AboutUs';
import PricingPage from './pages/PricingPage';
import PasswordManagerPage from './pages/PasswordManagerPage';
import SecureChatPage from './pages/SecureChatPage';
import FileSharingPage from './pages/FileSharingPage';
import VulnerabilityScannerPage from './pages/VulnerabilityScannerPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <PricingPreview />
      <FAQ />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PasswordProvider>
        <ChatProvider>
          <FileProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Header />
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/features" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <DashboardPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/password-manager"
                      element={
                        <PrivateRoute>
                          <PasswordManagerPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/secure-chat"
                      element={
                        <PrivateRoute>
                          <SecureChatPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/file-sharing"
                      element={
                        <PrivateRoute>
                          <FileSharingPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/vulnerability-scanner"
                      element={
                        <PrivateRoute>
                          <VulnerabilityScannerPage />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </ErrorBoundary>
                <Footer />
              </div>
            </Router>
          </FileProvider>
        </ChatProvider>
      </PasswordProvider>
    </AuthProvider>
  );
}

export default App;

