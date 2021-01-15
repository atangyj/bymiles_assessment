import React from 'react';
import { Link } from 'react-router-dom';
import './Page.scss';

const Page = ({ children, title }) => (
  <div className="page">
    <h1 className="page__title">{title}</h1>
    <div>{children}</div>
  </div>
);

export default Page;
