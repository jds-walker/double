import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Box, Typography } from '@material-ui/core';
import {Auth} from 'aws-amplify';



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
        margin: '15px 0px 0px 0px',  
      }
  }));



export default function CreateAccount() {
  const classes = useStyles();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  const {username, password, email} = user;

  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(user)

    

    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
      },
      validationData: [] //optional
    })
    .then(data => console.log(data))
    .then(() => history.push())
    .catch(err => console.log(err))
  }

  const handleOnChange = event => {
    const {name, value} = event.target;
    setUser({...user, [name]: value})
  }

  return (
    <Paper className={classes.paper}>
    <Typography variant='h5' component='h2'>Create Account</Typography>
    <form className={classes.form} noValidate autoComplete="off"
      onSubmit={handleSubmit}
    >
        <TextField 
          className={classes.text}
            required 
            id="standard-required" 
            name='email' 
            label='email'
            value={email}
            onChange={handleOnChange}
        />
        <TextField
          className={classes.text}
          required 
          id="standard-password-input"
          name="password"
          label="password"
          type="password"
          value={password}
          onChange={handleOnChange}
        />
      <TextField
          className={classes.text}
          required 
          id="standard-password-confirmation-input"
          name="confirmPassword"
          label="confirm password"
          type="password"
        />
      <Box 
        className = {classes.buttonbox}
      >
          <Button 
            type="submit"
            className={classes.button}
          >
              Submit
          </Button>

        </Box>
    </form>
    </Paper>
  );
}