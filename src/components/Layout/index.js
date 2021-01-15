import React from 'react';

import './Layout.scss';

const Layout = ({ children, ...rest }) => (
  <div className="layout">{children}</div>
);
export default Layout;
