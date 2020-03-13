import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core'
import Navbar from './components/navbar/Navbar'
import { Hub } from 'aws-amplify';

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState("")

  useEffect(() => {

    const listener = (data) => {
      console.log(data)
      if (data.payload.event === "signOut"){
        setUser("");      
      }
      setUser(data.payload.data.username)
    }
    
    Hub.listen('auth', listener);
  })

  return (
    <React.Fragment>
    <CssBaseline />
      <div className="App">

      <Navbar/>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => Auth.federatedSignIn()}
        >
            Open Hosted UI
        </Button>
        <h1>Hello {user}</h1>
      </div>
      
    </React.Fragment>
  );
}

export default App;
