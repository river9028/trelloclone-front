import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

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

function Menu({ pageTitle, setPageTitle }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
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
            <Typography variant="h6" className={classes.title}>
              {pageTitle}
            </Typography>
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
