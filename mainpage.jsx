import React from 'react';
import './MainPage.css';
import UploadModal from './UploadModal';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="overlay">
        <div className="content">
          <h1>📁 Upload Your Memories</h1>
          <p>Store your photos, videos, and files in one place — safely and easily.</p>
          <UploadModal />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
