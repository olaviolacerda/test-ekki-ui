import React from 'react';

import { List, Image, Icon } from 'semantic-ui-react'

const ContactsList = ({ contacts }) => <List divided verticalAlign='middle'>
    <List.Item><List.Content floated='right'>
        <Icon name='arrow right' />
    </List.Content>
        <Icon name='user plus' />
        <List.Content>Transferir para novo contato</List.Content></List.Item>
    {contacts.map(contact =>
        <List.Item>
            <List.Content floated='right'>
                <Icon name='arrow right' />
            </List.Content>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
            <List.Content>{contact.nickname}</List.Content>
        </List.Item>
    )}
</List>;

export default ContactsList;
