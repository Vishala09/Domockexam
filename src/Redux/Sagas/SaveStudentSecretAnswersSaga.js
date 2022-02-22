import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function SaveStudentSecretAnswersAPI(action)
{
    let requestBody = action.payload;
    
    console.log('SaveStudentSecretAnswersAPI',requestBody)
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

    return fetch("https://api.domockexam.com/account/SaveStudentSecretAnswers", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log('Successfully saved SaveStudentSecretAnswers');
            return result;
            })
    .catch(error => console.log('error', error));
}

function* SaveStudentSecretAnswersAPIWorkerSaga(action)
{
    try{
            const Result = yield call(SaveStudentSecretAnswersAPI,action);
            console.log('SaveStudentSecretAnswersAPI',Result);
            yield put({type:'SAVE_STUDENT_SECRET_ANSWER'})
    }
    catch(e)
    {

    }
}

export function* SaveStudentSecretAnswersAPISaga()
{
    yield takeEvery('SAVE_STUDENT_SECRET_ANSWER_REQUESTED',SaveStudentSecretAnswersAPIWorkerSaga)
}