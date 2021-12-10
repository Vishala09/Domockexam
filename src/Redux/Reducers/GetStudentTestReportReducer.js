let initialState = []

const ReportsReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_STUDENT_TEST_REPORT':
            {
                state=action.payload;
              //  console.log(state,"GET_STUDENT_TEST_REPORT state")
                return [...state];
            }
       
        case 'CLEAR_GET_STUDENT_TEST_REPORT':
            {
                state = {}
                return [...state];
            }
        default:
             return [...state];
    }
}

export default ReportsReducer;