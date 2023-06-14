import React, { useState, useRef, useEffect, useContext } from 'react'
// import useAuth from '../../shared/auth-context'
import classes from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom'
import { passwordValidation } from '../../helpers/validation'

import Alert from 'react-bootstrap/Alert'
import AuthContext from '../../context/auth-context';

// const emailRe

function Login() {
    const navigate = useNavigate()
    // let { loggedIn, login } = useAuth()
    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ validUsername, setValidUsername ] = useState( '' )
    const [ validPassword, setValidPassword ] = useState( '' )
    const [ formIsValid, setFormIsValid ] = useState( false )

    const context = useContext( AuthContext )

    const inputUsername = useRef( null )
    const inputPassword = useRef( null )

    useEffect( () => {
        if ( validUsername && validPassword ) {
            setFormIsValid( true )
            console.log( 'valid Form' )
        } else {
            setFormIsValid( false )
            console.log( 'invalid Form' )
        }
    }, [ validUsername, validPassword ] )




    function handleSubmit( e ) {
        e.preventDefault();
        if ( !formIsValid ) return

        fetch( e.target.action, {
            method: e.target.method,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams( { username: validUsername, password: validPassword } )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.status === 'OK' ) {
                    console.log( 'set true' )
                    context.login( true )
                    navigate( data.redirect )
                    // login( true, 'XXX', 'the User' )
                    // window.location.href = '/auth'
                    console.log( 'logged in', context.loggedIn )
                    return
                }
                if ( data.status === 'error' ) {
                    setValidPassword( '' )
                    setPassword( '' )
                    alert( data.message )
                    return
                }
            } ).catch( err => { console.log( 'error' ) } )
    }

    function handleInputChange( e ) {
        const name = e.target.name

        if ( name === 'username' ) setUsername( e.target.value.trim() )
        if ( name === 'password' ) setPassword( e.target.value.trim() )
    }

    function handleUsernameBlur( e ) {
        if ( inputUsername.current.validity.valid || username === '' ) {
            setValidUsername( username )
            console.log( 'valid Username' )
        } else {
            setValidUsername( false )
        }
    }

    function handlePasswordBlur() {
        if ( passwordValidation( password ) || password === '' ) {
            setValidPassword( password )
            console.log( 'valid Password' )
        } else {
            setValidPassword( false )
        }
    }

    return (
        <div className={classes.container}>
            <div className='d-flex flex-column justify-content-center align-items-center py-2' style={{ height: '100vh' }}>
                <div className={'mb-4 p-3 border rounded ' + classes[ 'form-element' ]}>
                    <h1 className='mb-4'>Login</h1>
                    <form method='post' action="/user/login" onSubmit={( e ) => handleSubmit( e )}>
                        <div className="mb-4 position-relative">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="email"
                                required
                                name="username"
                                className={`form-control ${( validUsername === '' || validUsername ) ? '' : 'is-invalid'}`}
                                value={username}
                                ref={inputUsername}
                                onChange={( e ) => handleInputChange( e )}
                                onBlur={handleUsernameBlur}
                            />
                            <div className='invalid-tooltip'>
                                Geben Sie eine gültige E-mail Adresse ein!
                            </div>
                        </div>
                        <div className="mb-4 position-relative">
                            <label htmlFor="password">Passwort</label>
                            <input
                                type="text"
                                name="password"
                                className={`form-control ${( validPassword === '' || validPassword ) ? '' : 'is-invalid'}`}
                                value={password}
                                ref={inputPassword}
                                onChange={( e ) => handleInputChange( e )}
                                onBlur={handlePasswordBlur}
                            />
                            <div className='invalid-tooltip'>
                                A-Z, a-z, 0-9, Länge 8
                            </div>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className="btn btn-primary my-3 inactive" disabled={formIsValid ? false : true}>
                                Login
                            </button>
                            <p>Passwort vergessen? <Link to="/user/forgot-password">Passwort Zurücksetzen</Link></p>
                            <p>Noch nicht Angemeldet? <Link to="/user/register">Registrieren</Link></p>
                        </div>
                    </form>
                </div>
                <div className={'p-3 ' + classes[ 'form-element' ]}>
                    <button
                        className="btn btn-secondary my-4">E-Mail Login</button>
                </div>
                <div className={'p-3 ' + classes[ 'form-element' ]}>
                    <button
                        className="btn btn-secondary my-4"
                        onClick={() => window.location.href = "http://localhost:5010/ms"}>Microsoft Login</button>
                    {/* Todo: Variable statt localhost */}
                </div>
            </div>
        </div>
    )
}

export default Login