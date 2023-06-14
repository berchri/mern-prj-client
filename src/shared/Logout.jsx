import React, { Component, useContext, useEffect } from 'react';

import AuthContext from '../context/auth-context.jsx';


function Logout() {
    const context = useContext( AuthContext )

    useEffect( () => {
        context.logout()
    } )


    return (
        <>...</>
    )

}

export default Logout