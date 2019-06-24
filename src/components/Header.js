import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AccountInfo from './AccountInfo'
import { ToastContainer, toast } from 'react-toastify';
import socket from 'socket.io-client'
import { Icon } from 'semantic-ui-react'
export default class MenuExampleBasic extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logOut = () => {
        sessionStorage.removeItem('EkkiBank::User')

        window.location.pathname = '/login'
    }

    componentDidMount() {
        this.subscribeToTransactionEvents()
    }

    subscribeToTransactionEvents = async () => {
        const io = socket('https://ekki-api-olavio.herokuapp.com')
        const user = JSON.parse(sessionStorage.getItem('EkkiBank::User'))


        await io.on(`transaction-${user.cpf}`, data => {
            if (data.toUserId == user.id)
                toast.info(`Você recebeu uma transferência no valor de R$${data.amount}`)
        })
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu borderless fixed={"top"} >
                    <Menu.Item color="grey">Ekki Bank</Menu.Item>
                    <Menu.Item as={Link} name='extrato' to="/transactions" active={activeItem === 'extrato'} onClick={this.handleItemClick}>
                        Transferências
        </Menu.Item>

                    <Menu.Item
                        as={Link}
                        name='contacts'
                        to="/contacts"
                        active={activeItem === 'contacts'}
                        onClick={this.handleItemClick}
                    >
                        Contatos
        </Menu.Item>

                    <Menu.Item
                        name='logout'
                        position='right'
                        onClick={this.logOut}
                    >
                        <Icon name='log out' /> Sair
        </Menu.Item>

                </Menu>
                <AccountInfo />
                <ToastContainer />
            </div>
        )
    }
}