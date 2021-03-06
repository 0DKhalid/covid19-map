import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default () => {
  const [shadow, setShadow] = useState('');
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setShadow('bg-shadow');
      } else {
        setShadow('');
      }
    });
  }, []);
  return (
    <nav className={`navbar ${shadow}`}>
      <ul>
        <li>
          <NavLink exact to={`${process.env.PUBLIC_URL}/`}>
            الخريطة
          </NavLink>
        </li>
        <li>
          <NavLink exact to={`${process.env.PUBLIC_URL}/global`}>
            حول العالم
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
