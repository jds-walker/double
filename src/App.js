import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import CreateAccount from './components/create-account/CreateAccount'
import Verify from './components/verify/Verify'
import { Hub } from 'aws-amplify';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
  });

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signOut"){
        setUser({
          username: '',
          password: '',
          email: '',
        });      
        
      }
      Auth.currentUserInfo().then((data) => {
        if (data != null) {setUser(data.username)}
      })
    }
    Hub.listen('auth', listener);

    Auth.currentUserInfo().then((data) => {
      if (data != null) {setUser(data.username)}
    })
    console.log(Auth.currentAuthenticatedUser())
  })
  

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
              <CreateAccount user={user}/>
            </Route>
            <Route path="/verify">
              <Verify user={user}/>
            </Route>
          </Switch>
        </Container>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App
