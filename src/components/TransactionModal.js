import React, { Component } from 'react';
import api from '../services/api'

import { Link } from 'react-router-dom'
import { Form, Icon, Message, Segment, Modal, Button, Label } from 'semantic-ui-react'
import { toast } from 'react-toastify'

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
            if (this.props.selectedContact) {
                this.setState({
                    toUserId: this.props.selectedContact.userId
                })
            }
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
        const { selectedContact } = this.props
        return <div>
            {contacts.length > 0 || selectedContact ? (<Modal closeOnDimmerClick={true} open={open} size={'small'} dimmer="blurring"
                trigger={<Button icon labelPosition='right' color="green" onClick={() => this.setState({ open: true })}><Icon inverted name='arrow right' />Realizar nova transferência</Button>}
            >
                <Modal.Header>Nova transferência</Modal.Header>
                <Modal.Content>
                    {account.balance == 0 && <Message
                        warning
                        header='Atenção: Você usará o limite para realizar essa transferência'
                        content='Seu saldo é R$ 0,00. Então você usará seu limite, se disponível.'
                    />}
                    <Form >
                        {selectedContact ?
                            (
                                <Form.Input
                                    type='text'
                                    fluid
                                    disabled
                                    label='Contato'
                                    value={selectedContact.nickname} />
                            ) :
                            (<Form.Dropdown
                                placeholder='Selecione o contato'
                                fluid
                                search
                                selection
                                label="Contatos"
                                options={contacts}
                                onChange={this.handleUserChange}
                            />)}
                        <Form.Input error={this.state.error} labelPosition='left' type='text' fluid label='Valor' name="amount" placeholder='Digite o valor com ponto (e.g 1435.93)' onChange={this.handleAmountChange}>
                            <Label basic>$</Label>
                            <input />
                        </Form.Input>



                    </Form> <Segment basic clearing>
                        <Form.Button icon labelPosition='right' floated="right" color="green" type="submit" onClick={this.handleSubmit}><Icon inverted name='check' />Transferir</Form.Button>
                        <Form.Button icon labelPosition='right' floated="right" secondary inverted onClick={() => this.setState({ open: false })}><Icon name='remove' />Cancelar</Form.Button>
                    </Segment>

                </Modal.Content>


            </Modal >) :
                (<Message
                    warning
                    header='Adicione contatos e realize transferências'
                    content={['Para realizar uma transferência, adicione contatos.', ' ', <Link to="/contacts">Adicionar contatos</Link>]}
                >
                </Message>)}
        </div>

    }
}
