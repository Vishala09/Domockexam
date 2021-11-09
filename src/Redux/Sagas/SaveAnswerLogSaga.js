import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';

function saveAnswerLogAPI(action)
{
    const requestBody = action.payload 
    return axios.post(`https://api.domockexam.com/StudentTest/SaveStudentanswerlog`,requestBody)
    .then((res)=>{
        console.log("Successfully posted answer log")
        return res.data;
    })
    .catch((err)=>{
        console.log('err-saveAnswerLogAPI:',err);
    })
}

function* saveAnswerLogAPIWorkerSaga(action)
{
    try{
            const Result = yield call(saveAnswerLogAPI,action);
            console.log('saveAnswerLogAPI',Result);
            yield put({type:'SAVE_ANSWER_LOG'})
    }
    catch(e)
    {

    }
}

export function* saveAnswerLogAPISaga()
{
    yield takeEvery('SAVE_ANSWER_LOG_REQUESTED',saveAnswerLogAPIWorkerSaga)
}