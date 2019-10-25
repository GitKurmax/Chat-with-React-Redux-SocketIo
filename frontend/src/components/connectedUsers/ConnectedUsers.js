import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ConnectedUsers.css';

function ConnectedUsers() {
    const users = useSelector(state => state.getDataReducer.users);
    console.log(users);
    return (
        <div className="connected-users-wrapper">
            <div>
                <h3>Users activity</h3>
                <div>
                    <span>Users in chat: </span>
                    {users.length !== 0 && <span>{users.length}</span>}
                </div>
                <ul>
                    {users && users.map((user, index) => {
                        return <li key={index}>User {index + 1}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ConnectedUsers;