import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emitMessage, changeValue, addMessage, sendData } from '../../redux/actions/actions';
import './MainInput.css';

const MainInput = () => {
    const messageText = useSelector(state => state.getDataReducer.message);
    const dispatch = useDispatch();

    const sendMessage = (e) => {
        if (e.key === 'Enter') {
            dispatch(emitMessage({status: 'alien', text: messageText, file: null}));
            dispatch(addMessage({status: 'my', text:messageText, file:null}));
        }  
    }

    const changeInputValue = (e) => {
        dispatch(changeValue(e.target.value));
    }

    const sendFile = (e) => {
        dispatch(emitMessage({status: 'alien', text:'file', file:e.target.files[0]}));
        var reader = new FileReader();
        reader.onload = function(e) {
            dispatch(addMessage({status: 'my', text: 'file', file: e.target.result}));
         };
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className="input-block">
            <div className="main-input-wrapper">
                <label className="choose-file" htmlFor="input-file" />
                <input id="input-file" type="file" onChange={(e) => {
                        sendFile(e);
                        e.target.value = null;
                    }} />
                <input className='main-input'
                    value = {messageText}
                    onChange={(e)=> changeInputValue(e)}
                    onKeyPress={(e) => sendMessage(e)}>
                </input>
            </div>
        </div>
    )
}

export default MainInput
