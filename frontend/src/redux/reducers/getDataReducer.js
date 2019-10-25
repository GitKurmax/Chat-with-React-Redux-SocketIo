const initialState = {
    message: '',
    chatMessages: [],
    users: []
}

export default function getDataReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            const newListOfMessaghes = [{
                status: action.data.status, 
                text: action.data.text, 
                file: action.data.file || null
            }, ...state.chatMessages]
            return {
                ...state,
                message: '',
                chatMessages: newListOfMessaghes
            }
        case 'CHANGE_INPUT_VALUE': 
        return {
            ...state,
            message: action.data
        }
        case 'RECEIVE_FILE': 
        return {
            ...state,
            files: action.data
        }

        case 'USER_CONNECTED':
        return {
            ...state,
            users: [...action.user]
        }

        case 'USER_DISCONNECTED':
        return {
            ...state,
            users: [...action.user]
        }
    }
     return state;
}