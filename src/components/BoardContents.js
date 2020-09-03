import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import { BOARD_CONTENTS } from '../FAKE_DATA.json';
import Column from './Column';
import connect from '../containers/connect';
import Board from './Board';

const Container = styled.div`
  display: flex;
  overflow-y: scroll;
`;

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    margin: 8,
    border: 1,
    background: 'white',
    borderRadius: 2,
    minWidth: 300,
    maxWidth: 300,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  fab: {
    background: 'linear-gradient(45deg, #3ac569 30%, #cff09e 90%)',
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

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
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

function BoardContents({ BOARD_CONTENTS, setBOARD_CONTENTS }) {
  const [isColumnAdding, setIsColumnAdding] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // const [BOARD_CONTENTS, setBOARD_CONTENTS] = useState(BOARD_CONTENTS);
  // onDragStart = () => {
  //   document.body.style.color = 'orange';
  //   document.body.style.transition = 'backgrond-color 0.2s ease';
  // }

  // const onDragStart = (start) => {
  //   const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

  //   setState({
  //     ...state,
  //     homeIndex,
  //   });
  // };

  // const onDragUpdate = (update) => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(state.tasks).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // };

  const classes = useStyles();
  const onDragEnd = (result) => {
    // setState({
    //   ...state,
    //   homeIndex: null,
    // });

    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(BOARD_CONTENTS.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...BOARD_CONTENTS,
        columnOrder: newColumnOrder,
      };

      setBOARD_CONTENTS(newState);
      return;
    }

    // const column = this.state.columns[source.droppableId];
    const home = BOARD_CONTENTS.columns[source.droppableId];
    const foreign = BOARD_CONTENTS.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...BOARD_CONTENTS,
        columns: {
          ...BOARD_CONTENTS.columns,
          [newColumn.id]: newColumn,
        },
      };

      setBOARD_CONTENTS(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(home.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...home,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(foreign.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...foreign,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...BOARD_CONTENTS,
      columns: {
        ...BOARD_CONTENTS.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setBOARD_CONTENTS(newState);
  };

  return (
    <DragDropContext
      // onDragStart={onDragStart}
      // onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container
            style={{ overflow: 'auto' }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {BOARD_CONTENTS.columnOrder.map((columnId, index) => {
              const column = BOARD_CONTENTS.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => BOARD_CONTENTS.tasks[taskId],
              );

              // const isDropDisabled = index < state.homeIndex;
              // console.log(index < state.homeIndex);
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                  // isDropDisabled={isDropDisabled}
                />
              );
            })}
            {provided.placeholder}
            <Paper className={classes.columnContainer} elevation={0}>
              <Tooltip
                title="Add"
                aria-label="add"
                onClick={() => setIsColumnAdding(true)}
              >
                <Fab className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Dialog
                open={isColumnAdding}
                onClose={() => {}}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  style={{ color: '#3ac569' }}
                  id="form-dialog-title"
                >
                  New Column
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    새로 만들 칼럼의 제목을 입력하세요
                  </DialogContentText>
                  <TextField
                    className={classes.textfield}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Column Title"
                    type="text"
                    fullWidth
                    onChange={(e) => {
                      setNewColumnTitle(e.target.value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ color: '#3ac569' }}
                    onClick={() => setIsColumnAdding(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ color: '#3ac569' }}
                    onClick={() => {
                      const newColumId =
                        'column-' + (BOARD_CONTENTS.lastColumnNumber + 1);

                      const newColum = {
                        id: newColumId,
                        title: newColumnTitle,
                        taskIds: [],
                      };

                      setBOARD_CONTENTS({
                        ...BOARD_CONTENTS,
                        lastColumnNumber: BOARD_CONTENTS.lastColumnNumber + 1,
                        columns: {
                          ...BOARD_CONTENTS.columns,
                          [newColumId]: newColum,
                        },
                        columnOrder: [
                          ...BOARD_CONTENTS.columnOrder,
                          newColumId,
                        ],
                      });
                      setIsColumnAdding(false);
                      setIsColumnAdding(false);
                    }}
                  >
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
              {/* {isColumnAdding ? (
                <>
                  <InputContainer
                    value={newColumnTitle}
                    onChange={(e) => {
                      setNewColumnTitle(e.target.value);
                    }}
                  />
                  <input
                    type="button"
                    value="추가완료 "
                    onClick={() => {
                      const newColumId =
                        'column-' + (BOARD_CONTENTS.lastColumnNumber + 1);

                      const newColum = {
                        id: newColumId,
                        title: newColumnTitle,
                        taskIds: [],
                      };

                      setBOARD_CONTENTS({
                        ...BOARD_CONTENTS,
                        lastColumnNumber: BOARD_CONTENTS.lastColumnNumber + 1,
                        columns: {
                          ...BOARD_CONTENTS.columns,
                          [newColumId]: newColum,
                        },
                        columnOrder: [
                          ...BOARD_CONTENTS.columnOrder,
                          newColumId,
                        ],
                      });
                      setIsColumnAdding(false);
                    }}
                  />
                </>
              ) : (
                <input
                  type="button"
                  value="column 추가"
                  onClick={() => {
                    setIsColumnAdding(true);
                  }}
                />
              )} */}
            </Paper>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default connect(BoardContents);
