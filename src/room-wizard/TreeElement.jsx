import React from 'react'
import modTC from './TreeCreator.module.css'
import * as Icon from '../icons/Icon'

import TreeElementLayout from './TreeElementLayout'
import { useEffect, useState } from 'react'

function TreeElement( { dataItem, level, toggleActive, changeName, deleteElement } ) {
    const [ expanded, setExpanded ] = useState( dataItem.expanded || false )
    const [ childCount, setChildCount ] = useState( 0 )

    const hasChildren = dataItem.children && dataItem.children.length !== 0;

    useEffect( () => {
        setChildCount( prev => dataItem.children.length )
    }, [] )

    function renderChildren() {
        if ( hasChildren ) {
            // setChildCount( prev => dataItem.children.length )
            const newLevel = level + 1

            return dataItem.children.map( child =>
                <TreeElement key={child.id}
                    childCount={childCount}
                    dataItem={child}
                    level={newLevel}
                    toggleActive={toggleActive}
                    changeName={changeName}
                    deleteElement={deleteElement}
                />
            )
        }
        return null
    }

    function toggleExpanded() {
        setExpanded( prev => !prev )
    }


    return (

        // <div className={modTC[ 'group-container' ]}>

        <>
            <TreeElementLayout
                dataItem={dataItem}
                // hasChildren={hasChildren}
                childCount={childCount}
                level={level}
                toggleActive={toggleActive}
                toggleExpanded={toggleExpanded}
                changeName={changeName}
                deleteElement={deleteElement}
            />

            {expanded && renderChildren()}
        </>
    )
}

export default TreeElement