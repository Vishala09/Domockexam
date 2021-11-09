//updating sub questions from props ; updating main question from initialStatus [answered,visited,flagged] 

import React, { useEffect, useState } from 'react'
import Q1 from '../QuestionPaper/Q1';
import Q4 from '../QuestionPaper/Q4';
import Q5 from '../QuestionPaper/Q5';
import Q6 from '../QuestionPaper/Q6';
import Q7 from '../QuestionPaper/Q7';
import Q8 from '../QuestionPaper/Q8';
import Match from '../QuestionPaper/Match';
import Fillin from '../QuestionPaper/Fillin';
import Rearrange from '../QuestionPaper/Rearrange';
import axios from 'axios';
import './Test.css'
import Instructions from './Instructions'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useMemo } from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { useLocation } from "react-router-dom";

// import Questions from '../QuestionPaper/Questions.json';

function Test(props) {
        
    const [Questions, setQuestions] = useState([]);
    const [TestStarted, setTestStarted] = useState(false);
    
    const [Loading, setLoading] = useState(true);
    const [Question, setQuestion] = useState(null)
    const [currentId, setcurrentId] = useState(null);
    const [QuestionToggle, setQuestionToggle] = useState(true);
    const [QuestionsStatus, setQuestionsStatus] = useState({});
    const [QuestionsStatusFromProps, setQuestionsStatusFromProps] = useState(props.answersFromStore);

    const location = useLocation();
    const QuestionsByTest = location?.state?.questions;
   
    const testIds = fillTestIds();
    //const testIds = [38];
    function fillTestIds ()
    {
       // console.log(QuestionsByTest,location?.state?.questions)
        let arr = [];
        for(let i=15;i<150;i++)
        {
            arr.push(i);
        }
        return arr;
    }
    const getQuestionInitialStatus = () => {
        let obj = 
        {
            visited:false,
            answered:false,
            flagged:false,
            halfanswered:false
        }
        let status = {}
        for(let i=0;i<Questions.length;i++)
        {
        status[i]=obj;
        }
        setQuestionsStatus(status);
        return status;
    }
    
    const checkSubQuestionsHalfAnswered = (index) => {
        let flagEmpty=0;
        let flagFill=0;
        for(let i=0;i<props.answersFromStore[index].selectedAnswer.length;i++)
        {
            if(props.answersFromStore[index].selectedAnswer[i]=='' )
            {
                flagEmpty=1;
            }
            else
            {
                flagFill=1;
            }
        }

        if(flagEmpty==1 && flagFill==0)   //all are empty(probably deleted)
        {
            return 2;
        }
        if(flagEmpty==1)
        {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        console.log('checkSubQuestionsHalfAnswered',props.answersFromStore['lastUpdatedIndex'])
       
        if(QuestionsStatus[props.answersFromStore['lastUpdatedIndex']])
        {
            if(checkSubQuestionsHalfAnswered(props.answersFromStore['lastUpdatedIndex'])==1)
            {
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].answered=false;
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].halfanswered=true;
            }
            else if(checkSubQuestionsHalfAnswered(props.answersFromStore['lastUpdatedIndex'])==2)
            {
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].halfanswered=false;
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].answered=false;
            }
            else
            {
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].halfanswered=false;
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].answered=true;
            }
        }

        setQuestionsStatus({...QuestionsStatus})
        setQuestionsStatusFromProps({...props.answersFromStore})  
    }, [props.answersFromStore])

    const debouncedEventHandler = useMemo(
        () => debounce(getAllQuestions, 300)
      , []);

    function getAllQuestions()
    {
        console.log('called  debounce(getAllQuestions,500);')
        let QuesArr = [];
        let rbody = {
            "UserName":"bala23",
            "Password":"Sample@7774",
            "RememberMe":true
            }
        var requestOptions = {
        method: 'POST',
        body: JSON.stringify(rbody),
        redirect: 'follow',
        headers:{'Content-Type':'application/json'}
        };

        fetch("https://api.domockexam.com/account/login", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result);})
        .then(()=>{
            Promise.all(
                testIds.map(el => {
                    return new Promise((resolve) => {
                    fetch(`https://api.domockexam.com/studenttest/getquestions?questionid=${el}`,requestOptions)
                        .then(response => {
                        return new Promise(() => {
                            response.json()
                            .then(res => {
                             //   console.log('res',res)
                                if(res.question!=null)
                                {
                                    QuesArr.push(res.question);
                                }
                                resolve()
                            })
                        })
                        })
                    })
                })
                )
                .then(() => {
                    setQuestions(QuesArr) ;
                    console.log('quesarr ',QuesArr)
                   // setLoading(false);
                    console.log('All questions loaded');
                    
                })
        })
        .catch(error => console.log('error', error));

        
        
    }
    useEffect(() => {
        if(Questions.length>0)
        {
            getQuestionInitialStatus();
            setcurrentId(0);
        }
    }, [Questions])


    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    const getQuestionByCurrentId = () => {
        setQuestion(Questions[currentId]); // currentId-1 for temporary, because its retrieving from static json, will change with api 
        let obj=QuestionsStatus[currentId];
        setQuestionsStatus({...QuestionsStatus,[currentId]:{...obj,visited:true}});
        scrollToTop();
        if(Questions[currentId].qusType=='MCQ')
            setQuestionToggle(false);
        else
            setQuestionToggle(true);
    }
    const moveForward = () => {
        if(currentId!=Questions.length-1)
        setcurrentId((prev)=>prev+1)
    }
    const moveBackward = () => {
        if(currentId>0)
        setcurrentId((prev)=>prev-1)
    }
    useEffect(() => {
        if(currentId!=null && Questions.length>0 )
        {
            getQuestionByCurrentId();
        }
    }, [currentId])
    useEffect(() => {
        if(Question?.qusID)
        {
            setLoading(()=>false);
        }
    }, [Question])
   
    //
 
    let seconds = 60;
    let minutes = testIds.length * 1;
    useEffect(()=>{
      {
    let myInterval = setInterval(() => {
        if(document.getElementById('minutes'))
            {
                if(minutes<10)
                {
                    document.getElementById('minutes').innerHTML = "0"+minutes;
                }
                else
                document.getElementById('minutes').innerHTML = minutes;

                if(minutes<5)
                {
                    document.getElementById('time').classList.add('timeLimit');
                    document.getElementById('time').style.background="red";
                }
            }
            if (seconds > 0) {
                
                if(document.getElementById('seconds'))
                {
                    if(seconds<10)
                    {
                        document.getElementById('seconds').innerHTML = "0"+seconds;
                    }
                    else
                    document.getElementById('seconds').innerHTML = seconds;
                }
                seconds -= 1;
                //setSeconds((seconds)=>(seconds - 1));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    seconds=59;
                    
                    if(document.getElementById('minutes'))
                    {
                        if(minutes<10)
                        {
                            document.getElementById('minutes').innerHTML = "0"+minutes;
                        }
                        else
                        document.getElementById('minutes').innerHTML = minutes;
                    }  
                    minutes -= 1;  
                    // setMinutes((minutes)=>minutes - 1);
                    // setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
        }
    },[TestStarted]);
    const setCurrentQuestion = (id) => {
        setcurrentId(id);
        //setQuestionToggle(true);
    }
    return (
        <div className="container-fluid" style={{height:window.screen.width>770 ?'85vh':'',overflow:'hidden'}}>
            <h3 className="d-flex justify-content-center align-items-center">Test Page</h3>
            
            {
                TestStarted == false ?
                <div className="d-flex justify-content-center align-items-center flex-column" style={{height:'85vh'}}>
                   
                    <Instructions /> 
                    <p></p>
                    <div >
                        <Button onClick={()=>{setTestStarted(true); debouncedEventHandler()}} variant="primary">Start Test</Button>
                    </div>
                </div> 
                :
                Loading ? 
                <div className="d-flex justify-content-center align-items-center" style={{overflow:'hidden'}}> 
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="container-fluid" style={{height:'100%'}}>
                    <div className="row ">
                        <div className="col-md-8 col-12" > 
                            <div  className="row">
                                <Card style={{backgroundColor:'#b3cccc',color:'white',borderStyle:'none'}}>
                                    <Card.Body>
                                        
                                        { window.screen.width<=770 &&  
                                       <Card.Text>
                                            <Button id="time" style={{margin:'5px',width:'100%'}} variant="success">
                                              
                                                <span >Time Remaining : </span> <b ><span id="minutes">HH</span> : <span id="seconds" >MM</span></b>
                                            </Button>
                                            <hr></hr>
                                        </Card.Text>

                                        }

                                        <Card.Text style={{display:'flex',justifyContent:'space-between'}}>
                                                {/* <b>Section : SectionName</b>
                                                <b>Part :  PartName</b> */}
                                                <b><i>Question {currentId+1} of {Questions.length}</i></b>
                                                <b>Marks : {Question.mark}</b>
                                        </Card.Text>
                                    </Card.Body>   
                                </Card>
                            </div>
                            <div className="row">
                            <Card style={{paddingBottom:'20px'}}>
                                <>
                                    <Card.Title className="">
                                         {Question.qusID}  {Question.qusType} 
                                    </Card.Title>
                                    <Card.Text style={{height:'50vh',overflow:'auto'}}>
                                    <>
                                    {

                                        Question!=null && 
                                        <>
                                        {Question.qusType=='MCQ' && <Q6 el={Question} qusID={Question.qusID} index={currentId} key={Question.qusID} /> }
                                       
                                        {Question.qusType=='True or False' && <Q8 el={Question} qusID={Question.qusID} index={currentId} key={Question.qusID} /> }

                                        {   
                                            Question.qusType=="Gap Filling" && (
                                            Question.options.length>=5 ? <Fillin el={Question} qusID={Question.qusID} index={currentId} key={Question.qusID} /> 
                                            :
                                            <Q4 el={Question} qusID={Question.qusID} index={currentId} key={currentId} /> 
                                            )
                                        }

                                        {Question.qusType=='One word answer' && <Q1 el={Question} qusID={Question.qusID}  index={currentId} key={Question.qusID} />}

                                        {Question.qusType=='Match the following' && <Match el={Question} qusID={Question.qusID} index={currentId} key={Question.qusID}  />}
                                        </>
                                    }
                                       
                                    </>
                                    </Card.Text>
                                </>   
                            </Card>
                            </div>
                            <div  className="row" >
                                <Card style={{backgroundColor:'#999999',color:'white',borderStyle:'none'}}>
                                    <Card.Body>
                                        <Card.Text className="row align-items-center">
                                            
                                            <div className="col-md-1 col-4">
                                            {
                                                currentId !=0 ?
                                                 <Button variant="primary" style={{width:'100%'}}onClick={()=>{moveBackward();scrollToTop()}}><i class="fa fa-backward"></i></Button>
                                                 :
                                                 <Button variant="secondary" style={{width:'100%'}} disabled={true} ><i class="fa fa-backward"></i></Button>
                                            }
                                            </div>
                                            <Button className="col-md-3 col-4" variant="warning" onClick={()=>{
                                                                let temp = QuestionsStatus;
                                                                temp[currentId].flagged = temp[currentId].flagged?false:true;
                                                                setQuestionsStatus({...temp})
                                                                }}  >
                                                <i style={{color:QuestionsStatus[currentId].flagged?'red':'white',marginRight:'5px'}}
                                                
                                                class="fa fa-flag"></i> 
                                                Mark for Review
                                            </Button>
                                            
                                            <div className="offset-md-5 col-md-3 col-4">
                                            {
                                                currentId !=Questions.length-1 
                                                ?
                                                <Button variant="primary" style={{width:'100%'}} onClick={()=>{moveForward();scrollToTop()}} ><i class="fa fa-forward"></i></Button>
                                                
                                                :
                                                <Button  style={{maxWidth:'200px',border:'2px solid green'}} variant="success">Submit And Exit Test</Button>
                                            }
                                            </div>
                                        </Card.Text>
                                    </Card.Body>   
                                </Card>
                            </div>
                            
                            
                        </div>
                        <div className="col-md-4 col-12" style={{height:'80vh',overflow:'scroll'}}> 
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">  </Card.Title>
                                    <Card.Text className="">
                                       
                                        { window.screen.width>770 &&  
                                        <div >
                                            <Button id="time" style={{margin:'5px',width:'100%'}} variant="success">
                                              
                                                <span >Time Remaining : </span> <b ><span id="minutes">HH</span> : <span id="seconds" >MM</span></b>
                                            </Button>
                                            <hr></hr>
                                        </div>
                                        }
                                        
                                        
                                        <div className="">
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="primary">Answered</Button> 
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="secondary">Not Answered</Button>
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="dark">Not Visited</Button>
                                            <br></br>
                                            <Button style={{margin:'5px',fontSize:'12px',border:'2px solid black'}} variant="light">Selected</Button>
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="warning">Marked</Button>
    
                                        </div>
                                        <hr></hr>
                                        <div className="row">
                                        {
                                            Questions.map((el,index) => 
                                            <>
                        <div className="col-2 text-center">
                        {
                                                    index != currentId ? 
                        QuestionsStatus[index].answered==true && QuestionsStatus[index].flagged==true ? 
                        <Button  class="btn"  style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                        onClick={()=>setCurrentQuestion(index)} >{(index+1)<10?"0"+(index+1):(index+1)}</Button>
                        :
                        QuestionsStatus[index].answered==true ? 
                        <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold'}} 
                        onClick={()=>setCurrentQuestion(index)}  variant="primary">{(index+1)<10?"0"+(index+1):(index+1)}</Button>
                        :
                        QuestionsStatus[index].flagged==true && QuestionsStatus[index].halfanswered==true ? 
                        <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',backgroundImage:'linear-gradient(to right, #007bff 0%, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                        onClick={()=>setCurrentQuestion(index)} >{(index+1)<10?"0"+(index+1):(index+1)}</button>
                        :
                        QuestionsStatus[index].halfanswered==true?
                        <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                        onClick={()=>setCurrentQuestion(index)}>{(index+1)<10?"0"+(index+1):(index+1)}</button>
                        :
                        QuestionsStatus[index].flagged==true ? 
                        <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold'}} 
                        onClick={()=>setCurrentQuestion(index)}  variant="warning">{(index+1)<10?"0"+(index+1):(index+1)}</Button>
                        :
                        QuestionsStatus[index].visited==true ? 
                        <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold'}} 
                        onClick={()=>setCurrentQuestion(index)}  variant="secondary">{(index+1)<10?"0"+(index+1):(index+1)}</Button> 
                        :
                        <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold'}} 
                        onClick={()=>setCurrentQuestion(index)}  variant="dark">{(index+1)<10?"0"+(index+1):(index+1)}</Button> 
                        : 
                        !QuestionToggle ? <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',
                        border:'2px solid black',fontWeight:'bold'}} 
                        onClick={()=>{setcurrentId(index);setQuestionToggle((pQuestionToggle)=>!pQuestionToggle)}}  variant="light">
                        {(index+1)<10?"0"+(index+1):(index+1)}</Button> : ''

                        }  
                        </div>
                        {
                            //SUBQUESTIONs                       
                            index == currentId && QuestionToggle && 
                                <span style={{background:'#e6fff9'}}>
                                   {
                                       QuestionToggle &&
                                       <>
                                       <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold'}} 
                                       onClick={()=>{setcurrentId(index);setQuestionToggle((pQuestionToggle)=>!pQuestionToggle)}}  variant="light">
                                       {(index+1)<10?"0"+(index+1):(index+1)}</Button>
                                   <div className="d-flex flex-row flex-wrap">
                                    {
                                        
                                        el.qusType!='MCQ' &&  el.options.map((op,idx)=>
                                            <>
                                           
                                                {<Button key={props.answersFromStore[Number(index)]?.selectedAnswer[idx]?'true'+index+''+idx:'false'+index+''+idx} 
                                                style={{margin:'2px',display:'flex',justifyContent:'center',fontSize:'11px',fontWeight:'bold'}}
variant={props.answersFromStore[Number(index)] ? props.answersFromStore[Number(index)].selectedAnswer[idx]!=undefined&&props.answersFromStore[Number(index)].selectedAnswer[idx]!=''?'primary':'secondary':'secondary'} >{idx+1}
                                               
                                                </Button> }
                                            </>
                                        )
                                    }
                                   
                                    </div>
                                    </>
                                }
                                </span>
                        }
                                                  
                                                
                                            </>
                                            )
                                        }
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div> 
            }
           
        </div>
    )
}

//export default Test;

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
  export default connect(mapStateToProps,mapDispatchToProps)(Test);
