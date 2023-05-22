const rootReducer = (state = [], action) => {
    switch (action.type) {
        case 'WRITE': 
            return [
                ...state, action.payload
            ]
        default: {
            return state;
        }
    }
    
}

export default rootReducer