import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AccountInfo from './AccountInfo'

export default class MenuExampleBasic extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logOut = () => {
        sessionStorage.removeItem('EkkiBank::User')

        window.location.pathname = '/login'
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu borderless compact fixed={"top"} >
                    <Menu.Item
                        as={Link}
                        name='resumo'
                        to="/"
                        active={activeItem === 'resumo'}
                        onClick={this.handleItemClick}
                    >
                        Resumo
        </Menu.Item>

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
                        Sair
        </Menu.Item>

                </Menu>
                <AccountInfo />
            </div>
        )
    }
}