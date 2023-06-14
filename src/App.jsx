import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
// import Modal from 'bootstrap';

import Login from './authentication/pages/Login';
import Register from './authentication/pages/Register';
import Reset from './authentication/pages/Reset';
import ForgotPassword from './authentication/pages/Forgot-Passwort';
import Microsoft from './authentication/pages/Microsoft';
// import instructionsSent from './authentication/pages/instructions-sent';

import AuthContext from './context/auth-context';
import RoomContext from './context/Room-context';
import { RoomContextProvider } from './context/Room-context';


import Home from './Home';
import MainNavigation from './shared/MainNavigation';
import Logout from './shared/Logout'
import RoomWizard from './pages/RoomWizard';
import LayerWizard from './pages/LayerWizard';
import LayerGroupWizard from './pages/LayerGroupWizard';
import User from './user/User';

/*
* Bootstrap
*/
import { Container, Row, Col } from 'react-bootstrap';
import Confirmation from './authentication/pages/Confirmation';
// import Row from 'react-bootstrap';


function App() {
  const context = useContext( AuthContext )
  const ctxRoom = useContext( RoomContext )
  console.log( 'Login Status: ', context.loggedIn )

  useEffect( () => {
    fetch( '/auth/start', {
      method: 'post',
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      // body: new URLSearchParams( { username: validUsername, password: validPassword } )
    } )
      .then( res => res.json() )
      .then( data => {
        if ( data.status === 'OK' ) {
          context.login( true )
          // navigate( data.redirect )
          return
        }
        if ( data.status === 'error' ) {
          console.log( data.message )
          return
        }
      } ).catch( err => { console.log( 'error' ) } )
  }, [] )

  function routesLoggedIn() {
    return (
      <Col>
        <RoomContextProvider>
          <Routes>
            <Route path='/auth' element={<Home />} />
            <Route path='/auth/room' element={<RoomWizard />} />
            <Route path='/auth/layer' element={<LayerWizard />} />
            <Route path='/auth/layer-group' element={<LayerGroupWizard />} />
            <Route path='/auth/user' element={<User />} />
          </Routes>
        </RoomContextProvider>
      </Col>
    )
  }

  function routesPublic() {
    return (
      <Routes>
        <Route path="/user/login" element={<Login />} />
        {/* <Route path="/user/microsoft" element={<Microsoft />} /> */}
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/reset" element={<Reset />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/await-confirmation" element={<Confirmation />} />
        <Route path="/user/await-reset-link" element={<Confirmation />} />
        <Route path='*' element={<Navigate to="/user/login" />} />
      </Routes>
    )
  }

  return (
    <div>
      <React.Fragment>
        <BrowserRouter>
          <Container fluid>
            <Row style={{ height: "100vh" }}>
              {context.loggedIn && <MainNavigation />}
              {context.loggedIn ? routesLoggedIn() : routesPublic()}
            </Row>
          </Container>
        </BrowserRouter>
      </React.Fragment>
    </div >
  )

}

export default App;
