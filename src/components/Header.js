import React from 'react';

import { Link } from 'react-router-dom';

const Header = ({ title, navItems }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        {navItems.map((item, index) => (
          <Link key={index} to={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
