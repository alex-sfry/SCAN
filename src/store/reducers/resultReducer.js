const resultReducer = (state = {}, action) => {
    console.log('resultReducer', action)
    switch (action.type) {
        case 'ADD_SLIDES':
          return {
                ...state,
                slides: action.payload
            }
        case 'ADD_SLIDES_TO_SHOW':
            return {
                ...state,
                slidesToShow: action.payload
            }
        // case '3':
        //     return {
        //         ...state
        //     }
        case 'CLEAR_RESULT_REDUCER':
            return {slides: []}
       
        default: {
            return state;
        }
    }
}

export default resultReducer;
