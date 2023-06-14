import React from 'react'
// import { useEffect, useRef } from 'react'
import styles from './ToggleSwitch.module.css'


/**
 * Toggle Switch. ToggleSwitch.module.css is needed. Optional Params can be used to set css Variables. The Switch is an HTML Checkbox.
 *
 * @param {Boolean} round - Controls wether the switch is round or not.
 * @param {Boolean} checked - Controls wether the switch is checked or not.
 * @param {String} [colorOn='#F17A23'] - Color when active (checked).
 * @param {String} [colorOff='#E0E0E0'] - Color when inactive (unchecked).
 * @param {String} [colorButton='#00385E'] - Color of the Button.
 * @param {String} [width='40px'] - Width.
 * @param {String} [height='20px'] - Height.
 */
function ToggleSwitch( props ) {
    const [ checked, setChecked ] = React.useState( props.checked )

    let style = {}

    let propNames = [
        [ 'colorOn', '--color-on' ],
        [ 'colorOff', '--color-off' ],
        [ 'colorButton', '--color-button' ],
        [ 'width', '--width' ],
        [ 'height', '--height' ]
    ]

    for ( const n of propNames ) {
        if ( props[ n[ 0 ] ] ) style[ n[ 1 ] ] = props[ n[ 0 ] ]
    }


    function handleChange( e ) {
        setChecked( ( prev ) => !prev )
        const val = e.target.value
        props.onChange( props.id, val )
    }

    return (
        <>
            <label className={styles.switch} style={style}>
                <input type="checkbox" onChange={( e ) => handleChange( e )} value={checked} checked={checked} />
                <span className={props.round ? styles.slider + ' ' + styles.round : styles.slider}></span>
            </label>
        </>
    )
}

export default ToggleSwitch