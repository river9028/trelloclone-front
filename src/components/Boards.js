import React from 'react';
import { NavLink } from 'react-router-dom';

import Menu from './Menu';
import { BOARDS_DATA } from '../FAKE_DATA.json';

function Boards() {
  return (
    <>
      <Menu />
      <h2>Boards</h2>
      <ul>
        {BOARDS_DATA.map((board) => (
          <li key={board.id}>
            <NavLink to={`/boards/${board.id}`}>{board.title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Boards;
