import React from 'react';
import './Page.scss';

const Page = ({ children, title }) => (
  <div className="page">
    <h1 className="page__title" data-testid="page__title">{title}</h1>
    <div>{children}</div>
  </div>
);

export default Page;
