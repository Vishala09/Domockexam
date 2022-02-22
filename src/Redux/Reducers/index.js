import AnswersReducer from './AnswersReducer'
import AllTestsReducer from './AllTestsReducer'
import GetQuestionsByTestReducer from './GetQuestionsByTestReducer'
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer'
import { combineReducers } from 'redux';
import ReportsReducer from './GetStudentTestReportReducer';
import GetCalculatedResultsReducer from './GetCalculatedResultsReducer';
import GetSubjectsReducer from './GetSubjectsReducer'
import SearchReducer from './SearchReducer'
import ResetPasswordReducer from './ResetPasswordRecuder'
import ResetStudentPasswordByStudentReducer from './ResetStudentPasswordByStudentReducer'
import GetStudentAssignedTestReducer from './GetStudentAssignedTestReducer'
import SaveStudentTestReducer from './SaveStudentTestReducer'
import EmailConfirmationReducer from './EmailConfirmationReducer'
import RegisterStudentReducer from './RegisterStudentReducer'

const allReducers = combineReducers({
    AnswersReducer,
    AllTestsReducer,
    GetQuestionsByTestReducer,
    LoginReducer,
    RegisterReducer,
    ReportsReducer,
    GetCalculatedResultsReducer,
    GetSubjectsReducer,
    SearchReducer,
    ResetPasswordReducer,
    ResetStudentPasswordByStudentReducer,
    GetStudentAssignedTestReducer,
    SaveStudentTestReducer,
    EmailConfirmationReducer,
    RegisterStudentReducer
})

export default allReducers;