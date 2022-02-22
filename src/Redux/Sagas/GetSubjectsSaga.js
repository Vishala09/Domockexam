import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function getSubjectsFromAPI(action)
{
    return axios.get(`https://api.domockexam.com/StudentTest/GetSubjectWiseGrades`,
    { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log('err-GetSubjects:',err);
    })
}

function* getSubjectsWorkerSaga(action)
{
    try{
            const Subjects = yield call(getSubjectsFromAPI,action);
            console.log('getSubjectsWorkerSaga',Subjects);
            yield put({type:'GET_SUBJECTS',payload:Subjects});
    }
    catch(e)
    {

    }
}

export function* GetSubjectsSaga()
{
    yield takeEvery('GET_SUBJECTS_REQUESTED',getSubjectsWorkerSaga)
}