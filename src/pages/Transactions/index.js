import React, { Component } from 'react';
import api from '../../services/api'

import { Dropdown, Container, Segment, Header } from 'semantic-ui-react'
import TransactionsList from './TransactionsList'
import NewTransferModal from './NewTransferModal'
import DefaultLayout from '../../components/DefaultLayout'

export default class Transactions extends Component {
    state = {
        transactions: {},
        transactionsOrdered: {},
        activeItem: 'closest'
    }

    handleItemClick = (e, { name }) => {
        this.sortTransactions(e.target.id)
        this.setState({ activeItem: name })
    }

    sortTransactions = (orderBy) => {
        const { transactions } = this.state;
        if (orderBy == 0) {
            this.setState({ transactionsFiltered: transactions })
        } else if (orderBy == 1) {
            this.setState({
                transactionsFiltered: this.state.transactions
                    .filter(transaction => !transaction.addition)
            })
        } else {
            this.setState({
                transactionsFiltered: this.state.transactions
                    .filter(transaction => transaction.addition)
            })
        }
        return true;
    }

    async componentDidMount() {
        const userId = JSON.parse(sessionStorage.getItem('EkkiBank::User')).id;

        const transactions = await api.get(`transactions/${userId}`)

        this.setState({
            transactions: transactions.data,
            transactionsFiltered: transactions.data,
        })

    }

    render() {

        const filterOptions = [
            {
                key: '0',
                text: 'Todas',
                value: '0',
            },
            {
                key: '1',
                text: 'Enviadas',
                value: '1',
            },
            {
                key: '2',
                text: 'Recebidas',
                value: '2',
            },
        ]
        const { activeItem, transactionsFiltered } = this.state

        return (
            <DefaultLayout>
                <Container style={{ marginTop: '5em' }}>
                    <Header as='h2'>
                        Account Settings
                    <Header.Subheader>Manage your account settings and set email preferences</Header.Subheader>
                    </Header>
                    {transactionsFiltered && <TransactionsList transactions={transactionsFiltered} />}
                </Container>
            </DefaultLayout>
        )
    }
}

//  <Segment ><span>
//                     Mostrar{' '}
//                     <Dropdown
//                         inline
//                         options={filterOptions}
//                         defaultValue={filterOptions[0].value}
//                     />
//                 </span><NewTransferModal /></Segment>