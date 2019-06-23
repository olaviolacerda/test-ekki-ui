import React, { Component } from 'react';
import api from '../../services/api'
import NumberFormat from 'react-number-format';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DefaultLayout from '../../components/DefaultLayout'
import { Image, Item } from 'semantic-ui-react'
import Transactions from '../Transactions';
import Contacts from '../Contacts'
import Account from '../../components/Account';

export default class Home extends Component {
    state = {
        account: {}
    }

    async componentDidMount() {
        const userId = JSON.parse(sessionStorage.getItem('EkkiBank::User')).id;

        const account = await api.get(`users/${userId}/account`)

        this.setState({
            account: account.data
        })

    }

    render() {
        const { account } = this.state
        const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        return (<DefaultLayout>
            <Account>
                <span>Seu saldo</span>
                <span><NumberFormat value={Number(account.balance)} displayType={'text'} decimalScale={2} fixedDecimalScale thousandSeparator={'.'} decimalSeparator={','} prefix={'R$'} /></span>
                <span>Limite <NumberFormat value={Number(account.limit)} displayType={'text'} decimalScale={2} fixedDecimalScale thousandSeparator={'.'} decimalSeparator={','} prefix={'R$'} /></span>
                <span>Última atualização há {distanceInWords(account.updatedAt, new Date(), { locale: pt })}</span>
            </Account>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

                    <Item.Content>
                        <Item.Header>Arrowhead Valley Camp</Item.Header>
                        <Item.Meta>
                            <span className='price'>$1200</span>
                            <span className='stay'>1 Month</span>
                        </Item.Meta>
                        <Item.Description>{paragraph}</Item.Description>
                    </Item.Content>
                </Item>

            </Item.Group>
        </DefaultLayout>)
    }
}


// import { Image, Item } from 'semantic-ui-react'

// const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

// const ItemExampleMetadata = () => (

// )