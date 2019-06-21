import React, {
    Component
} from 'react';
import api from '../../services/api'

import Input from '4all-ui/components/Input';
import Button from '4all-ui/components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import logo from '../../assets/main.svg'
import './styles.css'

export default class Login extends Component {
    state = {
        cpf: ''
    }

    notify = (message) => toast.error(`Error: ${message}`, { position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        })

    handleSubmit = async e => {
        e.preventDefault()

        await api.post('login', {
            cpf: this.state.cpf
        }).then(resp => {
            console.log(resp)
            this.props.history.push(`/home/${resp.data.user.id}`)
        }).catch(error => this.notify(error.message))

    }

    handleInputChange = e => {
        this.setState({ cpf: e.target.value })
    }

    render() {
        return (
            <div id="main-container">
                <ToastContainer />
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="Ekki Bank" />
                    <h1>Ekki Bank</h1>
                    <Input
                      name="primary"
                      value={this.state.cpf}
                      onChange={this.handleInputChange}
                      placeholder="Insira o CPF"
                    />
                    <Button type="submit">Entrar</Button>
                </form>
            </div>
        );
    }
}
