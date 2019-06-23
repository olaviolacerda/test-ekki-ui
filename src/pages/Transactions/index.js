import React, { Component } from 'react';
import api from '../../services/api'

import { Container, Icon, Segment, Header, Tab, Button } from 'semantic-ui-react'
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
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'));

        this.subscribeToTransactionEvents()

        const transactions = await api.get(`transactions/${user.id}`)

        this.setState({
            transactions: transactions.data,
            transactionsFiltered: transactions.data,
        })

    }

    subscribeToTransactionEvents = async () => {
        const io = socket('http://localhost:3001')
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'))


        await io.on(`transaction-${user.cpf}`, data => {
            console.log(data)
            this.setState({
                updateTransactions: true
            })
        })
    }

    updateTransactions = async () => {
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'));


        const transactions = await api.get(`transactions/${user.id}`)

        this.setState({
            transactions: transactions.data,
            transactionsFiltered: transactions.data,
            updateTransactions: false
        })
    }

    render() {
        const { transactionsFiltered, updateTransactions } = this.state

        const panes = [
            { menuItem: 'Todas', render: () => <Tab.Pane attached={false}><TransactionsList transactions={transactionsFiltered} /></Tab.Pane> },
            { menuItem: 'Enviadas', render: () => <Tab.Pane attached={false}><TransactionsList transactions={transactionsFiltered} /></Tab.Pane> },
            { menuItem: 'Recebidas', render: () => <Tab.Pane attached={false}><TransactionsList transactions={transactionsFiltered} /></Tab.Pane> },
        ]


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
                    {transactionsFiltered && <Tab menu={{ secondary: true, pointing: true }} panes={panes} />}
                </Container>
            </DefaultLayout >
        )
    }
}
