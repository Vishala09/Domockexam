let initialState = "";

const SearchReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'SET_SEARCH_DATA':
            {
                state=action.payload.toLowerCase();
                console.log('SET_SEARCH_DATA',state)
                return state;
            }

        case 'GET_SEARCH_DATA':
            {
                return state;
            }
       
        case 'CLEAR_SEARCH_DATA':
            {
                state = {}
                return state;
            }
        default:
             return state;
    }
}

export default SearchReducer;