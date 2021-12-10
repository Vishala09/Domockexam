let initialState = {}
let obj = 
{
    visited:false,
    answered:false,
    flagged:false,
}

const AnswersReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'SET_ANSWERS':
            {
                state[action.payload.index]=action.payload;
                state['lastUpdatedIndex']=action.payload.index;
                state['lastUpdatedSectionIndex']=action.payload.lastUpdatedSectionIndex;
                console.log(state,"SET_ANSWERS state")
                return {...state};
            }
        case 'CLEAR_ANSWERS':
            {
                state={}
                return {...state};
            }
        default:
             return state;
    }
}

export default AnswersReducer;