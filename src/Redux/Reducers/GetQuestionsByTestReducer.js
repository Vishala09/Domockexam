let initialState = {QuestionsByTest:undefined,testdetails:undefined}
function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));
        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
const GetQuestionsByTestReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case 'GET_QUESTIONS_BY_TEST':
            {
                state.QuestionsByTest=action.payload;
                console.log("===================================================");
                console.log(state,"WORKING CURRENTLY GET_QUESTIONS_BY_TEST state");
                for(let i=0;i<state.QuestionsByTest[0]?.questions.length;i++)
                {
                    let el = state.QuestionsByTest[0]?.questions[i];
                    el.customOptions=[...el.options];
                    el.instruction="";
                    if(el.qusType=='Gap Filling')
                    {
                        let str=el.questionName; 
                        let extraregex = /\[extra:"(.*?)\"\]+/g;
                        var extramatches = extraregex.exec(el.questionName);

                        if(extramatches!=null && extramatches.length>0)
                        el.customOptions.push({
                            "id": el.customOptions.length,
                            "option": extramatches[1],
                            "correctAnswer": null,
                            "isCorrect": true,
                            "position": el.customOptions.length
                        }); 
                        
                        console.log(extramatches,'extramatches');
                        str = str.replace(extraregex, '');

                        //////////////////////
                        if(el.instruction==undefined ||el.instruction==""){

                            console.log('INSTRUCTION PARSING ')
            
                            const instregex = /\[Instruction:"(.*?)\"\]+/g;
                            var matches = instregex.exec(el.questionName);
                            //console.log(matches,'matches');
                            str = str.replace(instregex, '');
                            if(matches!=null && matches.length>0)
                            el.instruction = matches[1];
                
                        }
            
                       
                        const regex = /{[^{}]+}/g;
                        str = str.replace(regex, '<h1 style="display:inline-block;"></h1>');
                    
                        str=str.split('<p>&nbsp;</p>').join("");
                        str=str.split('<br />').join("");
                        
            
                        let opts = el.customOptions;
                        opts = shuffle(opts);
                        el.customOptions = opts;
            
            
                        el.questionName=str;
                        el.formatted=true;
                    }
                }
                return {...state};
            }
        case 'GET_TEST_DETAILS_BY_TEST':
            {
                state.testdetails=action.payload;
                console.log(state,"GET_TEST_DETAILS_BY_TEST state")
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