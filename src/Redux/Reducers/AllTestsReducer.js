let initialState = []

const AllTestsReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_ALL_TESTS':
            {
                state=action.payload;
                //console.log(state,"GET_ALL_TESTS state")
                return [...state];
            }
        default:
             return state;
    }
}

export default AllTestsReducer;