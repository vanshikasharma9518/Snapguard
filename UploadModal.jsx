import React from 'react';
import './UploadModal.css';

const UploadModal = () => {
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const dataUrl = reader.result;
        const stored = JSON.parse(localStorage.getItem('media') || '{}');
        stored[type] = stored[type] || [];
        stored[type].push(dataUrl);
        localStorage.setItem('media', JSON.stringify(stored));
        window.location.href = `/media?type=${type}`;
      };

      reader.readAsDataURL(file);
    }
  };

  const options = [
    { type: 'photo', label: '📷 Upload Photo', accept: 'image/*' },
    { type: 'video', label: '🎥 Upload Video', accept: 'video/*' },
    { type: 'others', label: '📎 Upload File', accept: '*' },
  ];

  return (
    <div className="upload-modal-container">
      <div className="upload-modal">
        <h2 className="upload-title">Upload Your Media</h2>
        <div className="upload-options">
          {options.map(({ type, label, accept }) => (
            <label key={type} className="upload-btn">
              {label}
              <input
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, type)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
