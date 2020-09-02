import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Menu from './Menu';
import connect from '../containers/connect';
import { MdDelete } from 'react-icons/md';

import BoardContents from './BoardContents';

function Board({ BOARDS_DATA, setBOARDS_DATA }) {
  const params = useParams();
  const [selectedBoard] = BOARDS_DATA.filter(
    (board) => board.id === params.board_id,
  );

  return (
    <>
      <Menu />
      <div>
        <BoardContents />
      </div>
    </>
  );
}

export default connect(Board);
