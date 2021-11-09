import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';

function saveStudentTestAPI(action)
{
    const requestBody = action.payload 
    return axios.post(`https://api.domockexam.com/StudentTest/SaveStudentanswerlog`,requestBody)
    .then((res)=>{
        console.log("Successfully posted answer log")
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
            console.log('saveAnswerLogAPI',Result);
            yield put({type:'SAVE_STUDENT_TEST'})
    }
    catch(e)
    {

    }
}

export function* saveStudentTestAPISaga()
{
    yield takeEvery('SAVE_STUDENT_TEST_REQUESTED',saveStudentTestAPIWorkerSaga)
}