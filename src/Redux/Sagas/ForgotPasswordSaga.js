import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function ForgotPasswordAPI(action)
{
    const requestBody = action.payload 
    console.log(`https://api.domockexam.com/account/ForgotPassword?Email=${requestBody.email}`)

    return axios.post(`https://api.domockexam.com/account/ForgotPassword?Email=${requestBody.email}`)
    .then((res)=>{ 
        console.log("Forgot Password Success")
        return res;
    })
    .catch((err)=>{
        console.log('err-ForgotPasswordAPI:',err);
    })
}

function* ForgotPasswordAPIWorkerSaga(action)
{
    try{
            const Result = yield call(ForgotPasswordAPI,action);
            console.log('FORGOT_PASSWORD Result',Result);
            yield put({type:'FORGOT_PASSWORD'})
    }
    catch(e)
    {

    }
}

export function* ForgotPasswordAPISaga()
{
    yield takeEvery('FORGOT_PASSWORD_REQUESTED',ForgotPasswordAPIWorkerSaga)
}