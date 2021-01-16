import React from 'react';
import './TextSection.scss';

const TextSection = ({ title, text, datatest }) => (
  <div className="text-section">
    <h3 className="text-section__title" data-testid={`title-${datatest}`}>
      {title}
    </h3>
    <p className="text-section__text" data-testid={`text-${datatest}`}>
      {text}
    </p>
  </div>
);

export default TextSection;
