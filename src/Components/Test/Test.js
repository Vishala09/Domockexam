//updating sub questions from props ; updating main question from initialStatus [answered,visited,flagged] 

import React, { useEffect, useState } from 'react'
import Q1 from '../QuestionPaper/Q1';
import Q4 from '../QuestionPaper/Q4';
import Q5 from '../QuestionPaper/Q5';
import MCQ from '../QuestionPaper/MCQ';
import Q7 from '../QuestionPaper/Q7';
import TrueOrFalse from '../QuestionPaper/TrueOrFalse';
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
import { openFullscreen} from '../HelperFunctions/FullScreen'

import NavigationBlocker from '../HelperComps/NavigationBlocker';
import Popup from '../HelperComps/Popup'
import TestStatus from './TestStatus';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings'
import { numToRoman } from '../HelperFunctions/NumToRoman';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import DropDown from '../QuestionPaper/DropDown';
import QuestionPallet from './QuestionPallet';


// import Questions from '../QuestionPaper/Questions.json';

function Test(props) {
        
    const [Questions, setQuestions] = useState({});
    const [TestStarted, setTestStarted] = useState(false);
    
    const [Loading, setLoading] = useState(true);
    
    const [Sections, setSections] = useState([]);
    const [SectionsStatus, setSectionsStatus] = useState({});
    
   
    const [currentSectionId, setcurrentSectionId] = useState(null);
    const [currentSubSectionSingleId, setcurrentSubSectionSingleId] = useState(0);
    const [QuestionToggle, setQuestionToggle] = useState(true);
    const [SubSectionToggle, setSubSectionToggle] = useState(true);
    const [QuestionsStatus, setQuestionsStatus] = useState({});

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const QuestionsByTest = useSelector(state => state.GetQuestionsByTestReducer.QuestionsByTest)  // LIST OF SECTIONS
    const TestDetails = useSelector(state => state.GetQuestionsByTestReducer.testdetails);
    const [showModal, setshowModal] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);
    const SectionCut = 5;



    useEffect(() => {
        console.log('TestDetails',TestDetails)
        if(QuestionsByTest==undefined)
        {
            if(location?.state?.previousPath!='/exams' && location?.state?.previousPath!='/assignedtests')
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
            let count=0;
            let singleseccount=0;
            let quesCount = 1;
            for(let i=0;i<QuestionsByTest.length;i++)
            {
                
                sectflag=0;
                if(QuestionsByTest[i].section!=0)
                {

                    sects.push({sections:[{questions:QuestionsByTest[i].questions,section:QuestionsByTest[i].section,qIndex:quesCount}],section:QuestionsByTest[i].section});
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
                           if(count%SectionCut==0 || count==0)
                           {
                                sects.push({sections:[{questions:[QuestionsByTest[i].questions[j]],section:0,qIndex:quesCount}],section:0});
                                singleseccount++;
                           }
                           else
                           {
                                let s = singleseccount-1;
                               sects[s].sections.push({questions:[QuestionsByTest[i].questions[j]],section:0,qIndex:quesCount});
                           }
                        
                            count++;

                        }
                        quesCount++;
                }
            }
            setQuestions({...qArr});
            setSections([...sects]);          
            console.log('sects',sects);
        }
    }, [QuestionsByTest,TestDetails])

    const StartTest = () => {
        //In progress
        let  previousPath = location?.state?.previousPath;
        let StudentTestId = location?.state?.StudentTestId;
        if(previousPath=='/assignedtests')
        {
            setCookie('domockexamStudentTestId',StudentTestId)

            let reqBody = [{
                "StudentTestId":Number(StudentTestId),
                "StatusId":2
            }]
           console.log('rb-updateTest',reqBody)
           dispatch({type:'UPDATE_STUDENT_TEST_STATUS_REQUESTED',payload:reqBody});
        }
        else{
            //1=student
            let reqBody = {
                "StudentId":Number(getCookie('domockexamID')),
                "TestId":TestDetails.id,
                "Assigner":1,
                "AssignedOn":new Date().toISOString(),
                "StatusId":2,
                "Active":true
            }
            console.log('rb-ASSIGNTESTBYSTUD',reqBody)
            dispatch({type:'SAVE_STUDENT_TEST_REQUESTED',payload:reqBody});
           
        }
    }
    
    const AssignedTest = useSelector(state => state.SaveStudentTestReducer);
    useEffect(() => {
        {
            if(AssignedTest.status==true)
            dispatch({type:'RESET_STUDENT_TEST'});
        }
    }, [AssignedTest]);

    const submitAndExitTest = () => {
                //
        if(submitClicked==false)
        {
            //setcurrentSectionId(Object.keys(Questions).length); // set it to higher number than actual number 
             setcurrentSectionId(Sections.length);
             setcurrentSubSectionSingleId(0);
            setSubmitClicked(true);
        }
        else
        {
            setshowModal(true);

        }
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
        if(clickedyes)
        {
            setSubmitClicked(true)
            if(submitClicked)
            {
                
                let totalseconds = (Number(TestDetails?.duration)) * 60;
                let ttseconds = Number(document.getElementById('minutes').innerHTML)*60 + Number(document.getElementById('seconds').innerHTML);
                history.push({pathname:'/report',state:{TimeTaken:(totalseconds - ttseconds),previousPath:'/test'}});
            }
        }
        setshowModal(clickedclose);
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
            halfanswered:false
        }
        let statusSection = {}
        for(let i=0;i<Sections.length;i++)
        {
            statusSection[i]={...objSection};  //because of currentID - using i - section(top most)
            for(let j=0;j<Sections[i].sections.length;j++)
            {
                statusSection[i][j]={};
                for(let k=0;k<Sections[i].sections[j].questions.length;k++)
                {
                    let qId = Sections[i].sections[j].questions[k].qusID;
                    statusSection[i][j][qId]={...objSection};
                    statusSection[i][j][qId].visited=true;
                }
            }
        }
        statusSection[0].visited=true;
        setSectionsStatus(statusSection);

        return status;
    }
    
    const checkSubQuestionsHalfAnswered = (index) => {
        let flagEmpty=0;
        let flagFill=0;
        for(let i=0;i<props.answersFromStore[index].selectedAnswer.length;i++)
        {
            if(props.answersFromStore[index].selectedAnswer[i]=='' || props.answersFromStore[index].selectedAnswer[i]=='Select Answer' )
            {
                flagEmpty=1;
            }
            else
            {
                flagFill=1;
            }
        }

        if((flagEmpty==1 && flagFill==0)||(flagEmpty==0 && flagFill==0))   //all are empty(probably deleted)
        {
            return 2;    //false false
        }
        if(flagEmpty==1)
        {
            return 1;   //false true
        }
        return 0;  //true false
    }

    useEffect(() => {
        let sectIdex = props.answersFromStore['lastUpdatedSectionIndex']
        if(sectIdex!=undefined){
            updateSectionStatus(sectIdex);
        }
    },[currentSectionId,props.answersFromStore['lastUpdatedIndex']])



    useEffect(() => {
        console.log('lastUpdatedIndex',props.answersFromStore['lastUpdatedIndex'])
       
        if(QuestionsStatus[props.answersFromStore['lastUpdatedIndex']])
        {
            if(checkSubQuestionsHalfAnswered(props.answersFromStore['lastUpdatedIndex'])==1)
            {
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].answered=false;
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].halfanswered=true;

                SectionsStatus[currentSectionId][currentSubSectionSingleId][props.answersFromStore['lastUpdatedIndex']].answered=false;
                SectionsStatus[currentSectionId][currentSubSectionSingleId][props.answersFromStore['lastUpdatedIndex']].halfanswered=true;
            }
            else if(checkSubQuestionsHalfAnswered(props.answersFromStore['lastUpdatedIndex'])==2)
            {
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].halfanswered=false;
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].answered=false;

                SectionsStatus[currentSectionId][currentSubSectionSingleId][props.answersFromStore['lastUpdatedIndex']].answered=false;
                SectionsStatus[currentSectionId][currentSubSectionSingleId][props.answersFromStore['lastUpdatedIndex']].halfanswered=false;
            }
            else
            {
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].answered=true;
                QuestionsStatus[props.answersFromStore['lastUpdatedIndex']].halfanswered=false;

                SectionsStatus[currentSectionId][currentSubSectionSingleId][props.answersFromStore['lastUpdatedIndex']].answered=true;
                SectionsStatus[currentSectionId][currentSubSectionSingleId][props.answersFromStore['lastUpdatedIndex']].halfanswered=false;
            }
        }
        setQuestionsStatus({...QuestionsStatus})
        setSectionsStatus({...SectionsStatus})
       // setQuestionsStatusFromProps({...props.answersFromStore})  
        

       // console.log('QuestionsStatus',QuestionsStatus,currentSectionId)
        //SAVE_ANSWER_LOG_REQUESTED

        let lui = props.answersFromStore['lastUpdatedIndex'];
       // console.log(lui,props.answersFromStore[lui])
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
       // console.log(reqBodySaveAnswerLog);
        dispatch({type:'SAVE_ANSWER_LOG_REQUESTED',payload:reqBodySaveAnswerLog});
        }
    }, [props.answersFromStore]);

    const updateSectionStatus = (sectIdex) => {
            let answered = -1;
            let halfanswered= -1;

        if(SectionsStatus[sectIdex]!=undefined )
        for(let sstatus in SectionsStatus[sectIdex])
        {
            
            if(typeof SectionsStatus[sectIdex][sstatus] == 'object')
            {
                for(let qstatus in SectionsStatus[sectIdex][sstatus])
                {
                    if(typeof SectionsStatus[sectIdex][sstatus][qstatus] == 'object'){
                    let secStats = SectionsStatus[sectIdex][sstatus][qstatus];
                                if(secStats.answered==true)
                                {
                                    if(answered==-1)
                                    {
                                        answered=1;     //make ans=1 once... if any other question is not ans or half answered , answered will become 0 in next cond
                                    }
                                    else if(answered==0)
                                    {
                                        halfanswered=1; //if answered is 1 till the end , it will override halfanswered's value
                                    }
                                }
                                else if(secStats.answered==false)
                                {
                                    if(answered==1)
                                    {
                                        answered=0;
                                        halfanswered=1;
                                    }
                                    else
                                    {
                                        answered=0;
                                    }
                                }
                                if(secStats.halfanswered==true)
                                {
                                    answered=0;
                                    halfanswered=1;
                                    break;
                                }
                    }
                }
            }
        }
            if(answered==1)
            {
                SectionsStatus[sectIdex].answered=true;  //first checks halfanswered , if it is true , then it cant be fully answered
                SectionsStatus[sectIdex].halfanswered=false;
            }
            else if(halfanswered==1)
            {
                SectionsStatus[sectIdex].halfanswered=true;
                SectionsStatus[sectIdex].answered=false;
            }
            
            else if(halfanswered==-1)
            {
                SectionsStatus[sectIdex].halfanswered=false;
                SectionsStatus[sectIdex].answered=false;
            }
            setSectionsStatus({...SectionsStatus})
    }
    
    useEffect(() => {
        if(Object.keys(Questions).length>0)
        {
            getQuestionInitialStatus();
            setcurrentSectionId(0);
            setcurrentSubSectionSingleId(0);
        }
    }, [Questions])


    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    const setStatusOnToggle = () => {
       {
        SectionsStatus[currentSectionId].visited = true;
          
        }
        setSectionsStatus({...SectionsStatus})
    }
    const moveForward = () => {
        //
        {
           // sectionIdChange(currentSectionId+1);
           if(Sections[currentSectionId].sections.length-1 > currentSubSectionSingleId)
           {
               subSectionIdChange(Sections[currentSectionId].sections[currentSubSectionSingleId+1].questions[0].qusID)
                setcurrentSubSectionSingleId(currentSubSectionSingleId=>(currentSubSectionSingleId+1))
           }
            else
            {
                if(currentSectionId!=Sections.length-1)
                sectionIdChange(currentSectionId+1);
            }
           // console.log(currentSubSectionSingleId)
        }
    }
    const moveBackward = () => {
        {
            if(currentSubSectionSingleId!=0)
            {
                
                {
                subSectionIdChange(Sections[currentSectionId].sections[currentSubSectionSingleId-1].questions[0].qusID);
                setcurrentSubSectionSingleId(currentSubSectionSingleId=>(currentSubSectionSingleId-1));
                }
            }
            else
            {
                let currsec = currentSectionId;

                if(currsec>0)
                {
                    let qusLen = Sections[currsec-1].sections.length;
                    subSectionIdChange(Sections[currsec-1].sections[qusLen-1].questions[0].qusID);
                    setcurrentSubSectionSingleId(()=>(qusLen-1));
                    

                    setSubmitClicked(false);
                    setcurrentSectionId(currsec-1);
                    SectionsStatus[currsec-1].visited = true;
                    SectionsStatus[currsec-1][0].visited = true;
                    setSectionsStatus({...SectionsStatus})
                }
            }
        }
    }
    useEffect(() => {
        if(currentSectionId!=null && Object.keys(Questions).length>0 && currentSectionId<Sections.length)
        {
            setStatusOnToggle();
            setQuestionToggle(true);
        }
    }, [currentSectionId]);

    useEffect(() => {
        if(currentSubSectionSingleId!=null && Object.keys(Questions).length>0 )
        {
            setSubSectionToggle(true);
        }
    }, [currentSubSectionSingleId]);

    useEffect(() => {
  
        if(Sections[currentSectionId])
        {
            setLoading(()=>false);
        }
    }, [currentSectionId])
   
    function sectionIdChange(id)  {
        setSubmitClicked(false);
        setcurrentSectionId(id);
        setcurrentSubSectionSingleId(0);
        scrollToTop();
    }

    function subSectionIdChange(id,sectionIndex) {
        if(sectionIndex!=undefined)
        setcurrentSectionId(sectionIndex);

        setSubmitClicked(false);
        QuestionsStatus[id].visited = true;
        setQuestionsStatus({...QuestionsStatus});
    }

    let seconds = 59;
    //let minutes = (Object.keys(Questions)?.length-1) * 1;
    let minutes = Number(TestDetails?.duration)-1;
    useEffect(()=>{
        if(TestStarted)
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
             
                history.push({pathname:'/report',state:{TimeTaken:((Number(TestDetails?.duration)) * 60 ),previousPath:'/test'}});
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
        }
    },[TestStarted]);

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

    // window.onbeforeunload = (event) => {
    //     if(location.pathname=='/test'){
    //     const e = event || window.event;
    //     const promp = prompt("Are you sure you want leave without submitting test?")
    //     e.preventDefault();
    //     if (e) {
    //       e.returnValue = ''; // Legacy method for cross browser support
    //     }
    //     return ''; // Legacy method for cross browser support
    //     }
    //   };

    return (
        <div className="container-fluid" id="domockexamtestpage" style={{border:'3px solid gray',padding:'1px',minHeight:'100vh'}}>
            {/* <NavigationBlocker /> */}
            {showModal && submitClicked && <Popup from="test" title="Submit Test" body="Are you sure you want to submit test for marking?" returnStateHandler={returnStateHandler} />}
            
            <div className="card text-center" style={{marginBottom:'10px',color:'dodgerblue',background:'black',padding:'5px'}}>
                <div style={{marginRight:'10px'}}>{TestDetails?.title} (TEST ID: {TestDetails?.id})</div>
            </div>
            
            {
                TestStarted == false ?
                <div className="d-flex justify-content-center align-items-center flex-column" >
                   
                    <Instructions TestDetails={TestDetails} TotalQuestions={Questions.length} /> 
                    <p></p>
                    <div style={{padding:'50px'}}>
                        <Button style={{width:'300px'}} onClick={()=>{setTestStarted(true);StartTest();}} variant="primary">Start Test</Button>
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
                            <div  className="">
                                <Card style={{backgroundColor:'#999999',color:'white',borderStyle:'none',height:'35px',width:'100% !important'}}>
                                    <div className="d-flex flex-row justify-content-between">
                                        <div >
                                            {
                                                submitClicked == false ? 
                                                <b><i>Q - {range(Sections[currentSectionId].sections[currentSubSectionSingleId].qIndex, 
                                                    (Sections[currentSectionId].sections[currentSubSectionSingleId].qIndex+Sections[currentSectionId].sections[currentSubSectionSingleId].questions.length-1),
                                                     1).toString()} of {Object.keys(Questions)?.length}  </i></b>
                                                :
                                                ""
                                            }
                                                
                                        </div>
                                        <div>
                                            <Button id="time" style={{height:'100%'}} variant="success">
                                              
                                                <span ></span> <b ><span id="minutes">MM</span> : <span id="seconds" >SS</span></b>
                                            </Button>
                                        </div>
                                    </div>  
                                </Card>
                            </div>
                            <div className="" style={{position:'relative'}}>
                            {
                                 submitClicked ?
                                 <div className="" style={{overflowY:'auto',height:'80vh'}}> 
                                     <div className='' >
                                         {/* <TestStatus QuestionsStatus={QuestionsStatus} SectionsStatus={SectionsStatus} Sections={Sections} /> */}
                                         <QuestionPallet Sections={Sections} SectionsStatus={SectionsStatus} QuestionsStatus={QuestionsStatus} QuestionToggle={QuestionToggle}
        currentSectionId={currentSectionId} currentSubSectionSingleId={currentSubSectionSingleId} numToRoman={numToRoman} sectionIdChange={sectionIdChange} 
        setQuestionToggle={setQuestionToggle} setcurrentSubSectionSingleId={setcurrentSubSectionSingleId} subSectionIdChange={subSectionIdChange}
        setQuestionsStatus={setQuestionsStatus} setSectionsStatus={setSectionsStatus} answersFromStore={props.answersFromStore} submitClicked={submitClicked}/>
      
                                     </div>
                                     <div style={{width:'100px',right:'0px',position:'absolute',bottom:'5px'}}><Button variant="primary"  onClick={()=>{setSubmitClicked(false);setcurrentSectionId(0)}}> Go Back </Button></div>
                                     <p></p>
                                 </div>
                                 :
                                <Card style={{paddingBottom:'20px',height:'80vh',overflow:'auto'}}>
                                { 
                                Sections[currentSectionId].sections[currentSubSectionSingleId]?.questions?.map((Question,qind)=>
                                <div>
                                    {/* <div style={{marginLeft:'20px',marginRight:'20px',fontWeight:'bold'}} className="">
                                       Q{Sections[currentSectionId].sections[currentSubSectionSingleId]?.qIndex+qind}
                                       
                                    </div> */}
                                    <div style={{}}>
                                    <>
                                    {

                                        Question!=null && 
                                        <>
                                        {Question.qusType=='MCQ' && <MCQ el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID} /> }
                                       
                                        {Question.qusType=='True or False' && <TrueOrFalse el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID} /> }

                                        {Question.qusType=="Gap Filling" && <Fillin el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID} />  }

                                        {Question.qusType=='One word answer' && <Q1 el={Question} sectionID={currentSectionId} qusID={Question.qusID}  index={Question.qusID} key={Question.qusID} />}

                                        {Question.qusType=='Match the following' && <Match el={Question} sectionID={currentSectionId} qusID={Question.qusID} index={Question.qusID} key={Question.qusID}  />}
                                        
                                        {Question.qusType=='Re-Ararnge' && <Rearrange el={Question} sectionID={currentSectionId} qusID={Question.qusID}  index={Question.qusID} key={Question.qusID} />}
                                        
                                        {Question.qusType=='Dropdown' &&  <DropDown el={Question} sectionID={currentSectionId} qusID={Question.qusID}  index={Question.qusID} key={Question.qusID} />}
                                        
                                        </>
                                    }
                                       
                                    </>
                                    </div>
                                    <hr></hr>
                                </div>
                                    )
                                }   
                            </Card>
                            }
                            </div>
                            <div  className="" >
                                <Card style={{backgroundColor:'#999999',color:'white',borderStyle:'none',height:'35px'}}>
                                    <>
                                        <div style={{height:'100%'}} className="row ">
                                            
                                            <div style={{height:'100%'}} className="col-4">
                                            {
                                                currentSectionId ==0 && currentSubSectionSingleId==0?
                                                <Button variant="secondary" style={{width:'100%',height:'100%'}} disabled={true} ><i style={{height:'100%'}} class="fa fa-backward"></i></Button>
                                                 :
                                                 <Button variant="primary" style={{width:'100%',height:'100%'}} onClick={()=>{moveBackward();scrollToTop()}}><i class="fa fa-backward"></i></Button>
                                                
                                                     }
                                            </div>
                                            <div className="col-4">
                                            {
                                                currentSectionId <= Sections.length-1 &&
                                            <Button style={{height:'100%'}}  variant="warning" onClick={()=>{
                                                                let temp = SectionsStatus;
                                                                temp[currentSectionId].flagged = temp[currentSectionId].flagged?false:true;
                                                                temp[currentSectionId][currentSubSectionSingleId].flagged = temp[currentSectionId][currentSubSectionSingleId].flagged?false:true;
                                                                
                                                               
                                                                for(let qstatus in temp[currentSectionId][currentSubSectionSingleId])
                                                                {
                                                                if(typeof temp[currentSectionId][currentSubSectionSingleId][qstatus] == 'object'){
                                                                    if(temp[currentSectionId][currentSubSectionSingleId].flagged==true)
                                                                    {
                                                                        temp[currentSectionId][currentSubSectionSingleId][qstatus].flagged=true;
                                                                    }
                                                                    else
                                                                    {
                                                                        temp[currentSectionId][currentSubSectionSingleId][qstatus].flagged=false;
                                                                    }
                                                                    }
                                                                }
                                                                ///////////
                                                                let flagged = 0;
                                                                for(let sstatus in SectionsStatus[currentSectionId])
                                                                {
                                                                    
                                                                    if(typeof SectionsStatus[currentSectionId][sstatus] == 'object')
                                                                    {
                                                                        for(let qstatus in SectionsStatus[currentSectionId][sstatus])
                                                                        {
                                                                            if(typeof SectionsStatus[currentSectionId][sstatus][qstatus] == 'object'){
                                                                            let secStats = SectionsStatus[currentSectionId][sstatus][qstatus];
                                                                                    if(secStats.flagged==true)
                                                                                    {
                                                                                        flagged=1;break;
                                                                                    }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if(flagged==0)
                                                                SectionsStatus[currentSectionId].flagged=false;
                                                                else if(flagged==1)
                                                                SectionsStatus[currentSectionId].flagged=true;

                                                                setSectionsStatus({...temp});
                                                                }}  >
                                                <i style={{color:SectionsStatus[currentSectionId][currentSubSectionSingleId]?.flagged?'red':'white',marginRight:'5px'}}
                                                class="fa fa-flag"></i> 
                                                Mark 
                                            </Button>
                                            }
                                            </div>

                                            <div style={{height:'100%',position:'absolute',right:'0px'}} className="col-4">
                                            {
                                                (currentSectionId < Sections.length-1 || currentSubSectionSingleId<Sections[currentSectionId]?.sections.length-1 )
                                                ?
                                                <Button variant="primary" style={{width:'100%',height:'100%',position:'absolute',right:'0px'}} onClick={()=>{moveForward();scrollToTop()}} ><i class="fa fa-forward"></i></Button>
                                                
                                                :
                                                submitClicked==false?
                                                <Button  style={{border:'2px solid green',width:'100%',height:'100%',position:'absolute',right:'0px'}} onClick={()=>submitAndExitTest()} variant="success">Review</Button>
                                         
                                                :
                                                <Button  style={{border:'2px solid green',width:'100%',height:'100%',position:'absolute',right:'0px'}} onClick={()=>submitAndExitTest()} variant="success">Submit</Button>
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
        <QuestionPallet Sections={Sections} SectionsStatus={SectionsStatus} QuestionsStatus={QuestionsStatus} QuestionToggle={QuestionToggle}
        currentSectionId={currentSectionId} currentSubSectionSingleId={currentSubSectionSingleId} numToRoman={numToRoman} sectionIdChange={sectionIdChange} 
        setQuestionToggle={setQuestionToggle} setcurrentSubSectionSingleId={setcurrentSubSectionSingleId} subSectionIdChange={subSectionIdChange}
        setQuestionsStatus={setQuestionsStatus} setSectionsStatus={setSectionsStatus} answersFromStore={props.answersFromStore} submitClicked={false}/>
      
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
