import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import connect from '../containers/connect';

const Container = styled.div`
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
  return isEdit ? (
    <>
      <InputContainer
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
      />
      <input
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
      />
    </>
  ) : (
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
          {taskContent}
          {taskContent}
          {/* 수정 삭제 버튼 */}
          <input type="button" value="수정" onClick={() => setIsEdit(true)} />
          <input
            type="button"
            value="삭제"
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
          />
        </Container>
      )}
    </Draggable>
  );
}

export default connect(Task);
