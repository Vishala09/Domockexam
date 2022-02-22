let initialState = {};

const ResetStudentPasswordByStudentReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'RESET_STUDENT_PASSWORD_BY_PASSWORD':
            {
                console.log(action.payload)
                state=JSON.parse(action.payload);
                return {...state};
            }
        default:
             return state;
    }
}

export default ResetStudentPasswordByStudentReducer;