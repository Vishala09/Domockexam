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

import {GetSubjectsSaga} from './GetSubjectsSaga'

import {ForgotPasswordAPISaga} from './ForgotPasswordSaga'

import {ResetPasswordAPISaga} from './ResetPasswordSaga'

import {ResetStudentPasswordByStudentAPISaga} from './ResetStudentPasswordByStudentSaga'

import {GetStudentAssignedTestAPISaga} from './GetStudentAssignedTestSaga'

import {UpdateStudentTestStatusAPISaga} from './UpdateStudentTestStatusSaga'

import {EmailConfirmationAPISaga} from './EmailConfirmationSaga'

import {RegisterStudentTestAPISaga} from './RegisterStudentSaga'

import {SendEmailAPISaga} from './SendEmailSaga';

export default function* rootSaga(){
    yield all(
        [
            fork(getAllTestsSaga) , fork(getQuestionsByTestSaga) , fork(saveAnswerLogAPISaga) ,
            fork(saveStudentTestAPISaga) , fork(LoginSaga) , fork(registerTestAPISaga) , 
            fork(saveStudentTestHistoryAPISaga) , fork(GetStudentTestReportAPISaga) ,
            fork(SaveStudentCalculatedResultAPISaga) , fork(GetCalculatedResultsAPISaga) ,
            fork(GetSubjectsSaga) , fork(ForgotPasswordAPISaga) , fork(ResetPasswordAPISaga) ,
            fork(ResetStudentPasswordByStudentAPISaga) , fork(GetStudentAssignedTestAPISaga) ,
            fork(UpdateStudentTestStatusAPISaga) ,fork(EmailConfirmationAPISaga) , 
            fork(RegisterStudentTestAPISaga) , fork(SendEmailAPISaga)
        ]
    )
}