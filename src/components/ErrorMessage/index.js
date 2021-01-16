import React from 'react';
import './ErrorMessage.scss';

const ErrorMessage = ({ error }) => (
  <span className="error-message">{error}</span>
);

export default ErrorMessage;
