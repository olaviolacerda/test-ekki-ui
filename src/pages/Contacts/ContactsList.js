import React from 'react';

import { List, Segment } from 'semantic-ui-react'
import DeleteContactModal from '../../components/DeleteContactModal'
import TransactionModal from '../../components/TransactionModal'

const ContactsList = ({ contacts }) => <List verticalAlign='middle'>
    {contacts.map(contact => {
        console.log(contact)
        return <List.Item key={contact.contactId}>
            <List.Item>
                <Segment clearing >
                    <List.Header>{contact.nickname}</List.Header>
                    <List.Content style={{ fontStyle: 'italic' }}>({contact.realName})</List.Content>
                    <List.Content>{contact.phone}</List.Content>
                    <List.Content floated='right' style={{ marginTop: 2, marginBottom: 2 }}>
                        <DeleteContactModal userName={contact.nickname} contactId={contact.contactId} />
                    </List.Content>
                    <List.Content floated='right' style={{ marginTop: 2, marginBottom: 2 }}>
                        <TransactionModal selectedContact={contact} />
                    </List.Content>
                </Segment>
            </List.Item>
        </List.Item>
    })}
</List>



export default ContactsList
