import React, { Component } from 'react';

function Login() {
    return (
        <>
            <h1>Login</h1>
            <form method="post" action="/user/login">
                <label for="mail">E-Mail</label>
                <input type="text" name="username" id="username" />
                <label for="password">Passwort</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Submit</button>
            </form>
            <a href="/user/forgot-password">Passwort Vergessen</a><br />
            <a href="/user/register">Registrieren</a>
        </>
    )
}

export default Login