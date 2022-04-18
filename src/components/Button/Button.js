import React from 'react';

import "./Button.scss";

function Button({ className = "", children, onClick }) {
  return (
    <button type="button" className={`action-btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;