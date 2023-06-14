import React, { useState } from 'react';
import NavItem from './NavItem'
import { NavLink } from 'react-router-dom';
import './MainNavigation.css'
import { useLocation } from 'react-router-dom';
import { Box, Save, Load, Layer, Layers, User } from '../icons/Icon';

function MainNavigation() {

    return (
        <nav className="col col_fixed_l p-0">
            <div className="nav-top">
                <NavLink
                    className={( { isActive } ) => isActive ? 'nav-btn active' : 'nav-btn'}
                    to='/auth'>
                    <Box />
                    <div className='label'>Home</div>
                </NavLink>
            </div>
            <div className="nav-main">
                <h6 className='bp-0 pt-5 px-3'>Start</h6>
                <NavItem
                    title='Raumassistent'
                    icon={<Box />}
                    to='/auth/room'
                />
            </div>
            <div className="nav-bottom">
                <h6 className='bp-0 pt-5 px-3'>Start</h6>
                <NavItem
                    title='Schichten'
                    icon={<Layer />}
                    to='/auth/layer'
                />
                <NavItem
                    title='Aufbauten'
                    icon={<Layers />}
                    to='/auth/layer-group'
                />
                <h6 className='bp-0 pt-5 px-3'>Benutzer</h6>
                <NavItem
                    title='Benutzer'
                    icon={<User />}
                    to='/auth/user'
                />
            </div>


        </nav>
    )
}

export default MainNavigation