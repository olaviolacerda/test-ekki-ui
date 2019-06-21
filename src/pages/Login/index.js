import React, {
    Component
} from 'react';
import api from '../../services/api'

import logo from '../../assets/main.svg'
import './styles.css'

export default class Login extends Component {
    state = {
        cpf: ''
    }

    handleSubmit = async e => {
        e.preventDefault()

        const response = await api.post('login', {
            cpf: this.state.cpf
        })

        this.props.history.push(`/home/${response.data.user.id}`)

    }

    handleInputChange = e => {
        this.setState({ cpf: e.target.value })
    }

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="Ekki Bank" />
                    <input
                        type="text"
                        placeholder="Insira o CPF"
                        value={this.state.cpf}
                        onChange={this.handleInputChange} />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}