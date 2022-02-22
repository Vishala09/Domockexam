let initialState = {status:false,studentTestId:""};

const SaveStudentTestReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'SAVE_STUDENT_TEST':
            {
                console.log('SAVE_STUDENT_TEST',action.payload)
                if(action.payload.studentTestId!=undefined || action.payload.studentTestId!="")
                {
                    state.status=true;
                    state.studentTestId=action.payload.studentTestId;
                }
                return {...state};
            }
        case 'RESET_STUDENT_TEST':
                {
                        state.status=false;
                        state.studentTestId="";
                    return {...state};
                }
        default:
             return {...state};
    }
}

export default SaveStudentTestReducer;