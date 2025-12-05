import React from 'react';
import ModulePageLayout from '../components/ModulePageLayout/ModulePageLayout';
import ChatLayout from '../components/SecureChat/ChatLayout/ChatLayout';

const SecureChatPage = () => (
  <ModulePageLayout
    tag="Secure Chat"
    title="Encrypted conversations without compromise"
    subtitle="End-to-end secure messaging for your team. Communicate sensitive information without worrying about interception or data breaches."
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


