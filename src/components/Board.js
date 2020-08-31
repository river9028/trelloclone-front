import React from 'react';
import { useParams } from 'react-router-dom';

import Menu from './Menu';
import connect from '../containers/connect';

import BoardContents from './BoardContents';

function Board({ BOARDS_DATA }) {
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

export default connect(Board);
