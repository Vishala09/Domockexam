import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function SaveStudentCalculatedResultAPI(action)
{
    const requestBody = action.payload;
    
    console.log(requestBody)
    
    return axios.post(`https://api.domockexam.com/StudentTest/SaveStudentCalculatedResult`,requestBody,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        console.log('successfully SaveStudentCalculatedResult')
        return res.data;
    })
    .catch((err)=>{
        console.log('err-SaveStudentCalculatedResultAPI:',err);
    });
}

function* SaveStudentCalculatedResultAPIWorkerSaga(action)
{
    try{
            const Result = yield call(SaveStudentCalculatedResultAPI,action);
            console.log('SAVE_STUDENT_CALCULATED_RESULT',Result);
            yield put({type:'SAVE_STUDENT_CALCULATED_RESULT'})
    }
    catch(e)
    {

    }
}

export function* SaveStudentCalculatedResultAPISaga()
{
    yield takeEvery('SAVE_STUDENT_CALCULATED_RESULT_REQUESTED',SaveStudentCalculatedResultAPIWorkerSaga)
}