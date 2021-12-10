let initialState = []

const GetCalculatedResultsReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_CALCULATED_RESULTS':
            {
                state=action.payload;
               // console.log(state,"GET_CALCULATED_RESULTS state")
                return [...state];
            }
       
        case 'CLEAR_GET_STUDENT_TEST_RESULTS':
            {
                state = {}
                return [...state];
            }
        default:
             return [...state];
    }
}

export default GetCalculatedResultsReducer;