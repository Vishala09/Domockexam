import {all,fork} from 'redux-saga/effects'

import {getAllTestsSaga} from './AllTestsSaga'

import {getQuestionsByTestSaga} from './GetQuestionsByTestSaga'

import {saveAnswerLogAPISaga} from './SaveAnswerLogSaga'

import {saveStudentTestAPISaga} from './SaveStudentTestSaga'

export default function* rootSaga(){
    yield all(
        [
            fork(getAllTestsSaga) , fork(getQuestionsByTestSaga) , fork(saveAnswerLogAPISaga) ,
            fork(saveStudentTestAPISaga)
        ]
    )
}