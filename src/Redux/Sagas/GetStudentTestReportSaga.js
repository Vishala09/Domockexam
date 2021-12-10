import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function GetStudentTestReportAPI(action)
{
    const requestBody = action.payload 
    return axios.get(`https://api.domockexam.com/Report/GetStudentTestReport`, 
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        console.log("Successfully received GetStudentTestReport ");
        return res.data;
    })
    .catch((err)=>{
        console.log('err-GetStudentTestReportAPI:',err);
    })
}

function* GetStudentTestReportAPIWorkerSaga(action)
{
    try{
            const Result = yield call(GetStudentTestReportAPI,action);
           // console.log('Result',Result.value.report);
            yield put({type:'GET_STUDENT_TEST_REPORT',payload:Result.value.report})
    }
    catch(e)
    {

    }
}

export function* GetStudentTestReportAPISaga()
{
    yield takeEvery('GET_STUDENT_TEST_REPORT_REQUESTED',GetStudentTestReportAPIWorkerSaga)
}