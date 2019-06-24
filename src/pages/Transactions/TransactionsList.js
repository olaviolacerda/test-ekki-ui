import React from 'react';

import NumberFormat from 'react-number-format';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Price from '../../components/Price';


import { Table, Icon, Label } from 'semantic-ui-react'


const statusOptions = [{}, { text: 'Realizada', bg: '#bffaec', color: ' #00ca9b' }, { text: 'Cancelada', bg: '#ffe0e2', color: '#ff5d70' }]

const TransactionsTable = ({ transactions }) => {
  return (
    <Table basic="very" singleLine >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Valor</Table.HeaderCell>
          <Table.HeaderCell>ID</Table.HeaderCell >
          <Table.HeaderCell>Usuário</Table.HeaderCell >
          <Table.HeaderCell >Data</Table.HeaderCell >

        </Table.Row>
      </Table.Header>

      <Table.Body>
        {transactions.map(transaction => {
          const { fromUser, toUser, status, transactionId, addition, amount, createdAt } = transaction

          return <Table.Row key={transactionId}>
            <Table.Cell>

              <Label style={{ backgroundColor: statusOptions[status].bg, color: statusOptions[status].color }} horizontal>
                {statusOptions[status].text}
              </Label>
            </Table.Cell>
            <Table.Cell >

              <Price >
                <Icon color={addition ? 'green' : 'red'} name={addition ? 'arrow up' : 'arrow down'} />{'  '}
                <NumberFormat
                  value={Number(amount)}
                  displayType={'text'}
                  decimalScale={2}
                  fixedDecimalScale
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  prefix={'R$'} />
              </Price>
            </Table.Cell>
            <Table.Cell>
              ID: {transactionId}
            </Table.Cell>
            <Table.Cell  >
              {addition ? fromUser.name : toUser.name}
            </Table.Cell>
            <Table.Cell >
              {format(createdAt, "DD/MM/YY - HH:mm", { locale: pt })}
            </Table.Cell>
          </Table.Row>
        })
        }

      </Table.Body>
    </Table>
  )
}

export default TransactionsTable



