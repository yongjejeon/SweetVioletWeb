import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ title, navItems }) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <nav className="nav-links">
        {navItems.map((item, index) => (
          <Link key={index} to={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
