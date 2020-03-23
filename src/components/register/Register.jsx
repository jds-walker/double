import React, { useState } from 'react';
import CreateAccount from '../create-account/CreateAccount'
import Verify from '../verify/Verify'

export default function Register() {
    const [credentials, setCredentials] = useState({
        firstname: '',
        surname: '',
        email: '',
        password: '',
        validatepassword: '',
        stage: 'create-account',
    })

    const { stage } = credentials;

    return(
    stage === 'create-account' ? 
        <CreateAccount credentials={credentials}/> : 
        <Verify credentials={credentials}/>
    )
 

}