
import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function EmailConfirmationAPI(action)
{
    const requestBody = action.payload 
    //console.log(`https://api.domockexam.com/account/ConfirmEmail?Email=${requestBody.email}`)

    return axios.get(`https://api.domockexam.com/account/ConfirmEmail?Email=${requestBody.email}&&Token=${requestBody.token}`)
    .then((res)=>{ 
        console.log("Confirm Email Success");
        return res;
    })
    .catch((err)=>{
        console.log('err-EmailConfirmationAPI:',err);
    })
}

function* EmailConfirmationAPIWorkerSaga(action)
{
    try{
            const Result = yield call(EmailConfirmationAPI,action);
            console.log('CONFIRM_EMAIL Result',Result);
            yield put({type:'CONFIRM_EMAIL',payload:Result})
    }
    catch(e)
    {

    }
}

export function* EmailConfirmationAPISaga()
{
    yield takeEvery('CONFIRM_EMAIL_REQUESTED',EmailConfirmationAPIWorkerSaga)
}