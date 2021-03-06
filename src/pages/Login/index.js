import React, {
    Component
} from 'react';
import api from '../../services/api'


import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import { Button, Form, Header, Image } from 'semantic-ui-react'

import { ToastContainer, toast } from 'react-toastify';


import logo from '../../assets/login.svg'

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
            return false
        }

        await api.post('login', {
            cpf: this.state.cpf
        }).then(resp => {
            if (resp.data != null) {
                sessionStorage.setItem('EkkiBank::User', JSON.stringify(resp.data))
                this.props.history.push(`/transactions`)
            } else {
                this.notify('Usuário não encontrado');
            }
        }).catch(error => this.notify(error.message))

    }

    handleInputChange = e => {
        this.setState({ cpf: e.target.value })
    }

    render() {
        return (
            <DefaultLayout header verticalAlign="middle" rowMargin='-100px' textAlign="center" gridStyles={{ height: '100vh' }
            } >
                <ToastContainer />
                <Header
                    as='h1'
                    content='Ekki Bank'
                    subheader='O melhor lugar para você transferir dinheiro para seus amigos'
                />
                <Image src={logo} size="small" centered alt="Ekki Bank" />
                <Header as='h3' textAlign='center'>
                    Fazer login
                </Header>
                <Form style={{ maxWidth: 320, marginLeft: 'auto', marginRight: 'auto' }} size='large' onSubmit={this.handleSubmit}>
                    <Form.Input
                        fluid
                        placeholder='Insira seu CPF'
                        type='text'
                        value={this.state.cpf}
                        onChange={this.handleInputChange}
                        maxLength="11"
                        error={this.state.error}
                    />

                    <Button type="submit" primary fluid size='large'>
                        Entrar
</Button>
                </Form>

                Ainda não possuí conta? <Link to="/">Criar</Link>
            </DefaultLayout >
        );
    }
}
