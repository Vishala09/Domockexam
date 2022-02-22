import {setCookie,getCookie,deleteUserCookies} from '../../Components/HelperFunctions/CookieSettings'

let initialState = {
    username:getCookie('domockexamUsername')==''?'undefined':getCookie('domockexamUsername'),
    email:getCookie('domockexamEmail')==''?'undefined':getCookie('domockexamEmail'),
    value:{token:getCookie('domockexamToken')==''?'undefined':getCookie('domockexamToken')},
    userId:getCookie('domockexamUserID')==''?'undefined':getCookie('domockexamUserID'),
    ID:getCookie('domockexamID')==''?'undefined':getCookie('domockexamID'),
    userType:getCookie('domockexamUserType')==''?'undefined':getCookie('domockexamUserType'),
    studentData:getCookie('domockexamStudentData')==''?'undefined':JSON.parse(getCookie('domockexamStudentData')),
    childrenData:getCookie('domockexamParentChildrenData')==''?'undefined':JSON.parse(getCookie('domockexamParentChildrenData'))

}

const LoginReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'LOGIN_USER':
            {
                console.log('LOGIN_USER PAYLOAD',action.payload)
                let result = action.payload;


                if(result.student!=undefined && result.student!=null){
                    console.log('STUDENT',result.student);

                    state.studentData = ( result.student );
                    state.username=result.student.username;
                    state.userId=result.student.userId;
                    state.ID=result.student.studentId;
                    if(result.student?.roles.length>0)
                    state.userType=result.student?.roles[0];
                    state.value.token=result.token.token;
                    state.message="";

                    setCookie('domockexamToken'   ,state.value.token                  ,result.token.expiration);
                    setCookie('domockexamUsername',state.username                     ,result.token.expiration);
                    setCookie('domockexamID'      ,state.ID                    ,result.token.expiration);
                    setCookie('domockexamStudentData'      ,JSON.stringify(state.studentData)                    ,result.token.expiration);
                    setCookie('domockexamUserID'  ,state.userId                       ,result.token.expiration);
                    setCookie('domockexamUserType' ,state.userType                         ,result.token.expiration);
                    
                }
                else if(result.user!=undefined && result.childs.length>0)
                {
                    
                    state.username=result.user.username;
                    state.email=result.user.email;
                    state.ID=result.user.id;
                    state.userType='Parent';
                    state.childrenData = result.childs;
                    state.value.token=result.user.value.token;

                    state.message="";

                    setCookie('domockexamToken'   ,state.value.token                  ,result.user.value.expiration);
                    setCookie('domockexamUsername',state.username                     ,result.user.value.expiration);
                    setCookie('domockexamID'      ,state.ID                    ,result.user.value.expiration);
                    setCookie('domockexamUserType' ,state.userType                         ,result.user.value.expiration);
                    setCookie('domockexamParentChildrenData' , JSON.stringify( state.childrenData )   ,result.user.value.expiration);

                    console.log('PARENT',state)
                    
                }
                if(action.payload.result==false)
                {
                    console.log('RESULT==FALSE')
                    state.result=false;
                    state.message=result.message;
                }
                else
                {
                    state.result=true;
                }

                console.log(state,"LOGIN_USER state");
                
                return {...state};
            }
        case 'LOGOUT_USER':
            {
                state={};
                deleteUserCookies();
                return {...state};
            }
        case 'RESET_USER':
                {
                    state={};
                    return {...state};
                }
        default:
             return state;
    }
}

export default LoginReducer;