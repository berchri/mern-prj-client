import React, { useState, useCallback, useContext, createContext, useEffect } from 'react';

const defaultDataTree = [
    {
        id: '1',
        path: [ 0 ],
        label: 'Allgemein',
        isGroup: true,
        isActive: false,
        children: [
            {
                id: '1-1',
                path: [ 0, 0 ],
                label: 'Item 1 - 1',
                isGroup: true,
                isGroup: false,
                children: [
                    {
                        id: '1-1-1',
                        path: [ 0, 0, 0 ],
                        label: 'Item 1 - 1 - 1',
                        isGroup: true,
                        isActive: false,
                        children: []
                    }
                ]
            },
            {
                id: '1-2',
                path: [ 0, 1 ],
                label: 'Item 1 - 2',
                isGroup: true,
                isActive: false,
                children: [
                    {
                        id: '1-2-1',
                        path: [ 0, 1, 0 ],
                        label: 'Item 1 - 2 - 1',
                        isGroup: true,
                        isActive: false,
                        children: []
                    },
                    {
                        id: '1-2-2',
                        path: [ 0, 1, 1 ],
                        label: 'Item 1 - 2 - 1 - 1',
                        isGroup: true,
                        isActive: false,
                        children: [
                            {
                                id: '1-2-2-1',
                                path: [ 0, 1, 1, 0 ],
                                label: 'Item 1 - 2 - 2 - 1',
                                isGroup: true,
                                isActive: false,
                                children: []
                            }
                        ]
                    }

                ]
            },
            {
                id: '1-3',
                path: [ 0, 2 ],
                label: 'Item 1 - 3',
                isGroup: true,
                isActive: false,
                children: []
            },
            {
                id: '1-4',
                label: 'Item 1 - 2',
                path: [ 0, 3 ],
                isGroup: true,
                isActive: false,
                children: []
            }
        ]
    },
    {
        id: '2',
        path: [ 1 ],
        label: 'Allgemein',
        isGroup: true,
        isActive: false,
        children: [
            {
                id: '2-1',
                path: [ 1, 0 ],
                label: 'Item 2 - 1',
                isGroup: true,
                isActive: false,
                children: []
            },
            {
                id: '2-2',
                path: [ 1, 1 ],
                label: 'Item 2 - 2',
                isGroup: true,
                isActive: false,
                children: []
            }
        ]
    }
]


const RoomContext = createContext( {
    defaultDataTree: defaultDataTree
} )



function RoomContextProvider( props ) {
    const [ structure, setStructure ] = useState( 'Test' )






    const context = { structure, defaultDataTree }
    return ( <RoomContext.Provider value={context}>
        {props.children}
    </RoomContext.Provider> )
}

export { RoomContextProvider, RoomContext }
export default RoomContext