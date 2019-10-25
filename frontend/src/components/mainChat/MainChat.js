import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectToSocket } from '../../redux/actions/actions';
import MainInput from '../mainInput/MainInput';
import './MainChat.css';
import io from 'socket.io-client';

const MainChat = () => {
    const listOfMessages = useSelector(state => state.getDataReducer.chatMessages);
    const connected = useSelector(state => state.getDataReducer.connected);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectToSocket(io))
    }, []);

    return (
        <React.Fragment>
            {connected && <div className="connected">New user join to chat</div>}
            <div className='messages-block-wrapper'>
                <div className="messages-block">
                    {listOfMessages && listOfMessages.map((message, index)=> {
                        if (message.status === 'alien') {
                            return <div key={index} className='alien'>
                                <div>Sender:</div>
                                <div style={{marginLeft: '20px'}}>{message.text}</div>
                                <div className="files">
                                    <img src={message.file} />
                                </div>
                            </div>
                        }
                        
                        return <div key={index} className='own'>
                            <div>You:</div>
                            <div style={{marginLeft: '20px'}}>{message.text}</div>
                            <div className="files">
                                <img src={message.file} />
                            </div>
                        </div>          
                    })} 
                </div>
            </div>
            <MainInput />
        </React.Fragment>
    )
}

export default MainChat; 
