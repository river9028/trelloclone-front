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
  },
  paper: {
    margin: 5,
    // padding: theme.spacing(2),
    width: theme.spacing(16),
    height: theme.spacing(16),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  active: {
    color: 'white',
  },
  inactive: {
    color: 'white',
  },
  fab: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
              <Paper elevation={5} className={classes.paper}>
                {board.title}
              </Paper>
            </NavLink>
          </div>
        ))}

        <div>
          <Paper elevation={0} className={classes.paper}>
            <Tooltip
              title="Add"
              aria-label="add"
              onClick={() => setIsBoardAdding(true)}
            >
              <Fab className={classes.fab}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Paper>
          <Dialog
            open={isBoardAdding}
            onClose={() => {
              setIsBoardAdding(false);
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle style={{ color: '#f50057' }} id="form-dialog-title">
              New Board
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                새로 만들 보드의 제목을 입력하세요
              </DialogContentText>
              <TextField
                color="secondary"
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
              <Button color="secondary" onClick={() => setIsBoardAdding(false)}>
                Cancel
              </Button>
              <Button
                color="secondary"
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
