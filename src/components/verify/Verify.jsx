import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Box, Typography } from '@material-ui/core';





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

export default function Verify({user}) {
const [code, setCode] = useState("");
const classes = useStyles();

const {username} = user;

const history = useHistory();

const handleOnChange = event => {
    const { value } = event.target;
    setCode(value);
}

const handleOnSubmit = async event => {
    event.preventDefault();
    Auth.confirmSignUp(username, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
      })
        .then(data => console.log(data))
        .then(history.push('/login'))
        .catch(err => console.log(err));
    };

  return (
    <Paper className={classes.paper}>
          
    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleOnSubmit}>
      
      <Typography variant='h5' component='h2'>Verify Account</Typography>
        <TextField
          className={classes.text}
          id="code"
          required
          label="Verification Code"
          type="code"
          autoComplete="code"
          value={code}
          name="code"
          onChange={handleOnChange}
        />
        <Box className = {classes.buttonbox}>
          <Button className = {classes.button} type="submit">Submit</Button>
        </Box>
    </form>
    </Paper>
  );
}
