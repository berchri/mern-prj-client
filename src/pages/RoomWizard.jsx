import React, { useContext, useState } from 'react'
// import * as Icon from '../icons/Icon'
import styles from '../room-wizard/RoomWizard.module.css'
import TreeSection from '../room-wizard/TreeSection'
import DetailSection from '../room-wizard/DetailSection'
// import SaveTree from '../room-wizard/SaveTree'

// import { RoomContextProvider } from './Room-context'
import RoomContext from '../context/Room-context'

/**
 * Room Section
 * @param {Obj} defaultDataTree - Data to show as default
 * @returns
 */
function RoomWizard( { defaultDataTree, children } ) {
    const ctx = useContext( RoomContext )
    const [ selectedElement, setSelectedElement ] = useState( null )
    const [ view, setView ] = useState( 'tree' )
    // const [elementTree, setElementTree] = useState(null)
    // const [modElementTree, setModElementTree] = useState(false)

    function changeView( view ) {
        setView( view )
    }

    console.log( 'ctxroom: ', ctx.structure )

    return (
        <div className='row'>
            <div className={'col ' + styles[ 'col-left' ]}>
                <TreeSection view={view} changeView={changeView} />
            </div>
            <div className='col'>
                <DetailSection view={view} />
            </div>
        </div>
    )
}

export default RoomWizard