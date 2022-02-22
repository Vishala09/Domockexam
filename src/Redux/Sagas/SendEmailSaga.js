import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function SendEmailAPI(action)
{
    let requestBody = action.payload;
    console.log(requestBody)
    
    return axios.post(`https://api.domockexam.com/StudentTest/SendEmail`,requestBody,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        console.log("SendEmailAPI SUCCESS")
        return res.data;
    })
    .catch((err)=>{
        console.log('err-SendEmailAPI:',err);
        return err;
    })
}

function* SendEmailAPIWorkerSaga(action)
{
    try{
            const Result = yield call(SendEmailAPI,action);
            console.log('SEND_EMAIL',Result);
            yield put({type:'SEND_EMAIL',payload:Result})
    }
    catch(e)
    {

    }
}

export function* SendEmailAPISaga()
{
    yield takeEvery('SEND_EMAIL_REQUESTED',SendEmailAPIWorkerSaga)
}