import React, { useState } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Task from './Task';
import connect from '../containers/connect';

const useStyles = makeStyles((theme) => ({
  icon: {
    background: 'white',
    color: '#3ac569',
  },
  textfield: {
    '& label.Mui-focused': {
      color: '#3ac569',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3ac569',
    },
  },
}));

const CssPaper = withStyles({
  root: {
    margin: 8,
    border: 1,
    background: 'white',
    borderRadius: 2,
    minWidth: 300,
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
  },
})(Paper);

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  min-width: 300px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

const TaskList = styled.div`
    padding: 8px;
    transition = backgrond-color 0.2s ease;
    background-color: ${(props) =>
      props.isDraggingOver ? '#C5E99B' : 'inherit'};
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

const TitleContainer = styled.h3`
  padding: 8px;
  display: flex;
  align-items: center;
  color: #3ac569;
  &:hover {
    ${RemoveContainer} {
      opacity: 1;
    }
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
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <CssPaper
          elevation={3}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {isTaskEditing ? (
            <>
              <TextField
                autoFocus
                style={{
                  padding: 25,
                }}
                value={columnTitle}
                onChange={(e) => {
                  setColumnTitle(e.target.value);
                }}
                onBlur={() => {
                  setIsTaskEditing(false);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const newColumns = {
                      ...BOARD_CONTENTS.columns,
                      [column.id]: {
                        ...BOARD_CONTENTS.columns[column.id],
                        title: columnTitle,
                      },
                    };
                    setBOARD_CONTENTS({
                      ...BOARD_CONTENTS,
                      columns: newColumns,
                    });
                    setIsTaskEditing(false);
                  }
                }}
              />
              {/* <input
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
              /> */}
            </>
          ) : (
            <TitleContainer
              {...provided.dragHandleProps}
              onDoubleClick={() => {
                setIsTaskEditing(true);
              }}
            >
              {columnTitle}

              <RemoveContainer
                onClick={() => {
                  setOpen(true);
                }}
              >
                <DeleteIcon />
              </RemoveContainer>
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'선택한 Column을 삭제하시겠습니까?'}
                </DialogTitle>
                <DialogActions>
                  <Button
                    style={{ color: '#3ac569' }}
                    onClick={() => {}}
                    color="primary"
                  >
                    No
                  </Button>
                  <Button
                    style={{ color: '#3ac569' }}
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
                    color="primary"
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              {/* <input
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
              /> */}
            </TitleContainer>
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
                  <Tooltip
                    title="Add"
                    aria-label="add"
                    onClick={() => setIsTaskAdding(true)}
                  >
                    <IconButton className={classes.icon} aria-label="add">
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  // <input
                  //   type="button"
                  //   value="task 추가"
                  //   onClick={() => {
                  //     setIsTaskAdding(true);
                  //   }}
                  // />
                  <>
                    <InputContainer
                      autoFocus
                      value={newTaskContent}
                      onChange={(e) => setNewTaskContent(e.target.value)}
                      onBlur={() => setIsTaskAdding(false)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
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
                        }
                      }}
                    />
                  </>
                )}
              </TaskList>
            )}
          </Droppable>
        </CssPaper>
      )}
    </Draggable>
  );
}

export default connect(Column);
