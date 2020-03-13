import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/navbar/Navbar'
import { Hub } from 'aws-amplify';

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null)

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
  })

  return (
    <React.Fragment>
    <CssBaseline />
      <div className="App">
      <Navbar user={user}/>
        <h1>Hello {user}</h1>
      </div>
      
    </React.Fragment>
  );
}

export default App;
