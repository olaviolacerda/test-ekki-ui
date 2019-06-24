
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'


import Login from './pages/Login'
import Register from './pages/Register'

import Transactions from './pages/Transactions'
import Contacts from './pages/Contacts';

const ForbbidenRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('EkkiBank::User') || props.location.pathname === '/registar'
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

const Routes = () => (
    <BrowserRouter>
        <Route path='/login' exact component={Login} />
        <Route path="/register" component={Register} />
        <Switch >
            <ForbbidenRoute path="/transactions" component={Transactions} />
            <ForbbidenRoute path="/contacts" component={Contacts} />
        </Switch>
    </BrowserRouter>
)

export default Routes