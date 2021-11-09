import AnswersReducer from './AnswersReducer'
import AllTestsReducer from './AllTestsReducer'
import GetQuestionsByTestReducer from './GetQuestionsByTestReducer'
import { combineReducers } from 'redux';
const allReducers = combineReducers({
    AnswersReducer,
    AllTestsReducer,
    GetQuestionsByTestReducer
})

export default allReducers;