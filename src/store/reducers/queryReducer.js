const queryReducer = (state = {}, action) => {
    console.log('queryReducer', action.payload)
    switch (action.type) {
        case 'ADD_HISTOGRAM':
            if (action.payload[0].length === 0) {
                return { ...state, histogram: {} };
            }
            return {
                ...state,
                histogram: {
                    totalDocuments: action.payload[0][0].data,
                    riskFactors: action.payload[0][0].data,
                },
                histIsLoading: action.payload[1]
            }
        case 'IS_LOADING':
            return {
                ...state,
                histIsLoading: action.payload
            }
        case 'ADD_DOC_IDS':
            return {
                ...state,
                docIDs: action.payload
            }
        case 'ADD_DOCUMENTS':
            return {
                ...state, docs: [...state.docs, ...action.payload]
            } 
                 
        case 'CLEAR_QUERY_REDUCER':
            return {docs: []}

        default: {
            return state;
        }
    }
}

export default queryReducer;