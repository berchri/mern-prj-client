import React, { useEffect, useState } from 'react'
import ListItemLayout from './ListItemLayout'

function List() {
    const [ list, setList ] = useState( '' )


    useEffect( () => {
        fetch( '/auth/room/tree/list', {
            method: 'post',
            body: new URLSearchParams( { list: 'load' } )
        } ).then( res => console.log( res ) )
        // fetch( '/auth/room/tree/list', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     body: new URLSearchParams( { list: 'load' } )
        // } )
        //     .then( res => res.json() )
        //     .then( data => {
        //         if ( data.status === 'OK' ) {
        //             console.log( 'data: ', data )
        //             setList( data )
        //             return
        //         }
        //         if ( data.status === 'error' ) {
        //             alert( data.message )
        //             return
        //         }
        //     } ).catch( err => { console.log( 'error' ) } )
    }, [ list ] )


    function getList() {

    }


    return (
        <div className='col p-3'>
            <ListItemLayout />
        </div>
    )
}

export default List