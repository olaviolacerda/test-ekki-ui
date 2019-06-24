import React, { Component } from 'react';
import api from '../services/api'

import { Segment, Icon, Message, Modal, Button } from 'semantic-ui-react'
import { toast } from 'react-toastify'

export default class TransactionModal extends Component {
    state = {
        open: false,
    }

    deleteContact = async (e) => {
        e.preventDefault()

        await api.delete(`contacts/${this.props.contactId}`)
            .then(resp => {
                this.setState({ open: false })
                console.log(resp)
                toast.success(resp.data.message, {
                    autoClose: 1500,
                    onClose: () => window.location.reload()
                })
            }).catch(err => {
                console.log(err.message)
                toast.error('Contato não removido.')
            })
    }

    render() {
        const { open } = this.state
        const { userName } = this.props

        return <div>
            <Modal open={open} size={'tiny'} dimmer="blurring"
                trigger={
                    <Button labelPosition='right' color="red" icon onClick={(e) => this.setState({ open: true }, console.log(e))}>
                        <Icon inverted name='user remove' />Remover
                    </Button>
                }
            >
                <Modal.Content>

                    <Segment basic clearing>
                        <Message
                            negative
                            header={`Deseja remover ${userName} da sua lista de contatos?`}
                            content={`Você pode adicionar novamente na aba Usuários na plataforma`}
                        />
                        <Button icon labelPosition='right' color="red" floated="right" type="submit" onClick={this.deleteContact}><Icon inverted name='user remove' />Remover</Button>
                        <Button icon labelPosition='right' floated="right" inverted color="blue" onClick={() => this.setState({ open: false })}><Icon name='remove' />Cancelar</Button>
                    </Segment>
                </Modal.Content>
            </Modal>

        </div>
    }
}
