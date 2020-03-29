import React from 'react';
import { API } from 'aws-amplify'

const Profile = () => {

    const test = async () => {
        const res = await API.get('xeroConnection', '/xero');
        console.log(res)
    }

    return(
        <div>
            <h1>Hello</h1>
            <button onClick={test}/>
        </div>
    )

}

export default Profile;