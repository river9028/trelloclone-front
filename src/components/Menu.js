import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import connect from '../containers/connect';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  active: {
    color: 'white',
  },
  inactive: {
    color: 'white',
  },
}));

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
  &:hover {
    ${RemoveContainer} {
      opacity: 1;
    }
  }
`;

function Menu({
  pageTitle,
  isTitleEditing,
  newBoardTitle,
  BOARDS_DATA,
  setPageTitle,
  setIsTitleEditing,
  setNewBoardTitle,
  setBOARDS_DATA,
}) {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [selectedBoard] = BOARDS_DATA.filter(
    (board) => board.id === params.board_id,
  );

  const aceessNewPage = (route = '') => {
    history.push(`/boards/${route}`);
  };

  useEffect(() => {
    if (selectedBoard) {
      setPageTitle(selectedBoard.title);
    } else {
      setPageTitle('Boards');
    }
  });

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar
            style={{
              background: 'linear-gradient(45deg, #3ac569 30%, #cff09e 90%)',
            }}
          >
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <NavLink
                className={classes.inactive}
                activeClassName={classes.active}
                exact
                to="/"
                onClick={() => {
                  setPageTitle('Boards');
                }}
              >
                <DashboardIcon />
              </NavLink>
            </IconButton>
            {!isTitleEditing ? (
              <div className={classes.title}>
                <TitleContainer>
                  <Typography
                    variant="h6"
                    onDoubleClick={() => {
                      if (selectedBoard !== undefined) {
                        // console.log(selectedBoard);
                        setIsTitleEditing(true);
                      }
                    }}
                  >
                    {pageTitle}
                  </Typography>
                  {selectedBoard && (
                    <>
                      <RemoveContainer onClick={() => setOpen(true)}>
                        <DeleteIcon />
                      </RemoveContainer>

                      <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {'선택한 Board를 삭제하시겠습니까?'}
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
                              const newBOARDS_DATA = BOARDS_DATA.filter(
                                (board) => board.id !== params.board_id,
                              );
                              setBOARDS_DATA(newBOARDS_DATA);
                              aceessNewPage();
                            }}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                </TitleContainer>
              </div>
            ) : (
              <div className={classes.title}>
                <TextField
                  autoFocus
                  value={newBoardTitle}
                  onBlur={() => setIsTitleEditing(false)}
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
              </div>
            )}
            <NavLink
              className={classes.inactive}
              activeClassName={classes.active}
              to="/settings"
              onClick={() => {
                setPageTitle('Settings');
              }}
            >
              <SettingsIcon />
            </NavLink>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default connect(Menu);
