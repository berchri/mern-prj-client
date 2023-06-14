import React from 'react'
// import modTC from './TreeCreator.module.css'
import * as Icon from '../icons/Icon'
import { useRef, useState } from 'react'
import modIL from './ListItemLayout.module.css'

function ListItemLayout( props ) {
    const [ active, setActive ] = useState( '' )
    let d = new Date( props.date )
    d = d.toLocaleString( 'de-AT' )

    function clickHandler() {
        active ? setActive( 'active' ) : setActive( '' )
        props.selected( props.objId )
    }

    return (
        <div className={`${modIL.row} ${active}`} onClick={clickHandler}>
            <div className={`${modIL[ 'row-section' ]} ${modIL[ 'name' ]}`}>
                <div className={modIL.icon}><Icon.Triangle />
                </div><div>{props.name}</div>
            </div>
            <div className={`${modIL[ 'row-section' ]} ${modIL[ 'details' ]}`}>{d}</div>
            <div className={`${modIL[ 'row-section' ]} ${modIL[ 'buttons' ]}`}></div>
        </div>
    )
}

export default ListItemLayout