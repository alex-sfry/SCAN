const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TOKEN': 
            return {
                token: action.payload[0],
                isLoading: action.payload[1]
            }
        case 'ADD_INFO':
            return {
                ...state,
                info: action.payload[0],
                isLoading: action.payload[1]
            }
        case 'ADD_LOADING_STATUS':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'CLEAR_LOGIN_STATE' :
            return {
                
            }
        default: {
            return state;
        }
    } 
}

export default loginReducer