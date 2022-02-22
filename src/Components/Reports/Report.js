import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Q1 from '../QuestionPaper/Q1';
import MCQ from '../QuestionPaper/MCQ';
import TrueOrFalse from '../QuestionPaper/TrueOrFalse';
import Match from '../QuestionPaper/Match';
import Fillin from '../QuestionPaper/Fillin';
import Rearrange from '../QuestionPaper/Rearrange';
import './Report.css';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings';
import {MapChildrenDetails} from '../HelperFunctions/UserSettings';

//
import AllReports from './AllReports';
import { useHistory, useLocation } from 'react-router';
import {pad2} from '../HelperFunctions/NumberFunctions';
import DropDown from '../QuestionPaper/DropDown';
import html2canvas from 'html2canvas';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Pdf from "react-to-pdf";
import Popup from '../HelperComps/Popup';
import domToPdf from 'dom-to-pdf'
import EnterEmailPopup from '../HelperPopups/EnterEmailPopUp';

function Report() {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const QuestionsByTest = useSelector(state => state.GetQuestionsByTestReducer.QuestionsByTest);
    const TestDetails = useSelector(state => state.GetQuestionsByTestReducer.testdetails);
    const AnswersFromStore = useSelector(state => state.AnswersReducer);
    const [Results, setResults] = useState({});
    const [ResultsCorrectAnswers, setResultsCorrectAnswers] = useState({});
    const [ResultsFetched, setResultsFetched] = useState(false);
    let [totalMarks, settotalMarks] = useState(0);
    let [availableMarks, setAvailableMarks] = useState(0);
    const [showEnterEmailPopup, setShowEnterEmailPopup] = useState(false);
    const [IsEmailEntered, setIsEmailEntered] = useState(false);
    const UserLogin = useSelector(state => state.LoginReducer);

    let  previousPath = location?.state?.previousPath;
    
    const [TimeTaken, setTimeTaken] = useState()

    const history = useHistory();
    useEffect(() => {

        if(((UserLogin.username=='undefined' && UserLogin.value?.token=='undefined')))  
          {
            if(previousPath!='/test')
             history.push('/login');
          }
        
        return () => {
            if(UserLogin.username=='undefined' && UserLogin.value?.token=='undefined' && previousPath=='/test')
            {
               // alert('Thanks for using our product. Please register yourself.')
            }
        };

    }, [])
    

    const [ChildrenDetailsMap, setChildrenDetailsMap] = useState(MapChildrenDetails(UserLogin));
    useEffect(() => {
        setChildrenDetailsMap(MapChildrenDetails(UserLogin))
    }, [UserLogin])

    useEffect(() => {
       console.clear();
        //api calls to retrieve selected answer using tests attempted
        console.log(QuestionsByTest,AnswersFromStore);
        calculateResults();
    
    }, []);


   
    useEffect(() => {
        return () => {
            dispatch({type:'CLEAR_QUESTIONS_BY_TEST'})
            dispatch({type:'CLEAR_ANSWERS'})
        }
    }, []);


    const calculateResults= () => {
        let marks=0;
        if(QuestionsByTest!=undefined)
        for(let k=0;k<QuestionsByTest.length;k++)
        {
            for(let i=0;i<QuestionsByTest[k].questions.length;i++)
            {
                
                let qusID = QuestionsByTest[k].questions[i].qusID;
                let answers = AnswersFromStore[qusID];
                let r=qusID;
                
                {
                    let qusType = QuestionsByTest[k].questions[i].qusType;
                    Results[r]=new Array(QuestionsByTest[k].questions[i].options.length);
                    ResultsCorrectAnswers[r]=new Array(QuestionsByTest[k].questions[i].options.length);
                    if(qusType=='MCQ')
                    {
                        let m=-1;
                        Results[r].marks=0;
                        Results[r].total=1;
                        for(let j=0;j<QuestionsByTest[k].questions[i].options.length;j++)
                        {   
                            let opt = QuestionsByTest[k].questions[i].options[j];
                            if(opt.isCorrect==true)
                            {
                                Results[r][j]={isCorrect:true}
                                if(AnswersFromStore[qusID]?.selectedAnswer?.includes(opt))
                                {
                                    
                                    Results[r][j].isSelected=true;
                                    if(m==-1)
                                    m=1;
    
                                }
                                
                               
                                ResultsCorrectAnswers[r][j]={isCorrect:true};
                                availableMarks=availableMarks+1;
                            }
                            else if(opt.isCorrect==false && AnswersFromStore[qusID]?.selectedAnswer?.includes(opt))
                            {
                                m=0;
                                Results[r][j]={isCorrect:false}
                            }
                            else if(opt.isCorrect==false && !AnswersFromStore[qusID]?.selectedAnswer?.includes(opt))
                            {
                                Results[r][j]={isCorrect:undefined}
                            }
                           
                        }
                        
                        if(m!=-1)
                            {
                                Results[r].marks=m;
                                totalMarks=totalMarks+m;
                            }
                        else    
                            Results[r].marks=0;
                         
                    }
                    else if(qusType=='True or False')
                    {
                        Results[r].marks=0;
                        Results[r].total=1;
                        try{
                            let correctOption = JSON.parse(QuestionsByTest[k]?.questions[i].correctOption)
                            for(let j=0;j<correctOption.length;j++)
                            {
                                let choosed = AnswersFromStore[qusID]?.selectedAnswer[j]?.option;
                                if(choosed==true+'')
                                {
                                    choosed = 0;
                                }
                                else if(choosed==false+'')
                                {
                                    choosed = 1;
                                }
                                else if(choosed=='na')
                                {
                                    choosed = 2;
                                }
                                else
                                {
                                    choosed = 3
                                }
    
                        let correct = QuestionsByTest[k]?.questions[i].options[j].isCorrect;
                                if(correct==true)
                                {
                                    correct = 0;
                                }
                                else if(correct==false)
                                {
                                    correct = 1;
                                }
                                else
                                {
                                    correct = 2;
                                }
                                    if(AnswersFromStore[qusID]?.selectedAnswer[j]?.option==correctOption[j])
                                    {
                                        Results[r][j]={isCorrect:true,choosed:choosed,correct:correct}
                                        Results[r].marks=1;
                                        totalMarks=totalMarks+1;
                                    }
                                    else
                                    {
                                        Results[r][j]={isCorrect:false,choosed:choosed,correct:correct}
                                        Results[r].marks=0;
                                    }
                                    availableMarks=availableMarks+1;
                                    ResultsCorrectAnswers[r][j]={isCorrect:true,choosed:correct,correct:correct};
                            }
                        }
                        catch(e)
                        {
                           // let correctOption = QuestionsByTest[k]?.questions[i].correctOption.split(",");
                            console.log('CAUGHT ',e)
                            for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                            {
                                    {
                                        Results[r][j]={isCorrect:false}
                                    }
                                ResultsCorrectAnswers[r][j]={isCorrect:true};
                                availableMarks=availableMarks+1;
                            }
                        }
                    }
                    else if(qusType=='Gap Filling')
                    {
                        Results[r].marks = 0;
                        Results[r].total=1;
                        try{
                            let correctOption = JSON.parse(QuestionsByTest[k]?.questions[i].correctOption);
                            Results[r].total=correctOption.length;
                            for(let j=0;j<QuestionsByTest[k]?.questions[i]?.options.length;j++)
                            {
                                //QuestionsByTest[k]?.questions[i].options[j].option
                                if(AnswersFromStore[qusID]?.selectedAnswer[j]?.option==correctOption[j])
                                {
                                    Results[r][j]={isCorrect:true};
                                    Results[r].marks=Results[r].marks+1;
                                    totalMarks=totalMarks+1;
                                }
                                else
                                {
                                    Results[r][j]={isCorrect:false};
                                }
                                availableMarks=availableMarks+1;
                                ResultsCorrectAnswers[r][j]={isCorrect:true};
                            }
                        }
                        catch(e){}
                    }
                    else if(qusType=='Match the following')
                    {
                        Results[r].marks=0;
                        Results[r].total=1;
                        try{
                            let correctOption = JSON.parse(QuestionsByTest[k]?.questions[i].correctOption)
                            correctOption=correctOption[0];
                            Results[r].total=QuestionsByTest[k]?.questions[i].options.length;

                            for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                            {  //QuestionsByTest[k]?.questions[i].options[j].option
                                    if(AnswersFromStore[qusID]?.selectedAnswer[j].option==QuestionsByTest[k]?.questions[i].options[j].option)
                                    {
                                        Results[r][j]={isCorrect:true};
                                        Results[r].marks=Results[r].marks+1;
                                        totalMarks=totalMarks+1;
                                    }
                                    else
                                    {
                                        Results[r][j]={isCorrect:false}
                                    }
                                    availableMarks=availableMarks+1;
                                    ResultsCorrectAnswers[r][j]={isCorrect:true};
                            }
                        }
                        catch(Exception){}
                    }
                    else if(qusType=="Re-Ararnge")
                    {
                        Results[r].marks=-1;
                        Results[r].total=1;
                        try{
                            let correctOption = JSON.parse(QuestionsByTest[k]?.questions[i].correctOption);
                           
                            for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                            {
                                
                                    if(AnswersFromStore[qusID]?.selectedAnswer[j]?.option==correctOption[j])
                                    {
                                        Results[r][j]={isCorrect:true};
                                        if(Results[r].marks==-1)
                                        Results[r].marks=1;
                                        totalMarks=totalMarks+1;
                                    }
                                    else
                                    {
                                        Results[r][j]={isCorrect:false};
                                        Results[r].marks=0;
                                    }
                                    
                                    ResultsCorrectAnswers[r][j]={isCorrect:true};
                            }
                            availableMarks=availableMarks+1;
                        }
                        catch(e)
                        {
                           // let correctOption = QuestionsByTest[k]?.questions[i].correctOption.split(",");
                            console.log('CAUGHT ',e)
                            for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                            {
                                    {
                                        Results[r][j]={isCorrect:false}
                                        Results[r].marks=0;
                                    }
                                ResultsCorrectAnswers[r][j]={isCorrect:true};
                                availableMarks=availableMarks+1;
                            }
                        }
                    }
                    else if(qusType=="One word answer")
                    {
                        Results[r].marks=0;
                        Results[r].total=1;
                        try{
                            let correctOption = JSON.parse(QuestionsByTest[k]?.questions[i].correctOption);
                            Results[r].total=correctOption.length;
                            for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                            {
                                QuestionsByTest[k]?.questions[i].options[j].option.trim().toLowerCase()
                                if(AnswersFromStore[qusID]?.selectedAnswer[j].trim().toLowerCase()==correctOption[j].trim().toLowerCase())
                                {
                                        totalMarks=totalMarks+1;
                                        Results[r][j]={isCorrect:true};
                                        Results[r].marks=Results[r].marks+1;
                                }
                                else if(AnswersFromStore[qusID]?.selectedAnswer[j] && AnswersFromStore[qusID]?.selectedAnswer[j]!='')
                                    {
                                        Results[r][j]={isCorrect:false};
                                    }
                                ResultsCorrectAnswers[r][j]={isCorrect:true};
                                availableMarks=availableMarks+1;
                            }
                        }
                        catch(e){}
                    }
                    else if(qusType=="Dropdown" )
                    {
                        Results[r].marks=0;
                        Results[r].total=1;
                        try{
                            let correctOption = JSON.parse(QuestionsByTest[k]?.questions[i].correctOption);
                            Results[r].total=correctOption.length;
                            for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                            {
                                if(AnswersFromStore[qusID]?.selectedAnswer[j]==correctOption[j])
                                {
                                        totalMarks=totalMarks+1;
                                        Results[r][j]={isCorrect:true};
                                        Results[r].marks=Results[r].marks+1;
                                }
                                else if(AnswersFromStore[qusID]?.selectedAnswer[j] && AnswersFromStore[qusID]?.selectedAnswer[j]!='')
                                    {
                                        Results[r][j]={isCorrect:false};
                                    }
                                ResultsCorrectAnswers[r][j]={isCorrect:true};
                               // console.log(availableMarks)
                                availableMarks=availableMarks+1;
                            }
                        }
                        catch(e)
                        { }
                    }
                }
                
                
            }
        }
        console.log(Results,totalMarks,availableMarks);
        settotalMarks(totalMarks);
        setAvailableMarks(availableMarks);
        setResults({...Results})
        setResultsFetched(true);
        setTimeTaken(location?.state?.TimeTaken)
      //  console.log(location.state.TimeTaken,'TIMETAKEN')

        let correctansstr = JSON.stringify(AnswersFromStore);

        if(QuestionsByTest!=undefined && TestDetails!=undefined && previousPath=='/test')
        {
            let reqBody = {
                "StudentTestId":Number(getCookie('domockexamStudentTestId')),
                "AttemptedAt":new Date().toISOString(),
                "TimeTaken":location?.state?.TimeTaken+"",
                "CorrectAnswers":JSON.stringify(AnswersFromStore),
                "TotalMarks":availableMarks,
                "Score":totalMarks
                }
          //      console.log('studenttesthistory',reqBody,correctansstr);
            dispatch({type:'SAVE_STUDENT_TEST_HISTORY_REQUESTED',payload:reqBody});

            let reqBodyResults = {
                "TestId":TestDetails?.id,
                "StudentId":14,
                "CalculatedResults":JSON.stringify(Results)
            }
                    console.log('results',reqBodyResults);
                dispatch({type:'SAVE_STUDENT_CALCULATED_RESULT_REQUESTED',payload:reqBodyResults});

                {
                    let reqBody_updateStatus = [{
                        "StudentTestId":Number(getCookie('domockexamStudentTestId')),
                        "StatusId":3
                    }]
                 //  console.log('rb-submitTest',reqBody_updateStatus)
                   dispatch({type:'UPDATE_STUDENT_TEST_STATUS_REQUESTED',payload:reqBody_updateStatus});
                }

        }
    }
   


    const renderReport = () => {
        return (
        <div>
            {
                QuestionsByTest.map((sec,k)=>
                    sec.questions.map((el,index) => 
                    <div>
                        <h6 style={{color:'dodgerblue'}}>Marks Obtained : {Results[el.qusID].marks} / {Results[el.qusID].total}</h6>
                        {el.qusType=='MCQ' && <MCQ el={el} isResult={true} Results={Results[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='True or False' && <TrueOrFalse el={el} isResult={true} Results={Results[el.qusID]}  qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Gap Filling' && <Fillin isResult={true} Results={Results[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='One word answer' && <Q1 el={el} isResult={true} Results={Results[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Match the following' && <Match isResult={true} Results={Results[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Re-Ararnge' && <Rearrange isResult={true} Results={Results[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Dropdown' && el.qusID!=211 &&  <DropDown isResult={true} Results={Results[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        
                        <hr></hr>            
                    </div>
                    )
                )
            }
        </div>
        )
    }
    const renderReportCorrectAnswers = () => {
        return (
        <div id="correctanswers" style={{padding:'40px'}}>
            {
                QuestionsByTest.map((sec,k)=>
                    sec.questions.map((el,index) => 
                    <div>
                        {el.qusType=='MCQ' && <MCQ el={el} isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='True or False' && <TrueOrFalse el={el} isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]}  qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Gap Filling' && <Fillin isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='One word answer' && <Q1 el={el} isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Match the following' && <Match isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Re-Ararnge' && <Rearrange isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Dropdown' && el.qusID!=211 && <DropDown isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        
                        <hr></hr>            
                    </div>
                    )
                )
            }
        </div>
        )
    }
    const hideHeading = (id) => {
         if(UserLogin.username=='undefined' && UserLogin.value?.token=='undefined' && previousPath=='/test' && !IsEmailEntered)
         {
            setShowEnterEmailPopup(true);
         }
         else{
            let el = document.getElementById(id);
            if(el.style.display!="none")
            {
                el.style.display = "none";
            }
            else
            {
                el.style.display = "inline";
            }
         }
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
    }

    return (
        <div>
            {!(UserLogin.username=='undefined' && UserLogin.value?.token=='undefined') && previousPath=='/test' && <Popup from="report" title="Submitted Successfully" body="Answers submitted successfully.Thankyou for taking test!!" returnStateHandler={returnStateHandler} />}

            {(UserLogin.username=='undefined' && UserLogin.value?.token=='undefined') && previousPath=='/test' && 
            <Popup from="NeedPleaseRegister" title="Thank you for using our service." body="For more exams, please do register yourself." 
            returnStateHandler={returnStateHandler} />}

            {
                showEnterEmailPopup && 
                <EnterEmailPopup closeHandler={()=>setShowEnterEmailPopup(false)} submitHandler={()=>setIsEmailEntered(true)} />
            }


            <div className="container-fluid " style={{padding:'10px'}} >
                <h4>Reports</h4>
                <div style={{padding:'10px'}}>
                {
                    !(UserLogin.username=='undefined' && UserLogin.value?.token=='undefined') &&
                    <div style={{padding:'10px'}}>
                        <div className="reportHeadings row">User Details </div>
                        <div>
                            <div className="row">
                                <div className="col-3">Name</div>  
                                <div className="col-8">{getCookie('domockexamUsername')}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">ID</div>  
                                <div className="col-8">{getCookie('domockexamID')}</div>
                            </div>
                        </div>
                    </div>
                }
                </div>
               {  previousPath=='/test' ?
              
                <div style={{padding:'10px'}}>
                <div style={{padding:'10px'}}>
                     <div className="reportHeadings row"> Exam Details </div>
                     <div>
                         <div className="row">
                            <div className="col-3">Name</div>  
                            <div className="col-8">{TestDetails.title}</div>
                         </div>
                         <hr></hr>
                         <div className="row">
                            <div className="col-3">Date</div>  
                            <div className="col-8">{new Date().toUTCString()}</div>
                         </div>
                         <hr></hr>
                         <div className="row">
                            <div className="col-3">Subject</div>  
                            <div className="col-8">{TestDetails.subjectName}</div>
                         </div>
                     </div>
                </div>
                <div style={{padding:'10px'}}>
                    <div className="reportHeadings row"> Score </div>
                    <div style={{display:'flex',justifyContent:'center',padding:'10px'}}>
                        <div class="card" style={{background:'lightblue',width:'100%'}}>
                            <div class="card-body">

                               
                                <div className="row">
                                    <div className="col-4">Mark(%)</div>  
                                    <div className="col-8">{Math.floor((totalMarks/availableMarks)*100)}%</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Z-Score</div>  
                                    <div className="col-8">{totalMarks}/{availableMarks}</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Time Taken</div>  
                                    <div className="col-8">{pad2(Math.floor(Number(TimeTaken) / 60))} : {pad2(Number(TimeTaken) - Math.floor(Number(TimeTaken) / 60) * 60)} </div>
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr></hr>
                <div>
                    <div onClick={()=>hideHeading('rphead1')} className="reportHeadings collapsehead row" >
                            <span className="col-6"> Marking  </span>
                            {/* <span id="rphead1ct" className=" offset-md-4 col-md-2 col-6  text-muted cursor-pointer"><i class="fa fa-angle-up" aria-hidden="true"></i></span> */}
                    </div>
                    <div id="rphead1" style={{display:'none'}}>
                        {ResultsFetched && renderReport()}
                    </div>
                    
                </div>

                <hr></hr>
                <div>
                    <div onClick={()=>hideHeading('rphead2')} className="reportHeadings collapsehead row" >
                            <span className="col-6"> Correct Answers   </span>
                            {/* <span id="rphead2ct" className=" offset-md-4 col-md-2 col-6  text-muted cursor-pointer"><i class="fa fa-angle-up" aria-hidden="true"></i></span> */}
                    </div>
                      
                    <div id="rphead2"  style={{display:'none'}} className='download mt-4'>
                        {ResultsFetched && renderReportCorrectAnswers()}
                    </div>
                </div>

                </div>
                :
                <div>
                    <hr></hr>
                    {
                        <AllReports ChildrenDetailsMap={ChildrenDetailsMap} />
                    }
                </div>
            }
            </div>
            
        </div>
    )
}

export default Report
