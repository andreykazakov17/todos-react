import React from 'react';

import './Button.scss';

const Button = ({ className = '', children, onClick }) => (
  <button type="button" className={`action-btn ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
