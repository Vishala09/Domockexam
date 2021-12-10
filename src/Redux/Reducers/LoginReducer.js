import {setCookie,getCookie,deleteUserCookies} from '../../Components/HelperFunctions/CookieSettings'

let initialState = {
    username:getCookie('domockexamUsername')==''?'undefined':getCookie('domockexamUsername'),
    email:getCookie('domockexamEmail')==''?'undefined':getCookie('domockexamEmail'),
    value:{token:getCookie('domockexamToken')==''?'undefined':getCookie('domockexamToken')},
    firstName:'',
    lastName:'',
    userId:''

}


const LoginReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'LOGIN_USER':
            {

                let student = action?.payload?.student
                state.username=student.username;
                state.email=student.email;
                state.firstName=student.firstName;
                state.lastName=student.lastName;
                state.userId=student.userId;

                state.value.token=action.payload.token.token;
                                console.log(state,"LOGIN_USER state");
                // if(state.result!=false)
                //     window.location.href='exams'
                
                return {...state};
            }
        case 'LOGOUT_USER':
            {
                state=initialState;
                // localStorage.removeItem('domockexamToken');
                // localStorage.removeItem('domockexamEmail');
                // localStorage.removeItem('domockexamUsername');
                deleteUserCookies();
                console.log(state,"Log out state")
                window.location.reload();
                return {...state};
            }
        default:
             return {...state};
    }
}

export default LoginReducer;