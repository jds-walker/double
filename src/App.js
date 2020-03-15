import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import CreateAccount from './components/create-account/CreateAccount'
import { Hub } from 'aws-amplify';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

Amplify.configure(awsconfig);

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

const useStyles = makeStyles(theme => ({
  root: {
    // margin: '0 auto',
    },
  }
));


function App() {
  const [user, setUser] = useState(null)
  const classes = useStyles();

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "signOut"){
        setUser(null);      
      }
      Auth.currentUserInfo().then((data) => {
        if (data != null) {setUser(data.username)}
      })
    }
    Hub.listen('auth', listener);

    Auth.currentUserInfo().then((data) => {
      if (data != null) {setUser(data.username)}
    })

  })
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <div className="App">
        <Navbar user={user}/>
        <Container className={classes.root}>
          <Switch>
            <Route path="/profile">
              <About />
            </Route>
            <Route path="/account">
              <Users />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/create-account">
              <CreateAccount/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
            <h1>Hello {user}</h1>
            
        </Container>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App
