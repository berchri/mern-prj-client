import React, { useEffect, useState } from 'react'
import ListItemLayout from './ListItemLayout'


function ListTree( props ) {
    const [ list, setList ] = useState( [] )


    useEffect( () => {
        fetch( '/auth/room/tree/list', {
            method: 'post',
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            // body: new URLSearchParams( {} )
        } )
            .then( res => res.json() )
            .then( data => {
                if ( data.status === 'OK' ) {
                    console.log( data.data )
                    setList( data.data )
                    return
                }
                if ( data.status === 'error' ) {
                    alert( data.message )
                    return
                }
            } ).catch( err => { console.log( 'error' ) } )
    }, [] )


    return (
        <div className='col p-3'>
            {list.map( ( e, i ) => <ListItemLayout name={e.name} date={e.date} key={i} objId={e.id} selected={props.selected} /> )}
        </div>
    )
}

export default ListTree