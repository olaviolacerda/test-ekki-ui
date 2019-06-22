
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'

const Routes = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/home' component={Home} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)

export default Routes