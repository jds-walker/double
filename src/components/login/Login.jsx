import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Box, Typography } from '@material-ui/core';

import { Link } from 'react-router-dom'



const useStyles = makeStyles(theme => ({
  form: {
      display: 'flex',  
      flexDirection: 'column',
    },
    paper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 350,
      padding: 15,
      margin: '35px auto',
      textAlign: 'center',
    },
    buttonbox: {
      display: 'flex',
      margin: '35px 0px 0px 0px'
    },
    button: {
      display: 'block',  
      width: '100%',
    },
    text: {
      margin: '35px 0px 0px 0px',  
    }
}));

export default function Login() {
  const classes = useStyles();

  return (
      <Paper className={classes.paper}>
          
    <form className={classes.form} noValidate autoComplete="off">
      
      <Typography variant='h5' component='h2'>Login</Typography>
        <TextField className={classes.text} required id="standard-required" label="Username" />
        <TextField
          className={classes.text}
          id="standard-password-input"
          required
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Box className = {classes.buttonbox}>
          <Button className = {classes.button} type="submit">Submit</Button>
          <Link className={classes.button} to="/create-account">
            <Button className = {classes.button}>Create Account</Button>
          </Link>
        </Box>
    </form>
    </Paper>
  );
}
