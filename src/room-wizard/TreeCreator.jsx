import React from 'react'
import modTC from './TreeCreator.module.css'
import * as Icon from '../icons/Icon'

import TreeElement from './TreeElement'
import { Component, useRef, useState } from 'react'
import { render } from '@testing-library/react'
import ToggleSwitch from '../shared/ToggleSwitch'
import RoomContext from '../context/Room-context'

class TreeNode {
    constructor( label, path, isGroup ) {
        this.path = path
        this.id = this.path.join( '-' )
        this.label = label
        this.isGroup = isGroup
        this.isActive = false
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

/**
 * Class to create a tree Structure
 */
class TreeCreator extends React.Component {
    static contextType = RoomContext;
    constructor( props, context ) {
        super( props, context )
        this.state = {
            dataTree: this.context.defaultDataTree,
            // dataTree: [],
            active: null,
            checkCreateMode: true,
            createMode: 'insert'
        }
    }

    /**
     * Rewrites all affected paths
     * @param {Array} startPath - e.g [0,1,2]
     */
    rewriteAllPaths( startPath ) {
        let start = startPath.shift()

        let parentPath = [ start ]
        this.state.dataTree[ start ].children.forEach( ( e, i, a ) => {
            a[ i ].path = [ ...parentPath, i ]
            if ( e.isGroup ) write( a[ i ] )
        } )

        function write( parent ) {
            const parentPath = parent.path
            parent.children.forEach( ( e, i, a ) => {
                a[ i ].path = [ ...parentPath, i ]
                if ( e.isGroup ) write( a[ i ] )
            } )
        }
    }

    /**
     * Selects an Element in a nested Object according to its path
     * @param {Array} path - e.g [0,1,2]
     * @returns
     */
    followPath( path ) {
        let o = this.state.dataTree
        path.forEach( e => o = o[ path[ e ] ] || o.children[ path[ e ] ] )
        return o
    }

    deleteTreeElement( obj ) {
        /*

        parent.children.forEach( ( e, i, arr ) => {
            arr[ i ].path.pop()
            arr[ i ].path.push( i )
        } )
        */
        let parentPath = [ ...obj.path ]
        let pos = parentPath.pop()
        let parent = this.followPath( parentPath )
        parent.children.splice( pos, 1 )

        this.rewriteAllPaths( [ ...obj.path ] )
        this.setState( prev => this.state.dataTree )

        console.log( 'this.state.dataTree :>> ', this.state.dataTree );
        // let parent = TreeNode.getParent( obj, { ...this.state.dataTree } )
    }

    activate( obj ) {
        console.log( obj )
        this.setState( ( state, props ) => ( { active: obj } ), () => console.log( this.state.active ) )
    }

    createNewNode( isGroup ) {
        console.log( 'here', this.state.createMode );
        if ( this.props.editModeActive === false ) return
        if ( this.state.createMode === 'insert' && !this.state.active ) return
        if ( this.state.createMode === 'insert' && !this.state.active.isGroup ) return

        let parent = null
        let path = [ this.state.dataTree.length ]

        if ( this.state.createMode === 'attach' && this.state.active ) {
            parent = TreeNode.getParent( { ...this.state.active }, { ...this.state.dataTree } )
        }

        if ( this.state.createMode === 'insert' ) {
            parent = this.state.active
        }

        if ( parent ) {
            path = [ ...parent.path, parent.children.length ]
        }

        const newNode = new TreeNode( 'neu', path, isGroup )
        console.log( 'new: ', newNode );

        if ( parent ) parent.children = [ ...parent.children, newNode ]
        if ( parent === null ) this.state.dataTree = [ ...this.state.dataTree, newNode ]

        this.setState( {
            dataTree: this.state.dataTree,
            active: newNode
        } )
    }

    clearAll() {
        this.setState( {
            dataTree: []
        } )
    }

    handleToggleChange( obj ) {
        this.setState( ( state, props ) => {
            return {
                checkCreateMode: !state.checkCreateMode,
                createMode: state.createMode === 'attach' ? 'insert' : 'attach'
            }
        } )
    }

    changeName( newName, obj ) {
        // const o = this.followPath( obj )
        obj.label = newName
        this.setState( {
            dataTree: this.state.dataTree
        } )
    }

    render() {
        return (

            <div className='col p-3'>
                Anfügen<ToggleSwitch round={true} checked={this.state.checkCreateMode} key={'t-insert'} id={'t-insert'} onChange={this.handleToggleChange.bind( this )} />Einfügen
                {/* <button onClick={( e ) => this.onClickNewNode( e ).bind( this )}>click</button> */}
                {this.state.dataTree.map( ( e ) =>
                    <TreeElement key={e.id}
                        dataItem={e}
                        level={0}
                        createMode={this.createMode}
                        toggleActive={this.activate.bind( this )}
                        changeName={this.changeName.bind( this )}
                        deleteElement={this.deleteTreeElement.bind( this )}
                    /> )}
            </div >
        )
    }
}

export default TreeCreator