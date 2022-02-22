let initialState = []

const GetSubjectsReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_SUBJECTS':
            {
                state=action.payload;
                return [...state];
            }
       
        case 'CLEAR_GET_SUBJECTS':
            {
                state = {}
                return [...state];
            }
        default:
             return [...state];
    }
}

export default GetSubjectsReducer;