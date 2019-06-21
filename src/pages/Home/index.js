import React, { Component } from 'react';
import {
    format, parseISO
} from 'date-fns';

import api from '../../services/api'

export default class Home extends Component {
    state = {
        transactions: []
    }

    async componentDidMount() {
        const user = this.props.match.params.id
        const response = await api.get(`accounts/${user}/extract`)


        this.setState({ transactions: response.data })

    }

    render() {
        const { transactions } = this.state

        return <div>FFFF</div>
    }
}
