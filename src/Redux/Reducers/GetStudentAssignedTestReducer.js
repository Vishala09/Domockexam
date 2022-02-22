let initialState = []

const GetStudentAssignedTestReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_STUDENT_ASSIGNED_TEST':
            {
                state=action.payload;
                console.log(state,"GET_STUDENT_ASSIGNED_TEST state")
                return [...state];
            }
        
        default:
             return [...state];
    }
}

export default GetStudentAssignedTestReducer;