import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';

function getQuestionsByTestFromAPI(action)
{
    let rbody = {
        "UserName":"bala23",
        "Password":"Sample@7774",
        "RememberMe":true
        }
    var requestOptions = {
    method: 'POST',
    body: JSON.stringify(rbody),
    redirect: 'follow',
    headers:{'Content-Type':'application/json'}
    };
    //https://api.domockexam.com/StudentTest/GetQuestionByTestId
    return axios.get(`https://api.domockexam.com/StudentTest/GetQuestionsByTestId?testid=${action.payload.testid}`,{headers:{'Content-Type':'application/json'}})
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