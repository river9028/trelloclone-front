import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Menu from './Menu';
import connect from '../containers/connect';
import { MdDelete } from 'react-icons/md';

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

const RemoveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const TitleContainer = styled.h2`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${RemoveContainer} {
      opacity: 1;
    }
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

  const aceessNewPage = (route = '') => {
    history.push(`/boards/${route}`);
  };

  return (
    <>
      <Menu />
      <TitleContainer
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
        <RemoveContainer
          onClick={() => {
            if (window.confirm('삭제하시겠습니까?')) {
              const newBOARDS_DATA = BOARDS_DATA.filter(
                (board) => board.id !== params.board_id,
              );
              setBOARDS_DATA(newBOARDS_DATA);
              aceessNewPage();
            }
          }}
        >
          <MdDelete />
        </RemoveContainer>
      </TitleContainer>
      <div>
        <BoardContents />
      </div>
    </>
  );
}

export default connect(Board);
