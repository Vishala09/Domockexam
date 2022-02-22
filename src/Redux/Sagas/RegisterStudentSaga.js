import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function RegisterStudentTestAPI(action)
{
    let requestBody = action.payload;

    console.log(requestBody)
    return axios.post(`https://api.domockexam.com/account/RegisterStudent`,requestBody,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        console.log("Successfully RegisterStudented",res)
        return res.data;
    })
    .catch((err)=>{
       // return err;
        console.log('err-RegisterStudentTestAPI:',err);
    })
}

function* RegisterStudentTestAPIWorkerSaga(action)
{
    try{
            const Result = yield call(RegisterStudentTestAPI,action);
            console.log('REGISTER_STUDENT',Result);
            yield put({type:'REGISTER_STUDENT',payload:Result})
    }
    catch(e)
    {

    }
}

export function* RegisterStudentTestAPISaga()
{
    yield takeEvery('REGISTER_STUDENT_REQUESTED',RegisterStudentTestAPIWorkerSaga)
}