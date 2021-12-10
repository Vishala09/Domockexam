import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function GetCalculatedResultsAPI(action)
{
    const requestBody = action.payload 
    return axios.post(`https://api.domockexam.com/Report/GetCalculatedResults?filterId=2&filterValue=`+getCookie('domockexamID'),requestBody,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
       console.log('GetCalculatedResults')
        return res.data;
    })
    .catch((err)=>{
        console.log('err-GetCalculatedResultsAPI:',err);
    });
}

function* GetCalculatedResultsAPIWorkerSaga(action)
{
    try{
            const Result = yield call(GetCalculatedResultsAPI,action);
          //  console.log('Result',Result);
            yield put({type:'GET_CALCULATED_RESULTS',payload:Result.value})
    }
    catch(e)
    {

    }
}

export function* GetCalculatedResultsAPISaga()
{
    yield takeEvery('GET_CALCULATED_RESULT_REQUESTED',GetCalculatedResultsAPIWorkerSaga)
}