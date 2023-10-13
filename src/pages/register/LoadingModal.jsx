// LoadingModal.js
import React from 'react';
import './LoadingModal.scss';

const LoadingModal = ({ show }) => {
  return show ? (
    <div className="loading-modal">
      <div className="loader"></div>
    </div>
  ) : null;
};

export default LoadingModal;
