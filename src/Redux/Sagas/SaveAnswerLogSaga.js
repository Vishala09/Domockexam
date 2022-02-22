import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function saveAnswerLogAPI(action)
{
    const requestBody = action.payload;
    //console.log('saveAnswerLogAPI',requestBody)

        return axios.post(`https://api.domockexam.com/StudentTest/SaveStudentanswerlog`,requestBody,
        { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
        .then((res)=>{
           // console.log("Successfully posted answer log")
            return res.data;
        })
        .catch((err)=>{
          //  console.log('err-saveAnswerLogAPI:',err);
            return err;
        })
}

function* saveAnswerLogAPIWorkerSaga(action)
{
    try{
            const Result = yield call(saveAnswerLogAPI,action);
          //  console.log('saveAnswerLogAPI',Result);
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