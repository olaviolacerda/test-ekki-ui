
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'


import Login from './pages/Login'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import Contacts from './pages/Contacts';

const ForbbidenRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        sessionStorage.getItem('EkkiBank::User')
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

const Routes = () => (
    <BrowserRouter>
        <Route path='/' exact component={Login} />
        <Switch >
            <ForbbidenRoute path='/home' component={Home} />
            <ForbbidenRoute path="/transactions" component={Transactions} />
            <ForbbidenRoute path="/contacts" component={Contacts} />
        </Switch>
    </BrowserRouter>
)

export default Routes