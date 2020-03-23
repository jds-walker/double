import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import Verify from './components/verify/Verify'
import CreateAccount from './components/create-account/CreateAccount'

import { Hub } from 'aws-amplify';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signOut"){
        setUser(null);
      }
      Auth.currentAuthenticatedUser({
        bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
      .then(data => {
        setUser(data)
      })
      .catch(err => console.log(err));

    }
    Hub.listen('auth', listener);
  
    Auth.currentAuthenticatedUser({
      bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
    .then(data => {
      setUser(data)
    })
    .catch(err => {
      console.log(err)
    });
  
  }, [])
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <div className="App">
        <Navbar user={user}/>
        <Container>
          <Switch>
            <Route path="/login">
              <Login user={user}/>
            </Route>
            <Route path="/create-account">
              <CreateAccount/>
            </Route>
            <Route path="/verify">
              <Verify/>
            </Route>
          </Switch>
        </Container>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App
