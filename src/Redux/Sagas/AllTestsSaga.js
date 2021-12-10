import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';
import {setCookie,getCookie} from '../../Components/HelperFunctions/CookieSettings'

function getAllTestsFromAPI()
{
   
    return axios.get(`https://api.domockexam.com/StudentTest/GetTest`,
            { headers:{Authorization:'Bearer '+getCookie('domockexamToken'),"Content-Type":"application/json"}})
                .then((res)=>{
                    console.log('res',res);
                    return res.data;
                })
                .catch((err)=>{
                    console.log('err',err.response);
                    // if(err?.response?.status==401)
                    // {
                    //     window.location.href='login';
                    // }
                    return err;           
                })
    

}

function* getAllTestsWorkerSaga()
{
    try{
            const AllTests = yield call(getAllTestsFromAPI);
            console.log('getAllTestsWorkerSaga',AllTests);
            yield put({type:'GET_ALL_TESTS',payload:AllTests.value.test})
    }
    catch(e)
    {

    }
}

export function* getAllTestsSaga()
{
    yield takeEvery('GET_ALL_TESTS_REQUESTED',getAllTestsWorkerSaga)
}