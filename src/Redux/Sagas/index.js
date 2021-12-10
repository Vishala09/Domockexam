import {all,fork} from 'redux-saga/effects'

import {getAllTestsSaga} from './AllTestsSaga'

import {getQuestionsByTestSaga} from './GetQuestionsByTestSaga'

import {saveAnswerLogAPISaga} from './SaveAnswerLogSaga'

import {saveStudentTestAPISaga} from './SaveStudentTestSaga'

import {LoginSaga} from './LoginSaga'

import {registerTestAPISaga} from './RegisterSaga'

import {saveStudentTestHistoryAPISaga} from './SaveStudentTestHistory'

import {GetStudentTestReportAPISaga} from './GetStudentTestReportSaga'

import {SaveStudentCalculatedResultAPISaga} from './SaveStudentCalculatedResultSaga';

import {GetCalculatedResultsAPISaga} from './GetCalculatedResultsSaga'

export default function* rootSaga(){
    yield all(
        [
            fork(getAllTestsSaga) , fork(getQuestionsByTestSaga) , fork(saveAnswerLogAPISaga) ,
            fork(saveStudentTestAPISaga) , fork(LoginSaga) , fork(registerTestAPISaga) , 
            fork(saveStudentTestHistoryAPISaga) , fork(GetStudentTestReportAPISaga) ,
            fork(SaveStudentCalculatedResultAPISaga) , fork(GetCalculatedResultsAPISaga)
        ]
    )
}