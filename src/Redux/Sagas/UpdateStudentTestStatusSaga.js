import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function UpdateStudentTestStatusAPI(action)
{
    const requestBody = action.payload 
    return axios.post(`https://api.domockexam.com/StudentTest/UpdateStudentTestStatus`,requestBody,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        console.log('Updated student test status successfully',res);
        return res.data;
    })
    .catch((err)=>{
        console.log('err-UpdateStudentTestStatusAPI:',err);
    })
}

function* UpdateStudentTestStatusAPIWorkerSaga(action)
{
    try{
            const Result = yield call(UpdateStudentTestStatusAPI,action);
            console.log('UpdateStudentTestStatus',Result);
            yield put({type:'UPDATE_STUDENT_TEST_STATUS',payload:Result})
    }
    catch(e)
    {

    }
}

export function* UpdateStudentTestStatusAPISaga()
{
    yield takeEvery('UPDATE_STUDENT_TEST_STATUS_REQUESTED',UpdateStudentTestStatusAPIWorkerSaga)
}