import React, { useState } from 'react';
import { useFileContext } from '../../contexts/FileContext';
import FileManagerLayout from './FileManagerLayout/FileManagerLayout';
import FilePreview from './FilePreview/FilePreview';
import ShareDialog from './ShareDialog/ShareDialog';
import ModulePageLayout from '../ModulePageLayout/ModulePageLayout';

const SecureFileSharingPage = () => {
  const { files } = useFileContext();
  const [previewFile, setPreviewFile] = useState(null);
  const [shareTarget, setShareTarget] = useState(null);
  const [focusAccessFile, setFocusAccessFile] = useState(null);

  const resolveFile = (target) =>
    typeof target === 'string' ? files.find((file) => (file._id || file.id) === target) : target;

  const handlePreview = (file) => setPreviewFile(file);
  const handleShare = (target) => {
    const file = resolveFile(target);
    if (file) setShareTarget(file);
  };
  const handleAccess = (target) => {
    const file = resolveFile(target);
    if (file) setFocusAccessFile(file);
  };

  return (
    <ModulePageLayout
      tag="Secure File Sharing"
      title="Zero-trust file operations for hybrid teams"
      subtitle="Protected document transfer with access controls and expiration dates. Share confidential files with confidence and track access."
      highlights={['Drag & drop uploads', 'End-to-end encryption badges', 'Real-time access monitoring']}
    >
      <FileManagerLayout
        onPreviewFile={handlePreview}
        onShareFile={handleShare}
        onOpenAccess={handleAccess}
        focusAccessFile={focusAccessFile}
        onClearAccessFocus={() => setFocusAccessFile(null)}
      />

      {previewFile && (
        <FilePreview
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          onShare={handleShare}
        />
      )}

      {shareTarget && (
        <ShareDialog file={shareTarget} onClose={() => setShareTarget(null)} />
      )}
    </ModulePageLayout>
  );
};

export default SecureFileSharingPage;

