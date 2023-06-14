import React, { useContext, useRef, useState } from 'react'
import modT from './TreeSection.module.css'
import modRW from './RoomWizard.module.css'
import ToggleSwitch from '../shared/ToggleSwitch'
import * as Icon from '../icons/Icon'
import TreeCreator from './TreeCreator'
import RoomContext from '../context/Room-context'
import ListTree from './ListTree'
import SaveTree from './SaveTree'

function TreeSection( props ) {
    const ctx = useContext( RoomContext )
    const refTreeCreator = useRef()


    const [ editMode, setEditMode ] = useState( false )
    const [ selected, setSelected ] = useState( false )

    function handleModeChange( id, value ) {
        setEditMode( ( prev ) => !prev )
    }

    function isSelected( value ) {
        setSelected( value )
    }

    function loadHandler() {
        fetch( '/auth/room/tree/load', {
            method: 'post',
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams( { id: selected } )
        } )
            .then( res => res.json() )
            .then( r => {
                if ( r.status === 'OK' ) {
                    console.log( r.data )

                    ctx.defaultDataTree = r.data
                    setSelected( false )
                    props.changeView( 'tree' )
                    return
                }
                if ( r.status === 'error' ) {
                    alert( r.message )
                    return
                }
            } ).catch( err => { console.log( 'error' ) } )
    }

    function viewTree() {
        return (
            <>
                <div className={modT[ 'toggle-creator' ]}>
                    <Icon.Tools className={modT.icon} />
                    <ToggleSwitch round={true} id={'editMode'} checked={editMode} onChange={handleModeChange} />
                </div>
                <button type='button'
                    className={modT.btn}
                    onClick={() => refTreeCreator.current.createNewNode( true )}
                >
                    <Icon.Boxes className={modT.icon} /><span>Gruppe</span>
                </button>
                <button type='button'
                    className={modT.btn}
                    onClick={() => refTreeCreator.current.createNewNode( false )}
                >
                    <Icon.Box className={modT.icon} /><span>Raum</span>
                </button>
                <button type='button'
                    className={modT.btn}
                    onClick={() => refTreeCreator.current.clearAll()}
                >
                    <Icon.Trash className={modT.icon} /><span>Löschen</span>
                </button>
            </>
        )
    }

    function viewLoad() {
        return ( <>
            <button type='button' className={modT.btn} onClick={() => props.changeView( 'tree' )}>
                <Icon.ArrowLeftCircle className={modT.icon} /><span>Zurück</span>
            </button>
            {selected && <button type='button' className={modT.btn} onClick={loadHandler}>
                <Icon.ArrowLeftCircle className={modT.icon} /><span>Laden</span>
            </button>}
        </> )
    }
    function viewSave() {
        return ( <>
            <button type='button' className={modT.btn} onClick={() => props.changeView( 'tree' )}>
                <Icon.ArrowLeftCircle className={modT.icon} /><span>Zurück</span>
            </button>
        </> )
    }

    return (
        <>
            <div className={'row ' + modRW[ 'left-topbar' ]}>
                <div className='d-flex'>
                    {props.view === 'tree' && viewTree()}
                    {props.view === 'load' && viewLoad()}
                    {props.view === 'save' && viewSave()}
                </div>
            </div>
            <div className={'row ' + modRW[ 'left-main' ]}>
                {props.view === 'tree' && <TreeCreator ref={refTreeCreator} editModeActive={editMode} />}
                {props.view === 'load' && <ListTree listData={'load'} selected={isSelected} />}
                {props.view === 'save' && <SaveTree listData={'save'} changeView={props.changeView} />}
            </div>
            <div className={'row ' + modRW[ 'left-bottombar' ]}>
                <div className='d-flex'>
                    <button type='button'
                        className={modT.btn + ' ' + ( props.view === 'load' ? modT.active : '' )}
                        onClick={() => props.changeView( 'load' )}
                    >
                        <Icon.Load className={modT.icon} /><span>Laden</span>
                    </button>
                    <button type='button'
                        className={modT.btn + ' ' + ( props.view === 'save' ? modT.active : '' )}
                        onClick={() => props.changeView( 'save' )}>
                        <Icon.Save className={modT.icon} /><span>Speichern</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default TreeSection