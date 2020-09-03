import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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

import Menu from './Menu';
import connect from '../containers/connect';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: theme.spacing(5),
    overflow: 'auto',
  },
  paper: {
    margin: 5,
    // padding: theme.spacing(2),
    width: theme.spacing(30),
    height: theme.spacing(30),
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    fontSize: 25,
    background: 'linear-gradient(45deg, #3ac569 30%, #cff09e 90%)',
    color: 'white',
  },
  active: {
    color: 'white',
  },
  inactive: {
    color: 'white',
    textDecoration: 'none',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
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

function Boards({ setPageTitle, BOARDS_DATA, setBOARDS_DATA }) {
  const [isBoardEditing, setIsBoardEditing] = useState(false);
  const [isBoardAdding, setIsBoardAdding] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const classes = useStyles();

  return (
    <>
      <Menu />
      <div className={classes.root}>
        {BOARDS_DATA.map((board) => (
          <div key={board.id}>
            <NavLink
              to={`/boards/${board.id}`}
              onClick={() => {
                setPageTitle(board.title);
              }}
              className={classes.inactive}
              activeClassName={classes.active}
            >
              <Paper
                elevation={5}
                className={classes.paper}
                title={board.title}
                aria-label={board.title}
              >
                {board.title}
              </Paper>
            </NavLink>
          </div>
        ))}

        <div>
          <Tooltip
            title="Add"
            aria-label="add"
            onClick={() => setIsBoardAdding(true)}
          >
            <Fab className={classes.absolute}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Dialog
            open={isBoardAdding}
            onClose={() => {
              setIsBoardAdding(false);
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle style={{ color: '#3ac569' }} id="form-dialog-title">
              New Board
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                새로 만들 보드의 제목을 입력하세요
              </DialogContentText>
              <TextField
                className={classes.textfield}
                autoFocus
                margin="dense"
                id="name"
                label="Board Title"
                type="text"
                fullWidth
                onChange={(e) => setNewBoardTitle(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button
                style={{ color: '#3ac569' }}
                onClick={() => setIsBoardAdding(false)}
              >
                Cancel
              </Button>
              <Button
                style={{ color: '#3ac569' }}
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
                    },
                  ]);
                  setIsBoardAdding(false);
                  setIsBoardAdding(false);
                }}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>

          {/* {!isBoardAdding ? (
            <Paper elevation={0} className={classes.paper}>
              <Tooltip
                title="Add"
                aria-label="add"
                onClick={() => {
                  setIsBoardAdding(true);
                }}
              >
                <Fab className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Paper>
          ) : (
            <>
              <input
                value={newBoardTitle}
                placeholder="제목"
                onChange={(e) => setNewBoardTitle(e.target.value)}
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
                    },
                  ]);
                  setIsBoardAdding(false);
                }}
              />
            </>
          )} */}
        </div>
      </div>

      <div>
        {/* {BOARDS_DATA.map((board) => (
          <div key={board.id}>
            <NavLink
              to={`/boards/${board.id}`}
              onClick={() => {
                setPageTitle(board.title);
              }}
            >
              {board.title}
            </NavLink>
          </div>
        ))} */}

        {/* <div>
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
                    },
                  ]);
                  setIsBoardAdding(false);
                }}
              />
            </>
          )}
        </div> */}
      </div>
    </>
  );
}
export default connect(Boards);
