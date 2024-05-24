
import React from 'react';
import './Modal.css';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
