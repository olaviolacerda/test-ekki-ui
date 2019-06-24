import React, { Component } from 'react';
import api from '../../services/api'

import { Container, Segment, Header, Tab, Button } from 'semantic-ui-react'
import TransactionsList from './TransactionsList'
import DefaultLayout from '../../components/DefaultLayout'
import TransactionModal from '../../components/TransactionModal'
import socket from 'socket.io-client'



export default class Transactions extends Component {
    state = {
        transactions: {},
        transactionsOrdered: {},
        updateTransactions: false
    }

    sortTransactions = (orderBy) => {
        this.setState({ loading: true })
        const { transactions } = this.state;

        console.log(transactions)
        if (orderBy == 0) {
            this.setState({ transactionsFiltered: transactions, loading: false })
        } else if (orderBy == 1) {
            this.setState({
                transactionsFiltered: this.state.transactions
                    .filter(transaction => !transaction.addition && transaction.fromUserId),
                loading: false
            })
        } else {
            this.setState({
                transactionsFiltered: this.state.transactions
                    .filter(transaction => transaction.addition),
                loading: false
            })
        }
        return true;
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'));

        this.subscribeToTransactionEvents()

        const transactions = await api.get(`transactions/${user.id}`)

        this.setState({
            transactions: transactions.data,
            transactionsFiltered: transactions.data,
            loading: false
        })

    }

    subscribeToTransactionEvents = async () => {
        const io = socket('https://ekki-api-olavio.herokuapp.com')
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'))


        await io.on(`transaction-${user.cpf}`, data => {
            this.setState({
                updateTransactions: true
            })
        })
    }

    updateTransactions = async () => {

        this.setState({ loading: true })
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'));


        const transactions = await api.get(`transactions/${user.id}`)

        this.setState({
            transactions: transactions.data,
            transactionsFiltered: transactions.data,
            updateTransactions: false,
            loading: false
        })
    }

    handleChange = (e, data) => this.sortTransactions(data.activeIndex)

    render() {
        const { transactionsFiltered, updateTransactions, loading } = this.state

        const panes = [
            { menuItem: { key: 'all', content: 'Todas' }, render: () => <Tab.Pane attached={false}><TransactionsList loading={loading} transactions={transactionsFiltered} /></Tab.Pane> },
            { menuItem: { key: 'sent', icon: 'arrow down', content: 'Enviadas' }, render: () => <Tab.Pane attached={false}><TransactionsList loading={loading} transactions={transactionsFiltered} /></Tab.Pane> },
            { menuItem: { key: 'received', icon: 'arrow up', content: 'Recebidas' }, render: () => <Tab.Pane attached={false}><TransactionsList loading={loading} transactions={transactionsFiltered} /></Tab.Pane> },
        ]

        console.log(transactionsFiltered)

        return (
            <DefaultLayout>
                <Container style={{ marginTop: '5em' }}>
                    <Header as='h2' >
                        Transferências
                        <Header.Subheader>Aqui você pode ficar por dentro de todas as movimentaçãos na sua conta e realizar transferências</Header.Subheader>
                    </Header>
                    <Container>
                        <TransactionModal />
                    </Container>
                    <Segment basic>
                        {updateTransactions &&
                            <Button fluid onClick={this.updateTransactions}
                                icon='redo'
                                labelPosition='right'
                                color="teal"
                                content="Você possui novas transferências, clique para atualizar."></Button>}
                    </Segment>

                    {transactionsFiltered && <Tab onTabChange={this.handleChange} menu={{ secondary: true }} panes={panes} />}

                </Container>
            </DefaultLayout >
        )
    }
}
