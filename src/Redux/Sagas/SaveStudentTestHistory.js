import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function saveStudentTestHistoryAPI(action)
{
    let requestBody = action.payload;
    
    console.log('saveStudentTestHistoryAPI',requestBody)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+getCookie('domockexamToken'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(requestBody);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://api.domockexam.com/StudentTest/SaveStudentTestHistory", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log('Successfully saved SAVE_STUDENT_TEST_HISTORY');
            return result;
            })
    .catch(error => console.log('error', error));
}

function* saveStudentTestHistoryAPIWorkerSaga(action)
{
    try{
            const Result = yield call(saveStudentTestHistoryAPI,action);
            console.log('saveStudentTestHistoryAPI',Result);
            yield put({type:'SAVE_STUDENT_TEST_HISTORY'})
    }
    catch(e)
    {

    }
}

export function* saveStudentTestHistoryAPISaga()
{
    yield takeEvery('SAVE_STUDENT_TEST_HISTORY_REQUESTED',saveStudentTestHistoryAPIWorkerSaga)
}