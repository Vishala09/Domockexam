

let initialState = {}


const RegisterStudentReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'REGISTER_STUDENT':
            {
                state=action.payload;
                console.log(state,"REGISTER_STUDENT state")
                return {...state};
            }
        default:
             return state;
    }
}

export default RegisterStudentReducer;