export const formatBytes = (bytes, decimals = 1) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const formatDate = (timestamp) => {
  if (!timestamp) return '—';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(timestamp));
};

export const getFileType = (filename, fallback = 'doc') => {
  if (!filename) return fallback;
  const ext = filename.includes('.') ? filename.split('.').pop().toLowerCase() : fallback;
  const mappings = {
    pdf: 'pdf',
    doc: 'doc',
    docx: 'doc',
    xls: 'sheet',
    xlsx: 'sheet',
    csv: 'sheet',
    png: 'image',
    jpg: 'image',
    jpeg: 'image',
    gif: 'image',
    svg: 'image',
    zip: 'archive',
    rar: 'archive',
    ppt: 'slides',
    pptx: 'slides',
    txt: 'text',
    json: 'code',
    js: 'code',
    jsx: 'code',
    ts: 'code',
    tsx: 'code',
  };
  return mappings[ext] || fallback;
};

export const getTypeColor = (type) => {
  const colorMap = {
    pdf: '#e74c3c',
    doc: '#3498db',
    sheet: '#27ae60',
    image: '#8e44ad',
    slides: '#f39c12',
    archive: '#d35400',
    text: '#2c3e50',
    code: '#16a085',
    video: '#9b59b6',
  };
  return colorMap[type] || '#7f8c8d';
};

export const generateId = (prefix = 'id') =>
  `${prefix}-${Math.random().toString(36).slice(2, 7)}${Date.now().toString(36)}`;

export const getBreadcrumbs = (folders, currentFolderId) => {
  const folderMap = folders.reduce((acc, folder) => {
    acc[folder.id] = folder;
    return acc;
  }, {});

  const breadcrumbs = [];
  let pointer = folderMap[currentFolderId];

  while (pointer) {
    breadcrumbs.unshift(pointer);
    pointer = pointer.parentId ? folderMap[pointer.parentId] : null;
  }

  return breadcrumbs;
};

