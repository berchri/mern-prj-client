import React from 'react'
import modTC from './TreeCreator.module.css'
import * as Icon from '../icons/Icon'
import { useRef, useState } from 'react'

function TreeElementLayout( { dataItem, childCount, level, toggleExpanded, toggleActive, changeName, deleteElement } ) {
    const [ edit, setEdit ] = useState( false )
    const [ name, setName ] = useState( dataItem.label )
    const inputElement = useRef()

    function onActive() {
        toggleActive( dataItem )
    }

    function onExpand( e ) {
        e.stopPropagation()
        toggleExpanded()
    }

    function onChangeName( e ) {
        e.stopPropagation()
        setName( ( prev ) => inputElement.current.value )
        changeName( inputElement.current.value, dataItem )
        setEdit( ( prev ) => !prev )
    }

    function onEdit( e ) {
        e.stopPropagation( e )
        setEdit( ( prev ) => !prev )
        inputElement.focus()
    }

    function onDelete( e ) {
        e.stopPropagation()
        deleteElement( dataItem )
    }

    return (
        <div className={modTC.row} onClick={() => onActive()}>
            <div className={modTC.col} >
                <div className={modTC.spacer} style={{ 'width': `${level * 35}px` }}></div>
                {dataItem.isGroup ?
                    <button className={modTC.icon} onClick={( e ) => onExpand( e )}>
                        <Icon.Triangle />
                    </button> :
                    <button className={modTC.icon}>
                        <Icon.Diamond />
                    </button>
                }

                {edit ?
                    <div className={modTC.edit}>
                        <input className='edit-input' type="text" name='input-name' ref={inputElement} />
                        <button className={modTC.icon} onClick={( e ) => onChangeName( e )} ><Icon.CheckSquare /></button>
                    </div> :
                    <div className={modTC.name}><span>{name}</span></div>}
            </div>
            <div className={modTC[ 'item-mod' ]}>
                {childCount > 0 ?
                    <div className={modTC.batch}>{childCount}</div> : <div></div>
                }
                <button className={modTC.icon} onClick={( e ) => onEdit( e )}><Icon.Pencil /></button>
                <button className={modTC.icon} onClick={( e ) => onDelete( e )}><Icon.Trash /></button>
            </div>
        </div>
    )
}

export default TreeElementLayout