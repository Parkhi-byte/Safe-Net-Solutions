import React from 'react';
import ModulePageLayout from '../components/ModulePageLayout/ModulePageLayout';
import ChatLayout from '../components/SecureChat/ChatLayout/ChatLayout';

const SecureChatPage = () => (
  <ModulePageLayout
    tag="Secure Chat"
    title="Encrypted conversations without compromise"
    subtitle="Protect sensitive collaboration with end-to-end encrypted messaging, watermarking, and configurable data retention."
    highlights={[
      'Zero-trust messaging',
      'Per-thread encryption keys',
      'Ephemeral delivery receipts',
    ]}
  >
    <ChatLayout />
  </ModulePageLayout>
);

export default SecureChatPage;


