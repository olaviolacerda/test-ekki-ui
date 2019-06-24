import React, { Component } from 'react';

import NumberFormat from 'react-number-format';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import AccountStyle from './AccountStyle'
import api from '../services/api'
import socket from 'socket.io-client'

export default class AccountInfo extends Component {
    state = {
        account: {}
    }


    async componentDidMount() {

        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'))

        this.subscribeToAccountEvents()

        if (user) {
            const account = await api.get(`users/${user.id}/account`, {
                headers: { 'user-token': user.cpf }
            })

            this.setState({
                account: account.data
            })
        }
    }


    subscribeToAccountEvents = () => {
        const io = socket('http://localhost:3001')
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'))

        io.on(`account-${user.cpf}`, data => {
            this.setState({
                account: data
            })
        })
    }

    render() {
        const { account } = this.state

        return <AccountStyle>
            <span>Seu saldo</span>
            <span><NumberFormat value={Number(account.balance)} displayType={'text'} decimalScale={2} fixedDecimalScale thousandSeparator={'.'} decimalSeparator={','} prefix={'R$'} /></span>
            <span>Limite <NumberFormat value={Number(account.limit)} displayType={'text'} decimalScale={2} fixedDecimalScale thousandSeparator={'.'} decimalSeparator={','} prefix={'R$'} /></span>
            <span>Última atualização há {distanceInWords(account.updatedAt, new Date(), { locale: pt })}</span>
        </AccountStyle>;
    }
}
