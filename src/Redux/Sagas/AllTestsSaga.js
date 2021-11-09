import {call,put,takeEvery,take} from 'redux-saga/effects';
import axios from 'axios';

function getAllTestsFromAPI()
{
        
        let rbody = {
            "UserName":"bala23",
            "Password":"Sample@7774",
            "RememberMe":true
            }
        return axios.post('https://api.domockexam.com/account/login',rbody)
        .then((res)=>{
            console.log('res1',res);
            return axios.get(`https://api.domockexam.com/StudentTest/GetTest`)
                .then((res)=>{
                    console.log('res',res);
                    return res.data;
                })
                .catch((err)=>{
                    console.log('err2',err);
                    return err;           
                })
        })
        .catch((err)=>{
            console.log('err1',err);
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