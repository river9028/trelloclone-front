import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Menu from './Menu';
import connect from '../containers/connect';

import BoardContents from './BoardContents';

const InputContainer = styled.input`
  font-size: 16px;
  border: 3px solid lightgrey;
  // border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: &:focus {
    outline: none;
    border-color: red;
  }
`;

function Board({ BOARDS_DATA, setBOARDS_DATA }) {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const params = useParams();
  const history = useHistory();
  const [selectedBoard] = BOARDS_DATA.filter(
    (board) => board.id === params.board_id,
  );

  const aceessNewPage = (route) => {
    history.push(`/boards/${route}`);
  };

  return (
    <>
      <Menu />
      <h2
        onDoubleClick={() => {
          setIsTitleEditing(true);
        }}
      >
        {!isTitleEditing ? (
          selectedBoard.title
        ) : (
          <>
            <InputContainer
              value={newBoardTitle}
              onChange={(e) => {
                setNewBoardTitle(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const regex = / /gi;
                  const newBoardTitleId = newBoardTitle
                    .toLocaleLowerCase()
                    .replace(regex, '-');
                  const newBOARDS_DATA = BOARDS_DATA.map((board) => {
                    if (board.id === params.board_id) {
                      return {
                        id: newBoardTitleId,
                        title: newBoardTitle,
                      };
                    }
                    return board;
                  });
                  setBOARDS_DATA(newBOARDS_DATA);
                  setIsTitleEditing(false);
                  aceessNewPage(newBoardTitleId);
                }
              }}
            />
          </>
        )}
      </h2>
      <div>
        <BoardContents />
      </div>
    </>
  );
}

export default connect(Board);
