import React, { createContext, useState, useContext, useCallback } from "react";
import { useOutletContext } from "react-router-dom";

const AuthContext = createContext( {
    user: '',
    loggedIn: true,
    authToken: '',
    // for autocompletion
    login: ( status, token, user ) => { },
    logout: () => { }
} );

function AuthContextProvider( props ) {
    const [ user, setUser ] = useState( '' )
    const [ loggedIn, setLoggedIn ] = useState( false )
    const [ authToken, setToken ] = useState( '' )

    // const login = useCallback( ( status ) => {
    //     setLoggedIn( ( prev ) => true )
    //     console.log( 'true', loggedIn )
    // }, [ loggedIn ] )

    console.log( 'context', loggedIn )

    const login = ( status ) => {
        setLoggedIn( status )
    }


    /*
    function login( status, token, user ) {
        // const login = useCallback( ( status, token, user ) => {
        console.log( 'xx', status )
        setLoggedIn( { loggedIn: status } )
        if ( status === true ) {
            console.log( 'hi' )
            setToken( { token: token } )
            setUser( { user: user } )
            console.log( loggedIn )
        }
    }
    // , [ user, loggedIn, authToken ] )
    */

    function logout() {
        setUser( '' )
        setLoggedIn( false )
        setToken( '' )
    }

    const context = { user, loggedIn, authToken, login, logout }

    return <AuthContext.Provider value={context}>
        {props.children}
    </AuthContext.Provider>
}

export { AuthContextProvider, AuthContext }
export default AuthContext

// Hook useAuth
// const useAuth = () => {
//     return useContext( AuthContext )
// }
// export default useAuth