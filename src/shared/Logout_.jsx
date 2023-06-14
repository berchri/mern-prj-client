import React, { Component } from 'react';

import AuthContext from './auth-context.jsx';

export default class LogoutX extends Component {
    static context = AuthContext
    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        this.context.logout();
    }

    render() {
        return (
            <>...</>
        )
    }
}