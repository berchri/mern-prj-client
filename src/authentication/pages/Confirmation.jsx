import React, { Component } from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom';

function Confirmation() {
    const navigate = useNavigate()
    return (
        <div className={classes.container}>
            <div className='d-flex flex-column justify-content-center align-items-center py-2' style={{ height: '100vh' }}>
                <div className={'mb-4 p-3 border rounded ' + classes[ 'form-element' ]}>
                    <h3 className='mb-4'>Bestätigung Erforderlich</h3>
                    <p className='mb-4'>Überprüfen Sie ihr Email Postfach.</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate( '/user/login' )}>zum Login</button>
                </div>
            </div>
        </div>
    )
}

export default Confirmation