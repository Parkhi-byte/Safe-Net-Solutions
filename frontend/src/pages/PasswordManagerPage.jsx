import React from 'react';
import ModulePageLayout from '../components/ModulePageLayout/ModulePageLayout';
import PasswordVault from '../components/PasswordManager/PasswordVault/PasswordVault';

const PasswordManagerPage = () => (
  <ModulePageLayout
    tag="Password Manager"
    title="Centralized credential intelligence"
    subtitle="Secure credential storage with enterprise-grade encryption. Never lose access to critical accounts with our centralized password vault."
    highlights={[
      'Adaptive password policies',
      'Real-time breach alerts',
      'Role-based vaults',
    ]}
  >
    <PasswordVault />
  </ModulePageLayout>
);

export default PasswordManagerPage;


