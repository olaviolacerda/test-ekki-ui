import React from 'react';

import { List, Segment } from 'semantic-ui-react'
import NewContactModal from '../../components/NewContactModal'

const UsersList = ({ users }) => <List verticalAlign='middle' >
    {users.map(user => {
        return <List.Item key={user.id}>
            <List.Item>
                <Segment clearing ><List.Header>{user.name}</List.Header>
                    <List.Content>{user.phone}</List.Content>
                    <List.Content floated='right'>
                        {user.contact ?
                            null
                            :
                            <NewContactModal user={user} />
                        }
                    </List.Content></Segment>
            </List.Item>
        </List.Item>
    })}
</List>



export default UsersList;