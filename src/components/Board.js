import React from 'react';
import { useParams } from 'react-router-dom';

import Menu from './Menu';
import { BOARDS_DATA } from '../FAKE_DATA.json';

import BoardContents from './BoardContents';

function Board() {
  const params = useParams();
  const [selectedBoard] = BOARDS_DATA.filter(
    (board) => board.id === params.board_id,
  );
  return (
    <>
      <Menu />
      <h2>{selectedBoard.title}</h2>
      {selectedBoard.description}
      <div>
        <BoardContents />
      </div>
    </>
  );
}

export default Board;
