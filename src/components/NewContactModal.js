import React, { Component } from 'react';
import api from '../services/api'

import { Form, Icon, Modal, Button, Segment } from 'semantic-ui-react'
import { toast } from 'react-toastify'

export default class NewContact extends Component {
    state = {
        nickname: '',
        open: false,

    }


    handleChange = (e, data) => this.setState({ nickname: data.value })


    handleSubmit = (e) => {
        e.preventDefault()

        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'))

        if (this.state.nickname.length === 0) {
            this.setState({ error: true })
            return false;
        }

        const body = {
            relatedUserId: this.props.user.id,
            relatingUserId: user.id,
            nickname: this.state.nickname
        }

        api.post('contacts', body)
            .then(resp => {
                this.setState({ open: false })
                toast.success(resp.data.message, {
                    autoClose: 1500,
                    onClose: () => window.location.reload()
                })
            }).catch(err => {
                toast.error('Erro ao criar contato.')
            })


    }

    render() {
        const { open, nickname } = this.state
        const { phone, name } = this.props.user

        return <div>
            <Modal closeOnDimmerClick={true} open={open} size={'mini'} dimmer="blurring"
                trigger={<Button icon labelPosition='right' secondary type="submit" onClick={() => this.setState({ open: true })}><Icon inverted name='user plus' />Adicionar</Button>}
            >
                <Modal.Header>Novo contato</Modal.Header>
                <Modal.Content>
                    <Form >
                        <Form.Input
                            error={this.state.error}
                            type='text'
                            fluid
                            label='Apelido'
                            name="nickname"
                            placeholder='e.g Colega'
                            onChange={this.handleChange}
                            value={nickname} />
                        <Form.Input
                            type='text'
                            fluid
                            disabled
                            label='Nome'
                            value={name} />
                        <Form.Input
                            type='text'
                            fluid
                            disabled
                            label='Telefone'
                            value={phone} />

                    </Form>
                    <Segment clearing basic>
                        <Form.Button icon labelPosition='right' floated="right" color="green" type="submit" onClick={this.handleSubmit}><Icon inverted name='user plus' />Adicionar</Form.Button>
                        <Form.Button icon labelPosition='right' floated="right" secondary inverted onClick={() => this.setState({ open: false })}><Icon name='remove' />Cancelar</Form.Button>
                    </Segment>

                </Modal.Content>


            </Modal >
        </div>

    }
}
