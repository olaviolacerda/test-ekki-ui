import React, { Component } from 'react';
import api from '../../services/api'

import { Header, Segment, Grid } from 'semantic-ui-react'
import ContactsList from './ContactsList'

export default class Contacts extends Component {

    state = {
        contacts: []
    }

    async componentDidMount() {
        const userId = JSON.parse(sessionStorage.getItem('EkkiBank::User')).id;

        const contacts = await api.get(`users/${userId}/contacts`)

        this.setState({
            contacts: contacts.data,
        })
    }

    render() {
        const { contacts } = this.state
        return <Grid style={{ height: '100vh' }} >
            <Grid.Column >
                <Segment>
                    <Header as='h2'>
                        Contatos
                    <Header.Subheader>Administre seus contatos</Header.Subheader>
                    </Header>
                    {contacts && <ContactsList contacts={contacts} />}
                </Segment>
            </Grid.Column>
        </Grid>

    }
}


