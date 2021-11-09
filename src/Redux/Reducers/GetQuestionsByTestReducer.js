let initialState = {QuestionsByTest:undefined,testdetails:undefined}

const GetQuestionsByTestReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_QUESTIONS_BY_TEST':
            {
                state.QuestionsByTest=action.payload;
                console.log(state,"GET_QUESTIONS_BY_TEST state")
                return {...state};
            }
        case 'GET_TEST_DETAILS_BY_TEST':
            {
                state.testdetails=action.payload;
                console.log(state,"GET_QUESTIONS_BY_TEST state")
                return {...state};
            }
        case 'CLEAR_QUESTIONS_BY_TEST':
            {
                state = {QuestionsByTest:undefined,testdetails:undefined}
                return {...state};
            }
        default:
             return {...state};
    }
}

export default GetQuestionsByTestReducer;