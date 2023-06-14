import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../../context/auth-context'
import classes from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom'
import { passwordValidation } from '../../helpers/validation'

// const emailRe

function ForgotPassword() {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState( '' )
    const [ validUsername, setValidUsername ] = useState( '' )
    const [ formIsValid, setFormIsValid ] = useState( false )

    const inputUsername = useRef( null )

    useEffect( () => {
        if ( validUsername ) {
            setFormIsValid( true )
        } else {
            setFormIsValid( false )
        }
    }, [ validUsername ] )

    function handleSubmit( e ) {
        e.preventDefault();
        if ( !formIsValid ) return

        fetch( e.target.action, {
            method: e.target.method,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams( { username: validUsername } )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.status === 'OK' ) {
                    navigate( data.redirect )
                    return
                }
                if ( data.status === 'error' ) {
                    setUsername( '' )
                    setValidUsername( '' )
                    alert( data.message )
                    return
                }
            } ).catch( err => console.log( 'error' ) )
    }

    function handleInputChange( e ) {
        const name = e.target.name
        if ( name === 'username' ) setUsername( e.target.value.trim() )
    }

    function handleUsernameBlur( e ) {
        if ( inputUsername.current.validity.valid || username === '' ) {
            setValidUsername( username )
        } else {
            setValidUsername( false )
        }
    }

    return (
        <div className={classes.container}>
            <div className='d-flex flex-column justify-content-center align-items-center py-2' style={{ height: '100vh' }}>
                <div className={'mb-4 p-3 border rounded ' + classes[ 'form-element' ]}>
                    <h3 className='mb-4'>Passwort Zurücksetzen</h3>
                    <form method='post' action="/user/forgot-password" onSubmit={( e ) => handleSubmit( e )}>
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
                        <div>
                            <button
                                type='submit'
                                className="btn btn-primary my-3 inactive" disabled={formIsValid ? false : true}>
                                Link senden
                            </button>
                        </div>
                    </form>
                    <button
                        type='button'
                        className="btn btn-secondary my-3" onClick={() => navigate( '/user/login' )}>
                        zum Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword