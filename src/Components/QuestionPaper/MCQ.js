import React, { useEffect, useRef, useState } from 'react'
import './Qp.css';import './CustomCheckBox.css'
import Parser from 'html-react-parser';
import { connect } from 'react-redux';

function MCQ(props) {
    const {el,index,qusID,isResult,Results,sectionID,isCorrectAnswers} = props;
    let deSelect = (e,id,op) => {
        //checkbox like radio
        if(e.target.checked)
        {
            //let radios = document.getElementsByName(e.target.name);
            // for(let i=0;i<radios.length;i++)
            // {
            //     radios[i].checked=false;
            // }
            //document.getElementById(id).checked=true;
            saveAnswers(op);
        }
        else
        {
            let selectedAnswer = props.answersFromStore[index].selectedAnswer;
            let ind = selectedAnswer.indexOf(op);
            if (ind > -1) {
                selectedAnswer.splice(ind, 1);
            }
            let answer = {index:index,qusId:qusID,selectedAnswer:selectedAnswer,qusType:'MCQ',lastUpdatedSectionIndex:sectionID}  //=> makes it radio
            props.saveAnswersToStore(answer);
        }
        
    }
    let saveAnswers = (op) => {
        let selectedAnswer = [];
        if(props.answersFromStore[index]?.selectedAnswer)
             selectedAnswer = props.answersFromStore[index].selectedAnswer;
        
        selectedAnswer.push(op)
        let answer = {index:index,qusId:qusID,selectedAnswer:selectedAnswer,qusType:'MCQ',lastUpdatedSectionIndex:sectionID}  //=> makes it radio
        props.saveAnswersToStore(answer);
    }
    const [Question, setQuestion] = useState(el);
   
    useEffect(() => {
        //normalize('NFD')
        let str=el.questionName; 

        if(Question.instruction==undefined ||Question.instruction==""){
        const regex = /\[Instruction:"(.*?)\"\]+/g;
        var matches = regex.exec(el.questionName);
        console.log(matches,'matches');
        str = str.replace(regex, '');
        
        if(matches!=null && matches.length>0)
            Question.instruction = matches[1];
        else
            Question.instruction = "Please select the correct option"
        }
    
            str=str.split('<p>&nbsp;</p>').join("");
            str=str.split('<br />').join("");


        Question.questionName=str;
        setQuestion({...Question});

    }, [])
    return (
        <div>
                <div>
                    
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        <h5>{Question.instruction}</h5>
                        <div style={{width:'100%',overflow:'auto',lineHeight:'2.5',marginTop:'20px'}}>{Parser(el.questionName)}</div>
                        <div className="d-flex flex-row flex-wrap " >
                        {
                            Question.options.map((op,ind)=>
                            <div  className="col-12 col-lg-3 col-md-6 choose" >
                                <div  className="mb-1 m-1">
                                    <label className={"customcheck "+((isResult &&Results && (isCorrectAnswers || Results[ind]?.isSelected) && Results.length>0 && Results[ind]?.isCorrect) ? ' bggreen ' : isResult &&Results && Results.length>0 && Results[ind]?.isCorrect==false ?' bgred ' : ' none ')} 
                                    //style={{background:isResult && Results[ind].isCorrect ? 'green' : isResult && Results[ind].isCorrect==false ?'red' : 'none'}}
                                    >
                                        {op.option}
                                        <input onClick={(e)=>{deSelect(e,''+index+ind,op);}} type="checkbox"
                                            name={''+index} id={''+index+ind} disabled={isResult}
                defaultChecked={!isResult && props.answersFromStore[index] && props.answersFromStore[index].selectedAnswer.includes(op)} 
                             />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            )
                        }
                        </div>
                            
                    </div>
                    
                </div>
        </div>
    )
}

//export default MCQ

const mapStateToProps = state => {
    return {
       answersFromStore:state.AnswersReducer,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        saveAnswersToStore:(json) => dispatch({type:'SET_ANSWERS',payload:json})
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(MCQ);