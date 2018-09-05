import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            Create
          </Link>
        </li>
        <li>
          <Link to="/info">
            Cohort Manager
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
