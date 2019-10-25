export const CHANGE_MESSAGE = 'ADD_MESSAGE';
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RECEIVE_FILE = 'RECEIVE_FILE';
export const USER_CONNECTED = 'USER_CONNECTED';

let socket;

export function connectToSocket(io) {
    return (dispatch) => {
        socket = io('http://localhost:3100');
        socket.on('new user connected', () => {
            dispatch(userConnected());
        });

        socket.on('connect', () => {
            socket.emit('connected');
        });

        socket.on('message', function(msg) {
            if (msg.message.file) {
                const bytes = new Uint8Array(msg.message.file);
                const blob = new Blob([bytes.buffer]);
                const reader = new FileReader();
                reader.onload = function(e) {
                    dispatch(addMessage({status: msg.message.status, text: msg.message.text, file:e.target.result}));
                };
                reader.readAsDataURL(blob);
            } else {
                dispatch(addMessage(msg.message));
            }
        });
        
        socket.on('files', function(data) {
            const bytes = new Uint8Array(data.data);
            const blob = new Blob([bytes.buffer]);
            const reader = new FileReader();
                reader.onload = function(e) {
                    dispatch(receiveFile(e.target.result));
                };
                reader.readAsDataURL(blob);
        });        
    }
}

export function emitMessage(message) {
    return (dispatch) => {
        socket.emit('message', message);
    }
}

export function changeValue(message) {
    return  {
        type: CHANGE_INPUT_VALUE,
        data: message
    }
}

export function addMessage(message) {
    return  {
        type: ADD_MESSAGE,
        data: {
            status: message.status,
            text: message.text,
            file: message.file
        }
    }
}

export function sendData(data) {
    return (dispatch) => {
        socket.emit('files', data);
    }
}

export function receiveFile(data) {
    return  {
        type: RECEIVE_FILE,
        data
    }
}

export function userConnected() {
    return  {
        type: USER_CONNECTED,
    }
}