import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function getQuestionsByTestFromAPI(action)
{
    return axios.get(`https://api.domockexam.com/StudentTest/GetQuestionsByTestId?testid=${action.payload.testid}&groupby=1`,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log('err-GetQuestionByTestId:',err);
    })
}

function* getQuestionsByTestWorkerSaga(action)
{
    try{
            const QuestionsByTest = yield call(getQuestionsByTestFromAPI,action);
            console.log('getQuestionsByTestWorkerSaga',QuestionsByTest);
            yield put({type:'GET_QUESTIONS_BY_TEST',payload:QuestionsByTest.questions})
    }
    catch(e)
    {

    }
}

export function* getQuestionsByTestSaga()
{
    yield takeEvery('GET_QUESTIONS_BY_TEST_REQUESTED',getQuestionsByTestWorkerSaga)
}