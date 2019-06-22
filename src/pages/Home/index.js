import React, { Component } from 'react';
import api from '../../services/api'

import Transactions from '../../components/Transactions';
import Account from '../../components/Account';

export default class Home extends Component {
    state = {
        user: {},
        account: {}
    }

    async componentDidMount() {
        const userId = JSON.parse(sessionStorage.getItem('EkkiBank::User')).id;

        const user = await api.get(`users/${userId}`)
        const account = await api.get(`users/${userId}/account`)

        this.setState({
            user: user.data,
            account: account.data
        })

    }

    render() {
        const { user, account } = this.state

        return <div>
            <Account>
                <span>{user.name}</span>
                <span>Saldo R${account.balance}</span>
                <span>Limite R${account.limit}</span>
            </Account>
            <Transactions />
        </div>
    }
}
