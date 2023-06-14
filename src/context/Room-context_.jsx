import React, { useState, useCallback, useContext, createContext, useEffect } from 'react';

const RoomContext = createContext( [] )

class TreeNode {
    constructor( label, path, isGroup ) {
        this.path = path
        this.id = this.path.join( '-' )
        this.label = label
        this.isGroup = isGroup
        this.children = []
    }

    static getParent( obj, allData ) {
        const path = obj.path
        let parent = allData

        if ( path.length > 1 ) {
            for ( let i = 0; i < ( path.length - 1 ); i++ ) {
                parent = parent[ path[ i ] ] || parent.children[ path[ i ] ]
            }
        } else {
            parent = null
        }
        return parent
    }

    validate( string ) {
        string = string.trim()
        if ( string == null || string === '' ) {
            return { status: false, msg: 'nicht möglich' }
        }
        if ( string.search( /[^\w\s.,#+?&/-]/gi ) > -1 ) {
            return { status: false, msg: 'nicht möglich' }
        }
        return { status: true }
    }
}




function RoomContextProvider( props ) {
    const [ structure, setStructure ] = useState( [] )


    function test() {
        console.log( 'test' )
    }

    useEffect( () => {
        fetch( '/auth/data', {
            method: 'get'
        } )
            .then( response => response.json() )
            .then( data => {
                console.log( data )
            } )
    }, [] )



    const context = { structure, test }
    return ( <RoomContext.Provider value={context}>
        {props.children}
    </RoomContext.Provider> )
}

export { RoomContextProvider }
export default RoomContext