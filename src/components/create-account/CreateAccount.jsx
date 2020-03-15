import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("SignUp")

  function handleOnChange(event) {
    console.log(event.target)
    setUsername(event.target.value)
  }

  return (
    <div>
    <h1>Create Account</h1>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField 
            required 
            id="standard-required" 
            label="Username" 
            value={username}
            onChange={event => handleOnChange(event)}
        />
        <TextField
          required 
          id="standard-password-input"
          label="Password"
          type="password"
        />
      <TextField
          required 
          id="standard-password-confirmation-input"
          label="Confirm Password"
          type="password"
        />
        <TextField
          required 
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