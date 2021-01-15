import React from 'react';
import './TextSection.scss';

const TextSection = ({ title, text }) => (
  <div className="text-section">
    <h3 className="text-section__title">{title}</h3>
    <p className="text-section__text">{text}</p>
  </div>
);

export default TextSection;
