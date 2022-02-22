let initialState = "";

const ResetPasswordReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'RESET_PASSWORD':
            {
                console.log('RESET_PASSWORD',action.payload,action.payload.data,action.payload.data.status)
                state=action.payload.data;
                return state;
            }
        default:
             return state;
    }
}

export default ResetPasswordReducer;