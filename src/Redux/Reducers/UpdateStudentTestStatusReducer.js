let initialState = {status:false};

const UpdateStudentTestStatusReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'UPDATE_STUDENT_TEST_STATUS':
            {
                console.log('UPDATE_STUDENT_TEST_STATUS',action.payload)
                if(action.payload==1)
                state={status:true};

                return {...state};
            }
        default:
             return {...state};
    }
}

export default UpdateStudentTestStatusReducer;