import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function GetStudentAssignedTestAPI(action)
{
    const requestBody = action.payload 
    return axios.get(`https://api.domockexam.com/StudentTest/GetStudentTest`, 
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        console.log("Successfully received GetStudentAssignedTest ");
        return res.data;
    })
    .catch((err)=>{
        console.log('err-GetStudentAssignedTestAPI:',err);
    })
}

function* GetStudentAssignedTestAPIWorkerSaga(action)
{
    try{
            const Result = yield call(GetStudentAssignedTestAPI,action);
            console.log('Result',Result);
            yield put({type:'GET_STUDENT_ASSIGNED_TEST',payload:Result})
    }
    catch(e)
    {

    }
}

export function* GetStudentAssignedTestAPISaga()
{
    yield takeEvery('GET_STUDENT_ASSIGNED_TEST_REQUESTED',GetStudentAssignedTestAPIWorkerSaga)
}