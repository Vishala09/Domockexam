import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function ResetStudentPasswordByStudentAPI(action)
{
    let requestBody = action.payload;
    
    console.log('ResetStudentPasswordByStudentAPI',requestBody)
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

    return fetch("https://api.domockexam.com/account/ResetStudentPasswordByStudent", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(' ResetStudentPasswordByStudent');
            return result;
            })
    .catch(error => console.log('error', error));
}

function* ResetStudentPasswordByStudentAPIWorkerSaga(action)
{
    try{
            const Result = yield call(ResetStudentPasswordByStudentAPI,action);
            console.log('ResetStudentPasswordByStudentAPI',Result);
            yield put({type:'RESET_STUDENT_PASSWORD_BY_PASSWORD',payload:Result})
    }
    catch(e)
    {

    }
}

export function* ResetStudentPasswordByStudentAPISaga()
{
    yield takeEvery('RESET_STUDENT_PASSWORD_BY_PASSWORD_REQUESTED',ResetStudentPasswordByStudentAPIWorkerSaga)
}