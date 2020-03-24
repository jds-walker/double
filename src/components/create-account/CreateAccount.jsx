import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Box, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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

  const [credentials, setCredentials] = useState({
      firstname: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: {
        severity: 'info',
        info: 'email address will become your login',
      }
      
  })

  const history = useHistory();
  const {firstname, surname, email, password, confirmPassword, error, message} = credentials;


  const handleSubmit = async event => {
    event.preventDefault();
    console.log(credentials)
    Auth.signUp({
      "username": email,
      "password": password,
      attributes: {
        "custom:firstname": firstname, 
        "custom:surname": surname, 
      },
      validationData: [] //optional
    })
      .then(data => {console.log(data)
        if (data.user) {
          history.push('/verify')
        }
      })

      .catch(err => {console.log(err)
        if (err.code === "UsernameExistsException") {
          console.log("username exists")
          setCredentials({...credentials, "message": {
            severity: "warning",
            info: "account already exists"
          }})
        }
      })
  };

  const handleOnChange = event => {
    const {name, value} = event.target;
    setCredentials({...credentials, [name]: value})

  }

  return (
    <Paper className={classes.paper}>
    <Typography variant='h5' component='h2'>Register</Typography>
    <Alert severity={message.severity}>{message.info}</Alert>
    <form className={classes.form}  
      onSubmit={handleSubmit}
    > 
        <TextField 
          className={classes.text}
            required 
            id="firstname" 
            name='firstname' 
            label='first name'
            value={firstname}
            onChange={handleOnChange}
        />
        <TextField 
          className={classes.text}
            id="surname" 
            name='surname' 
            label='surname'
            value={surname}
            onChange={handleOnChange}
        />
        <TextField 
          className={classes.text}
            required 
            id="email" 
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
          value={confirmPassword}
          onChange={handleOnChange}
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