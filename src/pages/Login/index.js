import React, {
    Component
} from 'react';
import api from '../../services/api'

import { Button, Form, Grid, Header, Image } from 'semantic-ui-react'

import { ToastContainer, toast } from 'react-toastify';


import logo from '../../assets/main.svg'

export default class Login extends Component {
    state = {
        cpf: ''
    }

    notify = (message) => toast.error(`Error: ${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })

    handleSubmit = async e => {
        e.preventDefault()

        if (this.state.cpf.length < 11) {
            this.setState({ error: true })
            return
        }

        await api.post('login', {
            cpf: this.state.cpf
        }).then(resp => {
            sessionStorage.setItem('EkkiBank::User', JSON.stringify(resp.data))
            this.props.history.push(`/home/${resp.data.id}`)
        }).catch(error => this.notify(`CPF inexistente ou com erro.`))

    }

    handleInputChange = e => {
        this.setState({ cpf: e.target.value })
    }

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <ToastContainer />
                    <Image src={logo} size="medium" centered alt="Ekki Bank" />
                    <Header as='h2' color='teal' textAlign='center'>
                        Ekki Bank
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Form.Input
                            fluid
                            placeholder='Insira seu CPF'
                            type='text'
                            value={this.state.cpf}
                            onChange={this.handleInputChange}
                            maxLength="11"
                            error={this.state.error}
                        />

                        <Button type="submit" color='teal' fluid size='large'>
                            Entrar
                  </Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}
