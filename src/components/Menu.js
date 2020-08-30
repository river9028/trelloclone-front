import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <>
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">Settings</NavLink>
        </li>
      </ul>
    </>
  );
}

export default Menu;
