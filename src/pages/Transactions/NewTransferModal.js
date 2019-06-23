import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

import Contacts from '../Contacts'

const NewTransferModal = () => (
    <Modal size="mini" dimmer="blurring" trigger={<Button circular color="green">Transferir</Button>} centered={false}>
        <Modal.Header centered>Escolha um contato para transferir</Modal.Header>
        <Modal.Content scrolling>
            <Contacts />
        </Modal.Content>
    </Modal>
)

export default NewTransferModal