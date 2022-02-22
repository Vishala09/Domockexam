import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function saveStudentTestAPI(action)
{
    const requestBody = action.payload 
    return axios.post(`https://api.domockexam.com/StudentTest/SaveStudentTest`,requestBody,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        setCookie('domockexamStudentTestId',res.data.studentTestId)
        console.log("Successfully registered test ")
        return res.data;
    })
    .catch((err)=>{
        console.log('err-saveStudentTestAPI:',err);
    })
}

function* saveStudentTestAPIWorkerSaga(action)
{
    try{
            const Result = yield call(saveStudentTestAPI,action);
            console.log('registered',Result);
            yield put({type:'SAVE_STUDENT_TEST',payload:Result})
    }
    catch(e)
    {

    }
}

export function* saveStudentTestAPISaga()
{
    yield takeEvery('SAVE_STUDENT_TEST_REQUESTED',saveStudentTestAPIWorkerSaga)
}