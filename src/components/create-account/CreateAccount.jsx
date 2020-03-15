import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function CreateAccount() {
  const classes = useStyles();

  return (
    <div>
    <h1>Create Account</h1>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField 
            required id="standard-required" 
            label="Username" 
        />
        <TextField
         required id="standard-required" 
          id="standard-password-input"
          label="Password"
          type="password"
        />
      <TextField
          required id="standard-required" 
          id="standard-password-input"
          label="Confirm Password"
          type="password"
        />
        <TextField
            required id="standard-required" 
          id="email"
          label="Email"
          type="email"
        />
      </div>
        <Button>Submit</Button>
    </form>
    </div>
  );
}