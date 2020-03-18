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
  const [user, setUser] = useState({
    username: '',
  });




  const handleSubmit = async event => {
    event.preventDefault();
    console.log(user.username)
  }

  const handleOnChange = event => {
    const {name, value} = event.target;
    console.log(event.target)
    console.log(value)
    setUser({...user, [name]: value})
    console.log(user.username)
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
            name='username' 
            label='username'
            value={user.username}
            onChange={handleOnChange}
        />
        <TextField
          required 
          id="standard-password-input"
          name="password"
          label="password"
          type="password"
        />
      <TextField
          required 
          id="standard-password-confirmation-input"
          name="confirmPassword"
          label="confirm password"
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