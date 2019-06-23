import React, { Component } from 'react';

import DefaultLayout from '../../components/DefaultLayout'
import { Item } from 'semantic-ui-react'

export default class Home extends Component {
    state = {
        account: {}
    }

    render() {
        return (<DefaultLayout>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

                    <Item.Content>
                        <Item.Header>Arrowhead Valley Camp</Item.Header>
                        <Item.Meta>
                            <span className='price'>$1200</span>
                            <span className='stay'>1 Month</span>
                        </Item.Meta>
                    </Item.Content>
                </Item>

            </Item.Group>
        </DefaultLayout>)
    }
}

