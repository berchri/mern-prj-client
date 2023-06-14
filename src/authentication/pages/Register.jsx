import React, { useState, useEffect, useRef } from 'react';
import classes from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom'
import { firstnameValidation, lastnameValidation, passwordValidation } from '../../helpers/validation'
import { getValue } from '@testing-library/user-event/dist/utils';

function Register() {
    const navigate = useNavigate()
    const [ firstname, setFirstname ] = useState( '' )
    const [ lastname, setLastname ] = useState( '' )
    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ validUsername, setValidUsername ] = useState( '' )
    const [ validPassword, setValidPassword ] = useState( '' )
    const [ validFirstname, setValidFirstname ] = useState( '' )
    const [ validLastname, setValidLastname ] = useState( '' )
    const [ formIsValid, setFormIsValid ] = useState( false )

    const inputUsername = useRef( null )

    useEffect( () => {
        if ( validUsername && validPassword && validFirstname && validLastname ) {
            setFormIsValid( true )
        } else {
            setFormIsValid( false )
        }
    }, [ validUsername, validPassword, validFirstname, validLastname ] )

    function handleSubmit( e ) {
        e.preventDefault();

        if ( !formIsValid ) return

        fetch( e.target.action, {
            method: e.target.method,
            // headers: { 'Content-Type': 'multipart/form-data' },
            // body: new FormData( e.target )
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams( { username: validUsername, password: validPassword, firstname: validFirstname, lastname: validLastname } )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.status === 'OK' ) {
                    navigate( data.redirect )
                    return
                }
                if ( data.status === 'error' ) {
                    setValidPassword( '' )
                    setPassword( '' )
                    alert( data.message )
                    return
                }
            } )
    }

    function handleInputChange( e, key ) {
        const name = e.target.name;
        switch ( name ) {
            case 'firstname':
                setFirstname( e.target.value )
                break;
            case 'lastname':
                setLastname( e.target.value )
                break;
            case 'username':
                setUsername( e.target.value )
                break;
            case 'password':
                setPassword( e.target.value )
                break;
            default:

        }
    }

    async function handleUsernameBlur() {
        console.log( 'here' )
        if ( !inputUsername.current.validity.valid ) {
            setValidUsername( false )
            return
        }

        try {
            let availableUsername = await checkUsername( username )
            console.log( 'Status: ', availableUsername.status )

            if ( availableUsername.status === 'OK' ) {
                setValidUsername( username )
            }

            if ( availableUsername.status === 'error' ) {
                setValidUsername( false )
                alert( availableUsername.message )
            }
        } catch ( e ) {
            console.log( 'some Error' )
        }
    }

    function checkUsername() {
        return new Promise( ( res, rej ) => {
            fetch( '/user/available-username', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( { username: username } )
            } )
                .then( res => res.json() )
                .then( data => res( data ) )
                .catch( err => rej( err ) )
        } )
    }

    function handleInputBlur( e ) {
        const inputName = e.target.name
        let value = e.target.value
        value = value.trim()

        if ( validateResult( inputName, value ) || value === '' ) {
            setStateParam( inputName, value )
        } else {
            setStateParam( inputName, false )
        }
    }

    function setStateParam( iName, iValue ) {
        switch ( iName ) {
            case 'firstname': return setValidFirstname( iValue )
            case 'lastname': return setValidLastname( iValue )
            case 'password': return setValidPassword( iValue )
            default: return false
        }
    }



    function validateResult( name, value ) {
        console.log( name )
        switch ( name ) {
            case 'firstname': return firstnameValidation( value )
            case 'lastname': return lastnameValidation( value )
            case 'password': return passwordValidation( value )
        }
    }


    return (
        <>
            <div className={classes.container}>
                <div className='d-flex flex-column justify-content-center align-items-center py-2' style={{ height: '100vh' }}>
                    <div className={'mb-4 p-3 border rounded ' + classes[ 'form-element' ]}>
                        <h1 className='mb-4'>Registrieren</h1>
                        <form method="post" action="/user/register" onSubmit={( e ) => handleSubmit( e )}>
                            <div className="mb-4 position-relative">
                                <label htmlFor="firstname">Vorname</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    className={`form-control ${( validFirstname === '' || validFirstname ) ? '' : 'is-invalid'}`}
                                    value={firstname}
                                    onChange={( e ) => handleInputChange( e )}
                                    onBlur={( e ) => handleInputBlur( e )}
                                />
                                <div className='invalid-tooltip'>
                                    Keine Sonderzeichen oder Leerzeichen möglich.
                                </div>
                            </div>

                            <div className="mb-4 position-relative">
                                <label htmlFor="lastname">Nachname</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    className={`form-control ${( validLastname === '' || validLastname ) ? '' : 'is-invalid'}`}
                                    value={lastname}
                                    onChange={( e ) => handleInputChange( e )}
                                    onBlur={( e ) => handleInputBlur( e )}
                                />
                                <div className='invalid-tooltip'>
                                    Nur A-Z, a-z, "-" und Leerzeichen sind möglich.
                                </div>
                            </div>

                            <div className="mb-4 position-relative">
                                <label htmlFor="username">E-Mail</label>
                                <input
                                    type="email"
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
                                    onChange={( e ) => handleInputChange( e )}
                                    onBlur={( e ) => handleInputBlur( e )}
                                />
                                <div className='invalid-tooltip'>
                                    A-Z, a-z, 0-9, Länge 8
                                </div>
                            </div>
                            <button type="submit" className='btn btn-primary my-3 inactive' disabled={formIsValid ? false : true}>Submit</button>
                            bereits angemeldet? <Link to="/user/login">Login</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register