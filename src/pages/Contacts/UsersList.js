import React from 'react';

import { List, Button } from 'semantic-ui-react'

const UsersList = ({ users }) => <List divided verticalAlign='middle'>
    {users.map(user => {
        return <List.Item key={user.id}>
            <List.Item>
                <List.Header>{user.name}</List.Header>
                <List.Content floated='right'>
                    {user.contact ?
                        <Button >Transferir</Button>
                        :
                        <Button>Adicionar</Button>
                    }
                </List.Content>
                <List.Content>{user.phone}</List.Content>
            </List.Item>
        </List.Item>
    })}
</List>



export default UsersList;