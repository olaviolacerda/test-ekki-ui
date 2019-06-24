
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'


import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
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
        <Route path="/" exact component={Register} />
        <Route path='/login' component={Login} />
        <Switch >
            <ForbbidenRoute path="/transactions" component={Transactions} />
            <ForbbidenRoute path="/contacts" component={Contacts} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Routes