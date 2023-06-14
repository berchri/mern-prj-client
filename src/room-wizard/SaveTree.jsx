import React, { useContext, useEffect, useState } from 'react'
import { inputValidation } from '../helpers/validation.js'
// import { useNavigate } from 'react-router-dom'
import RoomContext from '../context/Room-context'

function SaveTree( { treeData, changeView } ) {
    const ctx = useContext( RoomContext )
    // const navigate = useNavigate()
    const [ name, setName ] = useState( '' )
    const [ validName, setValidName ] = useState( '' )
    const [ formIsValid, setFormIsValid ] = useState( false )

    useEffect( () => {
        validName ? setFormIsValid( true ) : setFormIsValid( false )
    }, [ validName ] )

    function handleInputChange( e ) {
        setName( e.target.value )
    }

    function handleNameBlur( e ) {
        if ( inputValidation( name.trim() ) ) {
            setValidName( name.trim() )
        } else {
            setValidName( false )
        }

    }

    function handleSubmit( e ) {
        e.preventDefault();
        if ( !formIsValid ) return
        fetch( e.target.action, {
            method: e.target.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { name: validName, treeData: ctx.defaultDataTree } )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.status === 'OK' ) {
                    changeView( 'tree' )
                    return alert( 'Gespeichert!' )
                }
                if ( data.status === 'error' ) {
                    setValidName( '' )
                    setName( '' )
                    alert( data.message )
                    return
                }
            } ).catch( err => { console.log( 'error' ) } )
    }


    return (
        <div className='col p-3'>
            <form method='post' action="/auth/room/tree/save" onSubmit={( e ) => handleSubmit( e )}>
                <div className="mb-4 position-relative">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        required
                        name="name"
                        className={`form-control ${( validName === '' || validName ) ? '' : 'is-invalid'}`}
                        value={name}
                        onChange={( e ) => handleInputChange( e )}
                        onBlur={handleNameBlur}
                    />
                    <div className='invalid-tooltip'>
                        Namen eingeben.
                    </div>
                </div>
                <div>
                    <button
                        type='submit'
                        className="btn btn-primary my-3 inactive" disabled={formIsValid ? false : true}>
                        Speichern
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SaveTree