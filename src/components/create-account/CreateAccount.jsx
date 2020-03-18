import React, { useState } from 'react';
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
  const [username, setUsername] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(username)
  }

  const handleOnChange = event => {
    const {label, value} = event.target;

    setUsername(value)
    console.log(username)
  }

  return (
    <div>
    <h1>Create Account</h1>
    <form className={classes.root} noValidate autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField 
            required 
            id="standard-required" 
            label="username" 
            value={username}
            onChange={handleOnChange}
        />
        <TextField
          required 
          id="standard-password-input"
          label="password"
          type="password"
        />
      <TextField
          required 
          id="standard-password-confirmation-input"
          label="confirmPassword"
          type="password"
        />
        <TextField
          required 
          id="email"
          label="email"
          type="email"
        />
      </div>
        <Button type="submit">Submit</Button>
    </form>
    </div>
  );
}