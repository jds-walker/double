import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Box, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    error: {
      warning: null,
      password: null,
    }
  });
  const {email, password, error} = credentials;
  const classes = useStyles();
  const history = useHistory();

  const handleOnChange = event => {
    const {name, value} = event.target; 

    setCredentials({...credentials, [name]: value})
  }

  const handleOnSubmit = async event => {
    event.preventDefault();
    Auth.signIn(email, password)
      .then(user => {
        if (user.username) {
          history.push("/")
        }
      })
      .catch(err => {console.log(err)
        if (err.code === "UserNotConfirmedException") {
          history.push('/verify', {"email": email})
        }
        else if (err.code === 'NotAuthorizedException' || err.code === 'UserNotFoundException') {
        // The error happens when the incorrect password is provided or supplied username/email does not exist in the Cognito user pool
          setCredentials({...credentials, error: {
            warning: 'Unknown email or password',
          }})
  }})}
  

  return (
      <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={handleOnSubmit} noValidate autoComplete="off">
          <Typography variant='h5' component='h2' >Login</Typography>
          {error.email ? 
          <Alert className={classes.text} severity="warning">{error.email}</Alert>:
          <Alert className={classes.text} severity="info">Enter email and password</Alert>}
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
            id="standard-password-input"
            required
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handleOnChange}
          />
          <Box className = {classes.buttonbox}>
            <Button className = {classes.button} type= "submit">Submit</Button>
            <Button className = {classes.button} onClick={() => Auth.federatedSignIn({provider: 'Xero'})}>Xero Login</Button>
          </Box>
      </form>
      <Link className={classes.button} to="/create-account">
        <Button className = {classes.button}>Create Account</Button>
      </Link>
    </Paper>
  );
}
