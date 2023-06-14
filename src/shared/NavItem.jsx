import React from 'react';
import icon from '../icons/box.svg'
import { Outlet, NavLink } from "react-router-dom";

function NavItem( props ) {
    // const [ active, setActive ] = useState( false )

    // function test()

    return (
        <div className="nav-item-container">

            <div className="nav-item-prim">
                <NavLink
                    className={( { isActive } ) => isActive ? 'nav-btn active' : 'nav-btn'}
                    to={props.to}>
                    {props.icon}
                    <div className='label'>{props.title}</div>
                </NavLink>
            </div>
            {/* <div className='nav-item-sec'>
                <button className='nav-btn'>
                    <img src={icon} alt="" />
                    <div>Speichern</div>
                </button>
                <button className='nav-btn'>
                    <img src={icon} alt="" />
                    <div></div>
                </button>
            </div> */}
        </div>
    )
}

export default NavItem