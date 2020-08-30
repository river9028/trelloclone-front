import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task from './Task';
import connect from '../containers/connect';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition = backgrond-color 0.2s ease;
    background-color: ${(props) =>
      props.isDraggingOver ? 'skyblue' : 'inherit'};
    flex-grow: 1;
    min-height: 100px;

    // display: flex;
`;

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

function Column({
  column,
  index,
  tasks,
  isDropDisabled,
  BOARD_CONTENTS,
  setBOARD_CONTENTS,
}) {
  const [isTaskEditing, setIsTaskEditing] = useState(false);
  const [isTaskAdding, setIsTaskAdding] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [columnTitle, setColumnTitle] = useState(column.title);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          {isTaskEditing ? (
            <>
              <InputContainer
                type="text"
                value={columnTitle}
                onChange={(e) => {
                  setColumnTitle(e.target.value);
                }}
              />
              <input
                type="button"
                value="수정완료"
                onClick={() => {
                  const newColumns = {
                    ...BOARD_CONTENTS.columns,
                    [column.id]: {
                      ...BOARD_CONTENTS.columns[column.id],
                      title: columnTitle,
                    },
                  };
                  setBOARD_CONTENTS({ ...BOARD_CONTENTS, columns: newColumns });
                  setIsTaskEditing(false);
                }}
              />
            </>
          ) : (
            <Title
              {...provided.dragHandleProps}
              onDoubleClick={() => {
                setIsTaskEditing(true);
              }}
            >
              {columnTitle}
              <input
                type="button"
                value="column 삭제"
                onClick={() => {
                  const newColumns = Object.assign(BOARD_CONTENTS.columns);
                  delete newColumns[column.id];

                  const newColumnsOrder = BOARD_CONTENTS.columnOrder.filter(
                    (columnId) => columnId !== column.id,
                  );
                  setBOARD_CONTENTS({
                    ...BOARD_CONTENTS,
                    columns: newColumns,
                    columnOrder: newColumnsOrder,
                  });
                }}
              />
            </Title>
          )}
          <Droppable
            // direction={"horizontal"}
            droppableId={column.id}
            type="task"
            // type={column.id === 'column-3' ? 'done' : 'active'}
            isDropDisabled={isDropDisabled}
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    column={column}
                  />
                ))}
                {provided.placeholder}
                {!isTaskAdding ? (
                  <input
                    type="button"
                    value="task 추가"
                    onClick={() => {
                      setIsTaskAdding(true);
                    }}
                  />
                ) : (
                  <>
                    <InputContainer
                      value={newTaskContent}
                      onChange={(e) => setNewTaskContent(e.target.value)}
                    />
                    <input
                      type="button"
                      value="추가완료"
                      onClick={() => {
                        const newTaskId =
                          'task-' + (BOARD_CONTENTS.lastTaskNumber + 1);

                        const newTasks = {
                          ...BOARD_CONTENTS.tasks,
                          [newTaskId]: {
                            id: newTaskId,
                            content: newTaskContent,
                          },
                        };

                        const newTaskIds = Array.from(
                          BOARD_CONTENTS.columns[column.id].taskIds,
                        );
                        newTaskIds.push(newTaskId);

                        const newColumns = {
                          ...BOARD_CONTENTS.columns,
                          [column.id]: {
                            ...BOARD_CONTENTS.columns[column.id],
                            taskIds: newTaskIds,
                          },
                        };

                        console.log({
                          ...BOARD_CONTENTS,
                          lastTaskNumber: BOARD_CONTENTS.lastTaskNumber + 1,
                          tasks: newTasks,
                          columns: newColumns,
                        });

                        setBOARD_CONTENTS({
                          ...BOARD_CONTENTS,
                          lastTaskNumber: BOARD_CONTENTS.lastTaskNumber + 1,
                          tasks: newTasks,
                          columns: newColumns,
                        });

                        setNewTaskContent('');
                        setIsTaskAdding(false);
                      }}
                    />
                  </>
                )}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default connect(Column);
