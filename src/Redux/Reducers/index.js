import AnswersReducer from './AnswersReducer'
import AllTestsReducer from './AllTestsReducer'
import GetQuestionsByTestReducer from './GetQuestionsByTestReducer'
import LoginReducer from './LoginReducer';
import RegisterReducer from './RegisterReducer'
import { combineReducers } from 'redux';
import ReportsReducer from './GetStudentTestReportReducer';
import GetCalculatedResultsReducer from './GetCalculatedResultsReducer';

const allReducers = combineReducers({
    AnswersReducer,
    AllTestsReducer,
    GetQuestionsByTestReducer,
    LoginReducer,
    RegisterReducer,
    ReportsReducer,
    GetCalculatedResultsReducer
})

export default allReducers;