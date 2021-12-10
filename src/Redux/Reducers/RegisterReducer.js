

let initialState = {}


const RegisterReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'REGISTER_USER':
            {
                state=action.payload;
                console.log(state,"REGISTER_USER state")
                
                return {...state};
            }
        default:
             return {...state};
    }
}

export default RegisterReducer;