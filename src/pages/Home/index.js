import React, { Component } from 'react';
import { Pane, Table } from 'evergreen-ui'
import {
    format, parseISO
} from 'date-fns';



import api from '../../services/api'

export default class Home extends Component {
    state = {
        transactions: []
    }

    async componentDidMount() {
        const user = this.props.match.params.id
        const response = await api.get(`accounts/${user}/extract`)


        this.setState({ transactions: response.data })

    }

    render() {
        const { transactions } = this.state

        return <Table>
            <Table.Head>
                <Table.TextHeaderCell>
                    ID
            </Table.TextHeaderCell>
                {/* <Table.TextHeaderCell>
                Contato
            </Table.TextHeaderCell> */}
                <Table.TextHeaderCell>
                    Data
            </Table.TextHeaderCell>
                <Table.TextHeaderCell>
                    Valor
            </Table.TextHeaderCell>
            </Table.Head>
            {transactions && <Table.VirtualBody height={240}>
                {transactions.map(transaction => (
                    <Table.Row key={transaction.transactionId} isSelectable >
                        <Table.TextCell>{transaction.transactionId}</Table.TextCell>
                        {/* <Table.TextCell>{transaction.amount}</Table.TextCell> */}
                        <Table.TextCell>{format(
                            new Date(transaction.createdAt),
                            'DD/MM/YY'
                        )}</Table.TextCell>
                        <Table.TextCell isNumber>
                            {transaction.amount}
                        </Table.TextCell>
                    </Table.Row>
                ))}
            </Table.VirtualBody>}
        </Table>
    }
}