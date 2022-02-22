let initialState = "";

const EmailConfirmationReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'CONFIRM_EMAIL':
            {
                console.log('CONFIRM_EMAIL',action.payload)
                state=action.payload.data.Result=="Success";
                return state;
            }
        default:
             return state;
    }
}

export default EmailConfirmationReducer;