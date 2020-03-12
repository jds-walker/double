import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Button } from '@material-ui/core'
import Navbar from './components/navbar/Navbar'

Amplify.configure(awsconfig);

function App() {
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
      </div>
    </React.Fragment>
  );
}

export default App;
