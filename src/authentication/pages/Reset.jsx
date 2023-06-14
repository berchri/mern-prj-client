import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../../context/auth-context'
import classes from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom'
import { passwordValidation } from '../../helpers/validation'

import Alert from 'react-bootstrap/Alert'

// const emailRe

function Reset() {
    const navigate = useNavigate()
    const [ password, setPassword ] = useState( '' )
    const [ passwordConfirm, setPasswordConfirm ] = useState( '' )
    const [ validPassword, setValidPassword ] = useState( '' )
    const [ validPasswordConfirm, setValidPasswordConfirm ] = useState( '' )
    const [ formIsValid, setFormIsValid ] = useState( false )

    useEffect( () => {
        if ( validPassword && validPasswordConfirm && validPassword === validPasswordConfirm ) {
            setFormIsValid( true )
        } else {
            setFormIsValid( false )
        }
    }, [ validPassword, validPasswordConfirm ] )

    function handleSubmit( e ) {
        e.preventDefault();
        if ( !formIsValid ) return

        fetch( e.target.action, {
            method: e.target.method,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams( { password: validPassword } )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.status === 'OK' ) {
                    navigate( data.redirect )
                    return
                }
                if ( data.status === 'error' ) {
                    setPassword( '' )
                    setValidPassword( '' )
                    setPasswordConfirm( '' )
                    setValidPasswordConfirm( '' )
                    alert( data.message )
                    return
                }
            } ).catch( err => { console.log( 'error' ) } )
    }

    function handleInputChange( e ) {
        const name = e.target.name

        if ( name === 'password' ) setPassword( e.target.value.trim() )
        if ( name === 'password-confirm' ) setPasswordConfirm( e.target.value.trim() )
    }

    function handlePasswordBlur() {
        if ( passwordValidation( password ) || password === '' ) {
            setValidPassword( password )
        } else {
            setValidPassword( false )
        }
    }

    function handlePasswordConfirmBlur() {
        if ( passwordValidation( passwordConfirm ) || passwordConfirm === '' || passwordConfirm === password || password === '' ) {
            setValidPasswordConfirm( password )
        } else {
            setValidPasswordConfirm( false )
        }
    }

    return (
        <div className={classes.container}>
            <div className='d-flex flex-column justify-content-center align-items-center py-2' style={{ height: '100vh' }}>
                <div className={'mb-4 p-3 border rounded ' + classes[ 'form-element' ]}>
                    <h1 className='mb-4'>Passwort zurücksetzen</h1>
                    <form method='post' action="/user/reset-password" onSubmit={( e ) => handleSubmit( e )}>
                        <div className="mb-4 position-relative">
                            <label htmlFor="password">neues Passwort</label>
                            <input
                                type="text"
                                name="password"
                                className={`form-control ${( validPassword === '' || validPassword ) ? '' : 'is-invalid'}`}
                                value={password}
                                onChange={( e ) => handleInputChange( e )}
                                onBlur={handlePasswordBlur}
                            />
                            <div className='invalid-tooltip'>
                                A-Z, a-z, 0-9, Länge 8
                            </div>
                        </div>
                        <div className="mb-4 position-relative">
                            <label htmlFor="password-confirm">Passwort wiederholen</label>
                            <input
                                type="text"
                                name="password-confirm"
                                className={`form-control ${( validPasswordConfirm === '' || validPasswordConfirm ) ? '' : 'is-invalid'}`}
                                value={passwordConfirm}
                                onChange={( e ) => handleInputChange( e )}
                                onBlur={handlePasswordConfirmBlur}
                            />
                            <div className='invalid-tooltip'>
                                A-Z, a-z, 0-9, Länge 8; Eingaben müssen identisch sein.
                            </div>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className="btn btn-primary my-3 inactive" disabled={formIsValid ? false : true}>
                                Passwort ändern
                            </button>
                            <p>Passwort vergessen? <Link to="/user/forgot-password">Passwort Zurücksetzen</Link></p>
                            <p>Noch nicht Angemeldet? <Link to="/user/register">Registrieren</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reset