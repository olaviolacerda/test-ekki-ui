import React, { Component } from 'react';
import api from '../services/api'

import { Link } from 'react-router-dom'
import { Form, Message, Modal, Button, Label } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify'

export default class TransactionModal extends Component {
    state = {
        account: {},
        contacts: [],
        open: false,

    }

    async componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'))

        if (user) {
            const account = await api.get(`users/${user.id}/account`)
            const contacts = await api.get(`users/${user.id}/contacts`)
            this.setState({
                account: account.data,
                contacts: this.formatContacts(contacts.data),
            })
        }
    }

    formatContacts = (contacts) => {
        return contacts.map(contact => ({
            key: contact.contactId,
            value: contact.userId,
            text: contact.nickname,
        }))
    }

    handleAmountChange = (e, data) => this.setState({ amount: data.value })

    handleUserChange = (e, data) => this.setState({ toUserId: data.value })

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.amount == undefined || this.state.toUserId == undefined) {
            return false;
        }

        const body = {
            fromUserId: this.state.account.userId,
            toUserId: this.state.toUserId,
            amount: Number(this.state.amount)
        }

        api.post('transactions', body)
            .then(resp => {
                this.setState({ open: false })
                toast.success(resp.data.message)
            })
            .catch(err => {
                this.setState({ open: false })
                console.log(err)
                toast.error('Não realizada, saldo insuficiente.');
            })
    }

    render() {
        const { open, account, contacts } = this.state

        return <div>
            {contacts.length > 0 ? (<Modal open={open} size={'small'} dimmer="blurring"
                trigger={<Button color="green" onClick={() => this.setState({ open: true })}>Realizar nova transferência</Button>}
            >
                <Modal.Header>Nova transferência</Modal.Header>
                <Modal.Content>
                    {account.balance == 0 && <Message
                        warning
                        header='Atenção: Você usará o limite para realizar essa transferência'
                        content='Seu saldo é R$ 0,00. Então você usará seu limite, se disponível.'
                    />}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Dropdown
                            placeholder='Selecione o contato'
                            fluid
                            search
                            selection
                            label="Contatos"
                            options={contacts}
                            onChange={this.handleUserChange}
                        />
                        <Form.Input error={this.state.error} labelPosition='left' type='text' fluid label='Valor' name="amount" placeholder='Digite o valor' onChange={this.handleAmountChange}>
                            <Label basic>$</Label>
                            <input />
                        </Form.Input>

                        <Form.Group>
                            <Form.Button color="red" onClick={() => this.setState({ open: false })}>Cancelar</Form.Button>
                            <Form.Button color="green" type="submit">Transferir</Form.Button>
                        </Form.Group>

                    </Form>

                </Modal.Content>


            </Modal >) :
                (<Message
                    warning
                    header='Adicione contatos e realize transferências'
                    content={['Para realizar uma transferência, adicione contatos.', ' ', <Link to="/contacts">Adicionar contatos</Link>]}
                >
                </Message>)}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange={false}
                draggable
                pauseOnHover
            />
        </div>

    }
}
