import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function registerTestAPI(action)
{
    let requestBody = action.payload;

   // console.log(requestBody)
    return axios.post(`https://api.domockexam.com/account/register`,requestBody,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        console.log("Successfully Registered")
        return res.data;
    })
    .catch((err)=>{
       // return err;
        console.log('err-registerTestAPI:',err);
    })
}

function* registerTestAPIWorkerSaga(action)
{
    try{
            const Result = yield call(registerTestAPI,action);
            console.log('REGISTER_USER',Result);
            yield put({type:'REGISTER_USER',payload:Result})
    }
    catch(e)
    {

    }
}

export function* registerTestAPISaga()
{
    yield takeEvery('REGISTER_USER_REQUESTED',registerTestAPIWorkerSaga)
}