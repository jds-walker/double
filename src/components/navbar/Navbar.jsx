import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SimpleMenu from '../simple-menu/SimpleMenu';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar({user}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SimpleMenu/>
          <Typography variant="h6" className={classes.title}>
            Double
          </Typography>
          {
            (user === null) ?
            <Link to='./login'>
              <Button color="inherit">login</Button>
            </Link> : 
            <Button color="inherit" onClick={() => Auth.signOut()}>Logout</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}