import React, { useEffect, useState } from 'react'
import './Qp.css';
import Parser from 'html-react-parser';
import { connect } from 'react-redux';

function DropDown(props) {
    const {el,index,qusID,isResult,Results,sectionID,isCorrectAnswers} = props
    const [answers, setanswers] = useState([]);
    const [Question, setQuestion] = useState(el);
    let [dropCompIndex, setdropCompIndex] = useState(0);

    function handleChange(e,id)
    {
        answers[id]=e.target.value;
        setanswers([...answers]);
        let obj={index:index,qusId:qusID,selectedAnswer:answers,qusType:'Dropdown',lastUpdatedSectionIndex:sectionID}
        props.saveAnswersToStore(obj);
    }
    
    const formatQuestion = () => {
        let i= 0
        let str=el.questionName; 

        if(Question.instruction==undefined ||Question.instruction==""){

            const instregex = /\[Instruction:"(.*?)\"\]+/g;
            var matches = instregex.exec(el.questionName);
            console.log(matches,'matches');
            str = str.replace(instregex, '');
            if(matches!=null && matches.length>0)
            Question.instruction = matches[1];
            else
            Question.instruction = "Please choose from the drop down";

        }
    
        const regex = /{[^{}]+}/g;
        str = str.replace(regex, '<h1 style="display:inline-block;"></h1>');
        str=str.split('<p>&nbsp;</p>').join("");
        str=str.split('<br />').join("");
        Question.questionName=str;

    Question.questionName=str;
    setQuestion({...Question});
    }

    useEffect(() => {
        formatQuestion();
        if(props.answersFromStore[index])
        {
            setanswers(props.answersFromStore[index].selectedAnswer)
        }
        else
        {
            for(let i=0;i<el.options.length;i++)
            {
            answers[i]='';
            }
            setanswers([...answers]);
        }
    }, []);

const added =[]
function renderData(){ 
    let d = Parser(Question.questionName);
   // console.log(d) ;
    renderDrag(d) ;  }
const renderDrag = (d) => {
    for(let i=0;i<d.length;i++)
    {
        let temp=d[i];
        if(!Array.isArray(temp))       //object
        while(temp)
        {
            if(temp.type=='h1')
            {
                added.push('DROP')
            }
            else
            {
                if(temp?.props==null)
                {

                    added.push(temp);
                }
            }
            temp = temp?.props?.children;
        }
        else
        {
            renderDrag(temp?.props?.children)
        }
    }
    
}

function renderHTML()
{
    renderData();
    return (<div>
        {
            added.map((html,i)=>
                <>
                        {
                            html=='\n'?
                            <br></br>
                            :
                            html=='DROP'?
                            <>
                            {
                                DroppableComp(dropCompIndex++)
                            }

                            </>
                            :
                            html
                        }
                </>
            )
        }
    </div>)
}

const DroppableComp = (i) => {
    return <>
        <select  data-flip="false" data-toggle="dropdown" aria-haspopup="true" disabled={isResult}
        aria-expanded="false" data-dropup-auto="false" onChange={(e)=>handleChange(e,i)} 
        value={
            !isResult?
            (props.answersFromStore[index]?.selectedAnswer[i]) :
            !isCorrectAnswers ? 
            (props.answersFromStore[index]?.selectedAnswer[i]==""?"":props.answersFromStore[index]?.selectedAnswer[i] )
            :
            JSON.parse(el.correctOption)[i]
        }
      // value={ (!isCorrectAnswers)?  props.answersFromStore[index]?.selectedAnswer[i]  : el.correctOption.split(",")[i] }

        className={"mydropdown dropdown-toggle "+
        (!isResult && ((props.answersFromStore[index]?.selectedAnswer[i]=="Select Answer"||props.answersFromStore[index]?.selectedAnswer[i]=="")?'bggray':'bgwhite'))
        +
        ((isResult &&Results && Results.length>0 && Results[i]?.isCorrect) ? ' bggreen ' : isResult &&Results && 
        Results.length>0 && Results[i]?.isCorrect==false ?' bgred ' : ' none ')}
        >
            <option  value="Select Answer"   > Select Answer </option>
            {
                Question.options[i]?.option.split(",").map((el)=>
                <option className="myoption" value={el}>
                        {el}
                </option>
                )
            }
        </select>
    </>
}

    return (
        <div>
                <div>
                    {/* <h4>{index}.&nbsp;{el.questionheading} </h4> */}
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                    <h5>{Question.instruction}</h5>
                           
                        <div style={{lineHeight:'2.5',overflow:'auto',width:'100%'}}>
                                {/* {Parser(Question.questionName)} */}
                                {renderHTML()}
                        </div>
                    </div>
                    
                   
                </div>
        </div>
    )
}

//export default Q1


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
  export default connect(mapStateToProps,mapDispatchToProps)(DropDown);