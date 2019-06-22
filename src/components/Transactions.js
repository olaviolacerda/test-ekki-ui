import React, { Component } from 'react';
import api from '../services/api'


import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import transactionStatus from '../helpers/transactionHelper'

import Tag from './Tag'
import Transaction from './Transaction';
import Price from './Price';

import { Icon } from 'semantic-ui-react'


export default class Transactions extends Component {
    state = {
        transactions: [],
    }

    async componentDidMount() {

        const userId = JSON.parse(sessionStorage.getItem('EkkiBank::User')).id;

        const transactions = await api.get(`transactions/${userId}`)

        this.setState({
            transactions: transactions.data,
        })

    }


    render() {
        const { transactions } = this.state;

        return (
            <ul>
                {transactions.map(transaction => {
                    const status = transactionStatus(transaction.status);
                    return <Transaction key={transaction.transactionId}>
                        <span>
                            <Icon name={transaction.addition ? 'arrow down' : 'arrow up'} color={transaction.addition ? '#00ca9b' : '#ff5d70'} />
                            <span>ID {transaction.transactionId}</span>
                            <span>{transaction.addition ? transaction.fromUser.name : transaction.toUser.name}</span>
                            <Price color={transaction.addition ? '#00ca9b' : '#ff5d70'}>{transaction.addition ? `+R$ ${transaction.amount}` : `-R$ ${transaction.amount}`}</Price>
                            <span><Tag bgColor={status.bg} color={status.color}>{status.text}</Tag></span>
                        </span>
                        <span>
                            <span>há {distanceInWords(transaction.createdAt, new Date(), { locale: pt })}</span>
                        </span>
                    </Transaction>
                }
                )}
            </ul>)
    }

}

