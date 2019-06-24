import React, { Component } from 'react';
import api from '../../services/api'

import { Header, Container, Segment, Message, Dropdown, Button, Tab } from 'semantic-ui-react'
import ContactsList from './ContactsList'
import UsersList from './UsersList'


import DefaultLayout from '../../components/DefaultLayout'

export default class Contacts extends Component {

    state = {
        contacts: [],
        users: [],
        user: []
    }

    async componentDidMount() {
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'));

        const contacts = await api.get(`users/${user.id}/contacts`)

        const users = await api.get(`users`)

        this.setState({
            contacts: contacts.data,
            users: users.data,
            user: user.id
        })
    }

    handleChange = (e, { value }) => this.setState({ value })

    formatUser = (users) => {
        return users.map(user => {
            return {
                key: `${user.id}`,
                name: user.name,
                id: user.id,
            }
        })
    }

    compareUsersWithContacts = (users, contacts, userId) => {
        const contactsIds = contacts.map(contact => contact.userId)

        const usersWithouLogged = users.filter(user => user.id != userId && !contactsIds.includes(user.id))

        return usersWithouLogged;
    }


    render() {
        const { contacts, users, user } = this.state

        const panes = [
            {
                menuItem: 'Meus Contatos', render: () =>
                    <Tab.Pane attached={false}>{contacts.length > 0 ? <ContactsList contacts={contacts} /> : <Message info>
                        <Message.Header>Sua lista de contatos está vazia :( </Message.Header>
                    </Message>}</Tab.Pane>
            },
            {
                menuItem: 'Usuários na plataforma', render: () =>
                    <Tab.Pane attached={false}>
                        <UsersList users={this.compareUsersWithContacts(users, contacts, user)} />
                    </Tab.Pane>
            },
        ]
        return <DefaultLayout>
            <Container style={{ marginTop: '5em' }}>
                <Header as='h2'>
                    Contatos
                    <Header.Subheader>Administre seus contatos, você pode realizar transferências por aqui ou adicionar novos contatos</Header.Subheader>
                </Header>
                {contacts && <Tab menu={{ secondary: true }} panes={panes} />}
            </Container>
        </DefaultLayout>
    }
}


