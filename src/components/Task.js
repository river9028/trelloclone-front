import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import connect from '../containers/connect';

const Container = styled.div`
  whitespace: 'normal';
  wordbreak: 'normal';
  font-size: 16px;
  border: 3px solid lightgrey;
  // border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? 'lightgreen'
      : 'white'};
  // width: 40px;
  // height: 40px;

  // display: flex;
  // justify-content: center;
  // align-items: center;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

const InputContainer = styled.input`
  font-size: 16px;
  border: 3px solid lightgrey;
  // border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
      ? 'lightgreen'
      : 'white'};
  // width: 40px;
  // height: 40px;

  // display: flex;
  // justify-content: center;
  // align-items: center;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

function Task({ task, index, column, BOARD_CONTENTS, setBOARD_CONTENTS }) {
  const [isEdit, setIsEdit] = useState(false);
  const [taskContent, setTaskContent] = useState(task.content);

  // const isDragDisabled = this.props.task.id === 'task-1';
  return (
    <Draggable
      // key={this.props.task.id}
      draggableId={task.id}
      index={index}
      isDragDisabled={null}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={null}
        >
          {/* <Handle {...provided.dragHandleProps} /> */}
          {isEdit ? (
            <>
              <InputContainer
                autoFocus
                type="text"
                value={taskContent}
                onBlur={() => setIsEdit(false)}
                onChange={(e) => setTaskContent(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const newTasks = {
                      ...BOARD_CONTENTS.tasks,
                      [task.id]: { id: task.id, content: taskContent },
                    };

                    setBOARD_CONTENTS({
                      ...BOARD_CONTENTS,
                      tasks: newTasks,
                    });
                    setIsEdit(false);
                  }
                }}
              />
              {/* <input
        type="button"
        value="수정완료"
        onClick={() => {
          const newTasks = {
            ...BOARD_CONTENTS.tasks,
            [task.id]: { id: task.id, content: taskContent },
          };

          setBOARD_CONTENTS({
            ...BOARD_CONTENTS,
            tasks: newTasks,
          });
          setIsEdit(false);
        }}
      /> */}
            </>
          ) : (
            taskContent
          )}
          <div
            style={{
              position: 'relative',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <IconButton onClick={() => setIsEdit(true)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  const newTasks = {
                    ...BOARD_CONTENTS.tasks,
                  };
                  delete newTasks[task.id];

                  const newColumns = {
                    ...BOARD_CONTENTS.columns,
                    [column.id]: {
                      ...BOARD_CONTENTS.columns[column.id],
                      taskIds: BOARD_CONTENTS.columns[column.id].taskIds.filter(
                        (taskId) => taskId !== task.id,
                      ),
                    },
                  };
                  setBOARD_CONTENTS({
                    ...BOARD_CONTENTS,
                    tasks: newTasks,
                    columns: newColumns,
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}

export default connect(Task);
