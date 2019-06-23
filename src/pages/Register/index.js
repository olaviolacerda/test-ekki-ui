import React, {
    Component
} from 'react';
import api from '../../services/api'

import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/DefaultLayout'
import { Button, Form, Header, Image } from 'semantic-ui-react'

import { ToastContainer, toast } from 'react-toastify';


import logo from '../../assets/main.svg'

export default class Register extends Component {
    state = {
        name: '',
        cpf: '',
        phone: '',
        loading: false
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

        if (this.state.name.length == 0) {
            this.setState({ errorName: true })
            return false
        }

        if (this.state.cpf.lenght < 11) {
            this.setState({ errorCpf: true })
            return false
        }

        if (this.state.phone.lenght == 0) {
            this.setState({ erroPhone: true })
            return false
        }

        this.setState({ loading: true })

        await api.post('users', {
            cpf: this.state.cpf,
            name: this.state.name,
            phone: this.state.phone
        }).then(resp => {
            if (resp.data != null) {
                this.setState({ loading: true })
                toast.success('Cadastrado com sucesso! Faça login novamente. :)', {
                    onClose: () => this.props.history.push(`/`)
                })
            } else {
                this.notify('Algo deu errado no seu cadastro, revise suas informações.');
            }
        }).catch(error => { this.notify(error.message); this.setState({ loading: false }) })

    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { loading } = this.state
        return (
            <DefaultLayout header verticalAlign="middle" rowMargin='-100px' textAlign="center" gridStyles={{ height: '100vh' }
            } columnStyles={{ maxWidth: 320 }}>
                <ToastContainer />

                <Image src={logo} size="small" centered alt="Ekki Bank" />
                <Header as='h1' textAlign='center'>
                    Cadastro Ekki Bank
</Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                    <Form.Input
                        fluid
                        placeholder='Insira seu Nome'
                        type='text'
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        error={this.state.errorName}
                    />
                    <Form.Input
                        fluid
                        placeholder='Insira seu CPF'
                        type='text'
                        name="cpf"
                        value={this.state.cpf}
                        onChange={this.handleInputChange}
                        maxLength="11"
                        error={this.state.errorCpf}
                    />
                    <Form.Input
                        fluid
                        placeholder='Insira seu Telefone'
                        type='text'
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleInputChange}
                        error={this.state.errorPhone}
                    />
                    <Button loading={loading} type="submit" primary fluid size='large'>
                        Criar
</Button>
                </Form>
                Já possuí conta? <Link to="/login">Entrar</Link>
            </DefaultLayout >
        );
    }
}
