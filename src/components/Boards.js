import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Menu from './Menu';
import connect from '../containers/connect';
import { BOARDS_DATA } from '../FAKE_DATA.json';

function Boards({ BOARDS_DATA, setBOARDS_DATA }) {
  const [isBoardEditing, setIsBoardEditing] = useState(false);
  const [isBoardAdding, setIsBoardAdding] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');

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
        <li>
          {!isBoardAdding ? (
            <input
              type="button"
              value="board 추가"
              onClick={() => {
                setIsBoardAdding(true);
              }}
            />
          ) : (
            <>
              <input
                value={newBoardTitle}
                placeholder="제목"
                onChange={(e) => setNewBoardTitle(e.target.value)}
              />
              <input
                value={newBoardDesc}
                placeholder="상세내용"
                onChange={(e) => setNewBoardDesc(e.target.value)}
              />
              <input
                type="button"
                value="추가완료"
                onClick={() => {
                  const regex = / /gi;
                  const newBoardTitleId = newBoardTitle
                    .toLocaleLowerCase()
                    .replace(regex, '-');
                  setBOARDS_DATA([
                    ...BOARDS_DATA,
                    {
                      id: newBoardTitleId,
                      title: newBoardTitle,
                      description: newBoardDesc,
                    },
                  ]);
                  setIsBoardAdding(false);
                  console.log(BOARDS_DATA);
                }}
              />
            </>
          )}
        </li>
      </ul>
    </>
  );
}
export default connect(Boards);
