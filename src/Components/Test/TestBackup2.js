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
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavigationBlocker from '../HelperComps/NavigationBlocker';
import Popup from '../HelperComps/Popup'
import TestStatus from './TestStatus';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings'


// import Questions from '../QuestionPaper/Questions.json';

function Test(props) {
        
    const [Questions, setQuestions] = useState({});
    const [TestStarted, setTestStarted] = useState(false);
    
    const [Loading, setLoading] = useState(true);
    
    const [Sections, setSections] = useState([]);
    const [SectionsStatus, setSectionsStatus] = useState({})
   
    const [currentSectionId, setcurrentSectionId] = useState(null);
   // let [currentIds, setcurrentIds] = useState([]);
    const [QuestionToggle, setQuestionToggle] = useState(true);
    const [QuestionsStatus, setQuestionsStatus] = useState({});
    const [QuestionsStatusFromProps, setQuestionsStatusFromProps] = useState(props.answersFromStore);

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const QuestionsByTest = useSelector(state => state.GetQuestionsByTestReducer.QuestionsByTest)
    const TestDetails = useSelector(state => state.GetQuestionsByTestReducer.testdetails);
    const [showModal, setshowModal] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);
    const [showTestStatus, setshowTestStatus] = useState(false)

    useEffect(() => {
        if(QuestionsByTest==undefined)
        {
            if(location?.state?.previousPath!='/exams')
            {
                history.push('/exams');
            }
            else
            {

            }
        }
        else
        {
            //console.clear();
            //  console.log('QuestionsByTest',QuestionsByTest);
            let qArr={}
            let sects=[];
            let sectflag=0;
            for(let i=0;i<QuestionsByTest.length;i++)
            {
                sectflag=0;
                if(QuestionsByTest[i].section!=0)
                {
                    sects.push(QuestionsByTest[i])
                }
                else
                {
                    sectflag=1;
                }
                        
                for(let j=0;j<QuestionsByTest[i].questions.length;j++)
                {
                        qArr[QuestionsByTest[i].questions[j].qusID]=QuestionsByTest[i].questions[j];
                        if(sectflag==1)
                        {
                            sects.push({questions:[QuestionsByTest[i].questions[j]],section:0})
                        }
                }
            }
            setQuestions({...qArr});
            setSections([...sects])
        }
    }, [QuestionsByTest,TestDetails])

    const StartTest = () => {
        let reqBody = {
            "StudentId":Number(getCookie('domockexamID')),
            "TestId":TestDetails.id,
            "Assigner":3,
            "AssignedOn":new Date().toISOString(),
            "StatusId":1,
            "Active":true
        }
        
        console.log('rb',reqBody)
       dispatch({type:'SAVE_STUDENT_TEST_REQUESTED',payload:reqBody});
    }
    
    const submitAndExitTest = () => {
        setshowModal(true);
        //showTestStatus(true);
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
        if(clickedyes)
        {
            setSubmitClicked(true)
            if(submitClicked)
            {
                //history.push('/report');
                history.push({pathname:'/report',state:{TimeTaken:document.getElementById('minutes').innerHTML+':'+document.getElementById('seconds').innerHTML}});
            }
            //dispatch({type:'CLEAR_QUESTIONS_BY_TEST',payload:undefined});
           // history.push('/report');
        }
        setshowModal(clickedclose);
    }

 
    const getQuestionInitialStatus = () => {

        let obj = 
        {
            visited:false,
            answered:false,
            flagged:false,
            halfanswered:false,
            flagged:false
        }
        let status = {}
        for(let key in Questions)
        {
             status[Questions[key].qusID]={...obj};
        }
        setQuestionsStatus(status);

        let objSection = 
        {
            visited:false,
            answered:false,
            flagged:false,
            halfanswered:false,
            flagged:false
        }
        let statusSection = {}
        for(let i=0;i<Sections.length;i++)
        {
            statusSection[i]={...objSection};  //because of currentID - using i - section(top most)
        }
        statusSection[0].visited=true;
       // console.log('SS',statusSection)
        setSectionsStatus(statusSection);
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
        let sectIdex = props.answersFromStore['lastUpdatedSectionIndex']
   
        if(sectIdex!=undefined){
            
            let answered = 0;
            let halfanswered=0;
         
            for(let i=0;i<Sections[sectIdex].questions.length;i++)
            {
                let qusID =Sections[sectIdex].questions[i].qusID; 
                if(QuestionsStatus[qusID].answered==true)
                {
                    answered=1;
                }
                else if(QuestionsStatus[qusID].halfanswered==true || QuestionsStatus[qusID].answered==false)
                {
                    answered=0;
                    halfanswered=1;
                }
            }
            if(halfanswered==1)
            {
                SectionsStatus[sectIdex].halfanswered=true;
            }
            else if(answered==1)
            {
                SectionsStatus[sectIdex].answered=true;  //first checks halfanswered , if it is true , then it cant be fully answered
            }
            else if(halfanswered==0)
            {
                SectionsStatus[sectIdex].halfanswered=false;
            }
       
            setSectionsStatus({...SectionsStatus})
        }
    },[props.answersFromStore,currentSectionId])

    useEffect(() => {
        console.log(props.answersFromStore['lastUpdatedIndex'])
       
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
       // FormulateSectionStatus(props.answersFromStore['lastUpdatedSectionIndex'])
        setQuestionsStatusFromProps({...props.answersFromStore})  
        

        console.log('QuestionsStatus',QuestionsStatus,currentSectionId)
        //SAVE_ANSWER_LOG_REQUESTED

        let lui = props.answersFromStore['lastUpdatedIndex'];
        console.log(lui,props.answersFromStore[lui])
        if(lui && props.answersFromStore[lui]!=undefined){
        let reqBodySaveAnswerLog = {
            "StudentTestId":Number(getCookie('domockexamStudentTestId')),
            "TestId":TestDetails.id,
            "QuestionId":props.answersFromStore[lui]?.qusId,
            "StartTime":"",
            "EndTime":"",
            "CorrectAnswers":props.answersFromStore[lui]?.selectedAnswer,
            "OptionId":0
        }
        console.log(reqBodySaveAnswerLog);
        dispatch({type:'SAVE_ANSWER_LOG_REQUESTED',payload:reqBodySaveAnswerLog});
        }
    }, [props.answersFromStore]);

    
    
    useEffect(() => {
        if(Object.keys(Questions).length>0)
        {
            getQuestionInitialStatus();
            setcurrentSectionId(0);
        }
    }, [Questions])


    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    const getQuestionBycurrentSectionId = () => {
       {
            for(let j=0;j<Sections[currentSectionId]?.questions.length;j++)
            {
                QuestionsStatus[Sections[currentSectionId].questions[j].qusID].visited=true;
            }
        }
        setQuestionsStatus({...QuestionsStatus})
    }
    const moveForward = () => {
        if(currentSectionId!=Sections.length-1)
        {
            sectionIdChange(currentSectionId+1)
        }
    }
    const moveBackward = () => {
        if(currentSectionId>0)
        {
            sectionIdChange(currentSectionId-1);
        }
    }
    useEffect(() => {
        if(currentSectionId!=null && Object.keys(Questions).length>0 )
        {
            getQuestionBycurrentSectionId();
            setQuestionToggle(true);
        }
    }, [currentSectionId]);

    useEffect(() => {
  
        if(Sections[currentSectionId])
        {
            setLoading(()=>false);
        }
    }, [currentSectionId])
   
    function sectionIdChange(id)  {
       // console.log('sectionIdChange',id)
        setcurrentSectionId(id);
        SectionsStatus[id].visited = true;
        setSectionsStatus({...SectionsStatus})
        scrollToTop();
    }
    //
 
    let seconds = 59;
    let minutes = (QuestionsByTest?.length-1) * 1;
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
                document.getElementById('minutes').innerHTML = ""+minutes;

                if(minutes<5)
                {
                    document.getElementById('time').classList.add('timeLimit');
                    document.getElementById('time').style.background="red";
                }
            }
            if (seconds >= 0) {
                
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
            }
            if (seconds === -1) {
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
                        document.getElementById('minutes').innerHTML = ""+minutes;
                    }  
                    minutes -= 1;  
                }
            }
            if(minutes==0 && seconds==0)
            {
                history.push('/report');
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
        }
    },[TestStarted]);

    function numToLetter(num){
        // var s = '', t;
      
        // while (num > 0) {
        //   t = (num - 1) % 26;
        //   s = String.fromCharCode(65 + t) + s;
        //   num = (num - t)/26 | 0;
        // }
        // return s || undefined;
        if (isNaN(num))
        return NaN;
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
      }

    return (
        <div className="container-fluid" style={{height:window.screen.width>770 ?'85vh':''}}>
            {/* <NavigationBlocker /> */}
            {showModal && <Popup title="Submit Test" body="Are you sure you want to submit test?" returnStateHandler={returnStateHandler} />}
            <div className="d-flex justify-content-between">
                <div><b>Title</b> : {TestDetails?.title}</div>
                <div><b>Subject</b> : {TestDetails?.subjectName}</div>
                <div><b>Grade</b> : {TestDetails?.gradeName}</div>
                {/* <div><b>Duration</b> : {TestDetails?.duration}</div> */}
                <div><b>Test ID</b> : {TestDetails?.id}</div>
              
            </div>
            
            {
                TestStarted == false ?
                <div className="d-flex justify-content-center align-items-center flex-column" style={{height:'85vh'}}>
                   
                    <Instructions /> 
                    <p></p>
                    <div >
                        <Button onClick={()=>{setTestStarted(true);StartTest();}} variant="primary">Start Test</Button>
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
               
                showTestStatus ?
                <div>
                        <TestStatus Sections={Sections} QuestionsStatus={QuestionsStatus} />
                </div>
                :
                <div className="container-fluid" style={{height:'100%'}}>
                    <div className="row ">
                        <div className="col-md-8 col-12" > 
                            <div  className="row">
                                <Card style={{backgroundColor:'#999999',color:'white',borderStyle:'none',height:'35px',display:'flex',justifyContent:'center'}}>
                                    <div className="d-flex flex-row justify-content-between">
                                        <div >
                                                <b><i>Section {currentSectionId+1} of {QuestionsByTest.length}</i></b>
                                                {/* <b>Marks : {Question.mark}</b> */}
                                        </div>
                                        <div>
                                            <Button id="time" style={{height:'100%'}} variant="success">
                                              
                                                <span ></span> <b ><span id="minutes">MM</span> : <span id="seconds" >SS</span></b>
                                            </Button>
                                        </div>
                                    </div>  
                                </Card>
                            </div>
                            <div className="row">
                            {
                                 submitClicked ?
                                 <div className="d-flex justify-content-center align-items-center flex-column" style={{overflow:'hidden'}}> 
                                     <TestStatus QuestionsStatus={QuestionsStatus} SectionsStatus={SectionsStatus} Sections={Sections} />
                                     <Button variant="primary" onClick={()=>{setSubmitClicked(false)}}> Go Back </Button>
                                 </div>
                                 :
                                <Card style={{paddingBottom:'20px',height:'70vh',overflow:'auto'}}>
                                {
                                    Sections[currentSectionId].questions.map((Question,index)=>
                                <>
                                    <Card.Title className="">
                                         {Question.qusID}  {Question.qusType} 
                                    </Card.Title>
                                    <Card.Text style={{}}>
                                    <>
                                    {

                                        Question!=null && 
                                        <>
                                        {Question.qusType=='MCQ' && <Q6 el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID} /> }
                                       
                                        {Question.qusType=='True or False' && <Q8 el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID} /> }

                                        {   
                                            Question.qusType=="Gap Filling" && (
                                           // Question.options.length>=5 ? 
                                            <Fillin el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID} /> 
                                           // :
                                            // <Q4 el={Question} qusID={Question.qusID} index={Question.qusID} key={currentId} /> 
                                            )
                                        }

                                        {Question.qusType=='One word answer' && <Q1 el={Question} sectionID={currentSectionId} qusID={Question.qusID}  index={Question.qusID} key={Question.qusID} />}

                                        {Question.qusType=='Match the following' && <Match el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID}  />}
                                        
                                        {Question.qusType=='Re-Ararnge' && <Rearrange el={Question} sectionID={currentSectionId} qusID={Question.qusID}  index={Question.qusID} key={Question.qusID} />}
                                        </>
                                    }
                                       
                                    </>
                                    </Card.Text>
                                    <hr></hr>
                                </>
                                    )
                                }   
                            </Card>
                            }
                            </div>
                            <div  className="row" >
                                <Card style={{backgroundColor:'#999999',color:'white',borderStyle:'none',height:'35px'}}>
                                    <>
                                        <div style={{height:'100%'}} className="row ">
                                            
                                            <div style={{height:'100%'}} className="col-md-1 col-4">
                                            {
                                                currentSectionId !=0 ?
                                                 <Button variant="primary" style={{width:'100%',height:'100%'}}onClick={()=>{moveBackward();scrollToTop()}}><i class="fa fa-backward"></i></Button>
                                                 :
                                                 <Button variant="secondary" style={{width:'100%',height:'100%'}} disabled={true} ><i style={{height:'100%'}} class="fa fa-backward"></i></Button>
                                            }
                                            </div>
                                            <Button disabled={true} style={{height:'100%'}} className="col-md-3 col-4" variant="warning" onClick={()=>{
                                                                let temp = SectionsStatus;
                                                                temp[currentSectionId].flagged = temp[currentSectionId].flagged?false:true;
                                                                setSectionsStatus({...temp})
                                                                }}  >
                                                <i style={{color:SectionsStatus[currentSectionId].flagged?'red':'white',marginRight:'5px'}}
                                                
                                                class="fa fa-flag"></i> 
                                                Mark for Review
                                            </Button>
                                            
                                            <div style={{height:'100%'}} className="offset-md-5 col-md-3 col-4">
                                            {
                                                currentSectionId !=Sections.length-1 
                                                ?
                                                <Button variant="primary" style={{width:'100%',height:'100%'}} onClick={()=>{moveForward();scrollToTop()}} ><i class="fa fa-forward"></i></Button>
                                                
                                                :
                                                <Button  style={{maxWidth:'200px',border:'2px solid green',height:'100%'}} onClick={()=>submitAndExitTest()} variant="success">Submit And Exit Test</Button>
                                            }
                                            </div>
                                        </div>
                                    </>   
                                </Card>
                            </div>
                            
                            
                        </div>
                        <div className="col-md-4 col-12" style={{height:'80vh',overflow:'auto'}}> 
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center">  </Card.Title>
                                    <Card.Text className="">
                                        <div >
                                            {/* <Button id="time" style={{margin:'5px',width:'100%'}} variant="success">
                                              
                                                <span ></span> <b ><span id="minutes">MM</span> : <span id="seconds" >SS</span></b>
                                            </Button> */}
                                        </div>
                                        {/* <hr></hr> */}
                                        <div className="">
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="primary">Answered</Button> 
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="secondary">Not Answered</Button>
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="dark">Not Visited</Button>
                                            <br></br>
                                            <Button style={{margin:'5px',fontSize:'12px',border:'2px solid black'}} variant="light">Selected</Button>
                                            <Button style={{margin:'5px',fontSize:'12px'}} variant="warning">Marked</Button>
    
                                        </div>
                                        <hr></hr>
        <div className="">
            <div className="d-flex flex-row flex-wrap ">
                {
                Sections!=null &&  Sections?.map((section,index) => 
                <>
                <>
                    <span className="" style={{background:index==currentSectionId&&QuestionToggle?'lightblue':'',padding:''}}>
                    {
                        index != currentSectionId ? 
                        SectionsStatus[index].answered==true && SectionsStatus[index].flagged==true ? 
                        <Button  class="btn"  style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'13px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                        onClick={()=>sectionIdChange(index)} >{(numToLetter(index+1))<10?"0"+(numToLetter(index+1)):numToLetter(index+1)}</Button>
                        :
                        SectionsStatus[index].answered==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'13px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="primary">{(numToLetter(index+1))<10?"0"+(numToLetter(index+1)):(numToLetter(index+1))}</Button>
                        :
                        SectionsStatus[index].flagged==true && SectionsStatus[index].halfanswered==true ? 
                        <button class="btn" style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'13px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                        onClick={()=>sectionIdChange(index)} >{(numToLetter(index+1))<10?"0"+(numToLetter(index+1)):(numToLetter(index+1))}</button>
                        :
                        SectionsStatus[index].halfanswered==true?
                        <button class="btn" style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'13px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                        onClick={()=>sectionIdChange(index)}>{(numToLetter(index+1))<10?"0"+(numToLetter(index+1)):(numToLetter(index+1))}</button>
                        :
                        SectionsStatus[index].flagged==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'13px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="warning">{(numToLetter(index+1))<10?"0"+(numToLetter(index+1)):(numToLetter(index+1))}</Button>
                        :
                        SectionsStatus[index].visited==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'13px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="secondary">{(numToLetter(index+1))<10?"0"+(numToLetter(index+1)):(numToLetter(index+1))}</Button> 
                        :
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'13px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="dark">{(numToLetter(index+1))<10?"0"+(numToLetter(index+1)):(numToLetter(index+1))}</Button> 
                        : 
                        !QuestionToggle && <Button style={{margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold',fontSize:'13px'}} 
                        onClick={()=>{sectionIdChange(index);setQuestionToggle((pQuestionToggle)=>!pQuestionToggle)}}  variant="light">
                        {(numToLetter(index+1))<10?"0"+numToLetter(index+1):numToLetter(index+1)}</Button>

                    }
                    </span> 
                     
              
                    { index==currentSectionId &&    QuestionToggle &&  
                    <>
                        <div style={{background:'lightblue',width:'100%'}}  >
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold',fontSize:'13px'}} 
                                onClick={()=>{sectionIdChange(index);setQuestionToggle((pQuestionToggle)=>!pQuestionToggle)}}  variant="light">
                                {(numToLetter(index+1))<10?"0"+numToLetter(index+1):numToLetter(index+1)}</Button>
                        </div>
                        <div style={{background:'lightblue',width:'100%'}} className="d-flex flex-row flex-wrap" >
                                    {
                                    
                                    Sections[currentSectionId].questions.map((el,ind)=>
                                    <div style={{padding:'10px'}}>
                                    <div className="d-flex flex-row ">
                                    <div className="">       
                                    {
                                                                    el.qusID  ? 
                                    QuestionsStatus[el.qusID].answered==true && QuestionsStatus[el.qusID].flagged==true ? 
                                    <Button  class="btn"  style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'11px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                                    >{(ind+1)<10?"0"+(ind+1):(ind+1)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].answered==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'11px'}} 
                                    variant="primary">{(ind+1)<10?"0"+(ind+1):(ind+1)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].flagged==true && QuestionsStatus[el.qusID].halfanswered==true ? 
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'11px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                                    >{(ind+1)<10?"0"+(ind+1):(ind+1)}</button>
                                    :
                                    QuestionsStatus[el.qusID].halfanswered==true?
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'11px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                                    >{(ind+1)<10?"0"+(ind+1):(ind+1)}</button>
                                    :
                                    QuestionsStatus[el.qusID].flagged==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'11px'}} 
                                        variant="warning">{(ind+1)<10?"0"+(ind+1):(ind+1)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].visited==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'11px'}} 
                                        variant="secondary">{(ind+1)<10?"0"+(ind+1):(ind+1)}</Button> 
                                    :
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'11px'}} 
                                        variant="dark">{(ind+1)<10?"0"+(ind+1):(ind+1)}</Button> 
                                    : 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold',fontSize:'11px'}} 
                                        variant="light">
                                    {(ind+1)<10?"0"+(ind+1):(ind+1)}</Button> 
                                    
                                        
                                    }
                                    </div>
                                    <div className="">
                                            <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'15px'}} 
                                                     variant="warning" onClick={()=>{

                                                                QuestionsStatus[el.qusID].flagged = QuestionsStatus[el.qusID].flagged?false:true;
                                                                setQuestionsStatus({...QuestionsStatus});
                                                                let flag=0;
                                                                if(QuestionsStatus[el.qusID].flagged)
                                                                {
                                                                    SectionsStatus[currentSectionId].flagged = true;
                                                                    setSectionsStatus({...SectionsStatus});
                                                                    flag=1;
                                                                }
                                                                if(flag==0)
                                                                for(let f=0;f<Sections[currentSectionId].questions.length;f++)
                                                                {
                                                                    
                                                                    let qID = Sections[currentSectionId].questions[f].qusID;
                                                                    if(QuestionsStatus[qID].flagged==true)
                                                                    {
                                                                            flag=1;
                                                                    }
                                                                    if(flag==1)
                                                                    {
                                                                        SectionsStatus[currentSectionId].flagged=true;
                                                                    }
                                                                    else
                                                                    {
                                                                        SectionsStatus[currentSectionId].flagged=false;
                                                                    }
                                                                }
                                                                
                                                                }}  >
                                                <i style={{color:QuestionsStatus[el.qusID].flagged?'red':'white'}}
                                                
                                                class="fa fa-flag"></i> 
                                                
                                            </Button>
                                    </div>
                                    </div>
                                    {
                                        //SUBQUESTIONs                       
                                            <div >
                                                {
                                                    <>
                                                <div className="d-flex flex-row flex-wrap">
                                                {
                                                    
                                                    el.qusType!='MCQ' &&  el.options.map((op,idx)=>
                                                        <>
                                                        
                                                            {<Button key={props.answersFromStore[Number(el.qusID)]?.selectedAnswer[idx]?'true'+el.qusID+''+idx:'false'+el.qusID+''+idx} 
                                                            style={{margin:'2px',fontSize:'10px',fontWeight:'bold'}}
                variant={props.answersFromStore[Number(el.qusID)] ? props.answersFromStore[Number(el.qusID)].selectedAnswer[idx]!=undefined&&props.answersFromStore[Number(el.qusID)].selectedAnswer[idx]!=''?'primary':'secondary':'secondary'} >{idx+1}
                                                            
                                                            </Button> }
                                                        </>
                                                    )
                                                }
                                                
                                                </div>
                                                </>
                                            }
                                            </div>
                                    }
                          </div>
                          )
                      }
                        </div>
                    
                    </>
                    }
               
            </>              
            </>
            )
            }
            </div>
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
