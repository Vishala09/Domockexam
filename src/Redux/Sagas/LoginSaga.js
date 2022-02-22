import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function LoginAPI(action)
{
    console.log(action.payload);
        
    var requestOptions = {
    method: 'POST',
    body: JSON.stringify(action.payload),
    redirect: 'follow',
    headers:{'Content-Type':'application/json'}
    };

    return fetch("https://api.domockexam.com/account/login", requestOptions)
    .then(response => response.json())
    .then(result => {
             
             if(result.result!=false){
             }
            // console.log(result);
             return result;
    })
    .catch(error => console.log('error', error));
}

function* LoginWorkerSaga(action)
{
    try{
            const User = yield call(LoginAPI,action);
            console.log('LoginWorkerSaga',User);
            yield put({type:'LOGIN_USER',payload:User})
    }
    catch(e)
    {

    }
}

export function* LoginSaga()
{
    yield takeEvery('LOGIN_USER_REQUESTED',LoginWorkerSaga)
}