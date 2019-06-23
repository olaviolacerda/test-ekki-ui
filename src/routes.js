
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Login from './pages/Login'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import Contacts from './pages/Contacts';


const Routes = () => (
    <BrowserRouter>
        <Route path='/' exact component={Login} />
        <Switch >
            <Route path='/home' component={Home} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/contacts" component={Contacts} />
        </Switch>
    </BrowserRouter>
)

export default Routes