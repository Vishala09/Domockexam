import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function ResetPasswordAPI(action)
{
    const requestBody = action.payload 

    return axios.post('https://api.domockexam.com/account/ResetPassword',requestBody)
    .then((res)=>{ 
        console.log("Reset Password Success")
        return res;
    })
    .catch((err)=>{
        console.log('err-ResetPasswordAPI:',err);
    })
}

function* ResetPasswordAPIWorkerSaga(action)
{
    try{
            const Result = yield call(ResetPasswordAPI,action);
            console.log('Reset_PASSWORD Result',Result);
            yield put({type:'RESET_PASSWORD',payload:Result})
    }
    catch(e)
    {

    }
}

export function* ResetPasswordAPISaga()
{
    yield takeEvery('RESET_PASSWORD_REQUESTED',ResetPasswordAPIWorkerSaga)
}