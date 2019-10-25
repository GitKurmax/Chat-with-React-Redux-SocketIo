import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectToSocket } from '../../redux/actions/actions';
import MainInput from '../mainInput/MainInput';
import ConnectedUsers from '../connectedUsers/ConnectedUsers'
import './MainChat.css';
import io from 'socket.io-client';

const MainChat = () => {
    const listOfMessages = useSelector(state => state.getDataReducer.chatMessages);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectToSocket(io))
    }, []);

    return (
        <React.Fragment>
            <div className = "main-content-wrapper"style = {{height: '100%'}}>
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
                <ConnectedUsers />
            </div>
            <MainInput />
        </React.Fragment>
    )
}

export default MainChat; 
