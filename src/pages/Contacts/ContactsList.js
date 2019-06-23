import React from 'react';

import { List, Dropdown, Button } from 'semantic-ui-react'

const options = [
    { key: 'edit', text: 'Editar', value: 'edit' },
    { key: 'delete', text: 'Remover', value: 'delete' },
]


const ContactsList = ({ contacts }) => <List divided verticalAlign='middle'>
    {contacts.map(contact => {
        return <List.Item key={contact.contactId}>
            <List.Item>
                <List.Header>{contact.nickname}</List.Header>
                <List.Content floated='right'>
                    <Dropdown floating options={options} text='Ações' />
                </List.Content>
                <List.Content>{contact.realName}</List.Content>
                <List.Content>{contact.phone}</List.Content>

            </List.Item>
        </List.Item>
    })}
</List>



export default ContactsList;
