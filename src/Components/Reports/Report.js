import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Q1 from '../QuestionPaper/Q1';
import Q6 from '../QuestionPaper/Q6';
import Q8 from '../QuestionPaper/Q8';
import Match from '../QuestionPaper/Match';
import Fillin from '../QuestionPaper/Fillin';
import Rearrange from '../QuestionPaper/Rearrange';
import './Report.css';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings';
import AllReports from './AllReports';
import { useHistory, useLocation } from 'react-router';
import {pad2} from '../HelperFunctions/NumberFunctions';


function Report() {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const QuestionsByTest = useSelector(state => state.GetQuestionsByTestReducer.QuestionsByTest);
    const TestDetails = useSelector(state => state.GetQuestionsByTestReducer.testdetails);
    const AnswersFromStore = useSelector(state => state.AnswersReducer);
    const [Results, setResults] = useState({});
    const [ResultsCorrectAnswers, setResultsCorrectAnswers] = useState({});
    const [ResultsFetched, setResultsFetched] = useState(false);
    const [totalMarks, settotalMarks] = useState(0);
    let [availableMarks, setAvailableMarks] = useState(0);
    const [TimeTaken, setTimeTaken] = useState()

    const UserLogin = useSelector(state => state.LoginReducer);
    const history = useHistory();

    useEffect(() => {
        console.clear();
        //api calls to retrieve selected answer using tests attempted
        console.log(QuestionsByTest,AnswersFromStore);
        calculateResults();
    }, []);

    useEffect(() => {
        if(((UserLogin.username=='undefined' && UserLogin.value?.token=='undefined')))  
          {
            console.log('/login')
             history.push('/login');
          }
    }, [])
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
                        for(let j=0;j<QuestionsByTest[k].questions[i].options.length;j++)
                        {   
                            let opt = QuestionsByTest[k].questions[i].options[j];
                            if(opt.isCorrect==true)
                            {
                                Results[r][j]={isCorrect:true}
                                if(AnswersFromStore[qusID]?.selectedAnswer?.includes(opt))
                                {
                                    marks=marks+1;
                                    Results[r][j].isSelected=true
                                }
                                availableMarks=availableMarks+1;
                                ResultsCorrectAnswers[r][j]={isCorrect:true};
                            }
                            else if(opt.isCorrect==false && AnswersFromStore[qusID]?.selectedAnswer?.includes(opt))
                            {
                                Results[r][j]={isCorrect:false}
                            }
                            else if(opt.isCorrect==false && !AnswersFromStore[qusID]?.selectedAnswer?.includes(opt))
                            {
                                Results[r][j]={isCorrect:undefined}
                            }
                            
                        }
                    }
                    else if(qusType=='True or False')
                    {
              
                        for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
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
                                 
                               if(AnswersFromStore[qusID]?.selectedAnswer[j]?.option==QuestionsByTest[k]?.questions[i].options[j].isCorrect+'')
                               {
                                    
                                   Results[r][j]={isCorrect:true,choosed:choosed,correct:correct}
                                   marks=marks+1;
                               }
                               else
                               {
                                   Results[r][j]={isCorrect:false,choosed:choosed,correct:correct}
                               }
                               availableMarks=availableMarks+1;
                               ResultsCorrectAnswers[r][j]={isCorrect:true,choosed:correct,correct:correct};
                        }
                    }
                    else if(qusType=='Gap Filling')
                    {
                        for(let j=0;j<QuestionsByTest[k]?.questions[i]?.options.length;j++)
                        {
                               if(AnswersFromStore[qusID]?.selectedAnswer[j]?.option==QuestionsByTest[k]?.questions[i].options[j].option)
                               {
                                   Results[r][j]={isCorrect:true}
                                   marks=marks+1;
                               }
                               else
                               {
                                   Results[r][j]={isCorrect:false}
                               }
                               availableMarks=availableMarks+1;
                               ResultsCorrectAnswers[r][j]={isCorrect:true};
                        }
                    }
                    else if(qusType=='Match the following')
                    {
                       for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                       {
                           
                              if(AnswersFromStore[qusID]?.selectedAnswer[j].option==QuestionsByTest[k]?.questions[i].options[j].option)
                              {
                                  Results[r][j]={isCorrect:true}
                                  marks=marks+1;
                              }
                              else
                              {
                                  Results[r][j]={isCorrect:false}
                              }
                              availableMarks=availableMarks+1;
                              ResultsCorrectAnswers[r][j]={isCorrect:true};
                       }
                    }
                    else if(qusType=="Re-Ararnge")
                    {
                       for(let j=0;j<QuestionsByTest[k]?.questions[i].options.length;j++)
                       {
                           
                              if(AnswersFromStore[qusID]?.selectedAnswer[j].option==QuestionsByTest[k]?.questions[i].options[j].option)
                              {
                                  Results[r][j]={isCorrect:true}
                                  marks=marks+1;
                              }
                              else
                              {
                                  Results[r][j]={isCorrect:false}
                              }
                              availableMarks=availableMarks+1;
                              ResultsCorrectAnswers[r][j]={isCorrect:true};
                       }
                    }
                }
                
                
            }
        }
        console.log(Results);
        settotalMarks(marks);
        setAvailableMarks(availableMarks);
        setResults({...Results})
        setResultsFetched(true);
        setTimeTaken(location?.state?.TimeTaken)
      //  console.log(location.state.TimeTaken,'TIMETAKEN')

        let correctansstr = JSON.stringify(AnswersFromStore);

        if(QuestionsByTest!=undefined && TestDetails!=undefined)
        {
            let reqBody = {
                "StudentTestId":Number(getCookie('domockexamStudentTestId')),
                "AttemptedAt":new Date().toISOString(),
                "TimeTaken":location?.state?.TimeTaken+"",
                "CorrectAnswers":JSON.stringify(AnswersFromStore),
                "TotalMarks":availableMarks,
                "Score":totalMarks
                }
                console.log('studenttesthistory',reqBody,correctansstr);
            dispatch({type:'SAVE_STUDENT_TEST_HISTORY_REQUESTED',payload:reqBody});

            let reqBodyResults = {
                "TestId":TestDetails?.id,
                "StudentId":14,
                "CalculatedResults":JSON.stringify(Results)
            }
                    console.log('results',reqBodyResults);
                dispatch({type:'SAVE_STUDENT_CALCULATED_RESULT_REQUESTED',payload:reqBodyResults});
        }
    }

    const renderReport = () => {
        return (
        <div>
            {
                QuestionsByTest.map((sec,k)=>
                    sec.questions.map((el,index) => 
                    <div>
                        {el.qusType=='MCQ' && <Q6 el={el} isResult={true} Results={Results[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='True or False' && <Q8 el={el} isResult={true} Results={Results[el.qusID]}  qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Gap Filling' && <Fillin isResult={true} Results={Results[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='One word answer' && <Q1 el={el} isResult={true} Results={Results[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Match the following' && <Match isResult={true} Results={Results[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Re-Ararnge' && <Rearrange isResult={true} Results={Results[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        
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
        <div>
            {
                QuestionsByTest.map((sec,k)=>
                    sec.questions.map((el,index) => 
                    <div>
                        {el.qusType=='MCQ' && <Q6 el={el} isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='True or False' && <Q8 el={el} isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]}  qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Gap Filling' && <Fillin isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='One word answer' && <Q1 el={el} isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Match the following' && <Match isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        {el.qusType=='Re-Ararnge' && <Rearrange isResult={true} isCorrectAnswers={true} Results={ResultsCorrectAnswers[el.qusID]} el={el} qusID={el.qusID} index={el.qusID} key={el.qusID} /> }
                        
                        <hr></hr>            
                    </div>
                    )
                )
            }
        </div>
        )
    }
    const hideHeading = (id) => {
         let el = document.getElementById(id);
         if(el.style.display!="none")
         {
             el.style.display = "none";
           //  document.getElementById(id+'ct')?.innerHTML='<i class="fa fa-angle-up" aria-hidden="true"></i>';
         }
         else
         {
             el.style.display = "inline";
           //  document.getElementById(id+'ct')?.innerHTML='<i class="fa fa-angle-down" aria-hidden="true"></i>';
         }
    }
    const [clicktext, setclickText] = useState();
    return (
        <div>
            <div className="container-fluid " style={{padding:'10px'}} >
                <h4>Reports</h4>
                <div style={{padding:'10px'}}>
                <div style={{padding:'10px'}}>
                     <div className="reportHeadings row"> Student Details </div>
                     <div>
                         <div className="row">
                            <div className="col-3">Student Name</div>  
                            <div className="col-8">{getCookie('domockexamUsername')}</div>
                         </div>
                         <div className="row">
                            <div className="col-3">Candidate Number</div>  
                            <div className="col-8">{getCookie('domockexamID')}</div>
                         </div>
                         <div className="row">
                            <div className="col-3">Type</div>  
                            <div className="col-8">User Type</div>
                         </div>
                     </div>
                </div>
                </div>
               {  QuestionsByTest!=undefined ?
              
                <div style={{padding:'10px'}}>
                <div style={{padding:'10px'}}>
                     <div className="reportHeadings row"> Exam Details </div>
                     <div>
                         <div className="row">
                            <div className="col-3">Exam Name</div>  
                            <div className="col-8">{TestDetails.title}</div>
                         </div>
                         <hr></hr>
                         <div className="row">
                            <div className="col-3">Exam Date</div>  
                            <div className="col-8">{new Date().toUTCString()}</div>
                         </div>
                     </div>
                </div>
                <div style={{padding:'10px'}}>
                    <div className="reportHeadings row"> Summary </div>
                    <div style={{display:'flex',justifyContent:'center',padding:'10px'}}>
                        <div class="card" style={{background:'lightblue',width:'100%'}}>
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-4">Exam Name</div>  
                                    <div className="col-8">{TestDetails.title}</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Time Taken</div>  
                                    <div className="col-8">{pad2(Math.floor(Number(TimeTaken) / 60))} : {pad2(Number(TimeTaken) - Math.floor(Number(TimeTaken) / 60) * 60)} </div>
                                            
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Mark(%)</div>  
                                    <div className="col-8">87</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Average(%)</div>  
                                    <div className="col-8">Avg</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Max(%)</div>  
                                    <div className="col-8">Max</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Min(%)</div>  
                                    <div className="col-8">Min</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Standardised Score</div>  
                                    <div className="col-8">{totalMarks}/{availableMarks}</div>
                                </div>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr></hr>
                <div>
                    <div onClick={()=>hideHeading('rphead1')} className="reportHeadings row" >
                            <span className="col-6"> Marking  </span>
                            {/* <span id="rphead1ct" className=" offset-md-4 col-md-2 col-6  text-muted cursor-pointer"><i class="fa fa-angle-up" aria-hidden="true"></i></span> */}
                    </div>
                    <div id="rphead1" style={{display:'none'}}>
                        {ResultsFetched && renderReport()}
                    </div>
                    
                </div>

                <hr></hr>
                <div>
                    <div onClick={()=>hideHeading('rphead2')} className="reportHeadings row" >
                            <span className="col-6"> Correct Answers   </span>
                            {/* <span id="rphead2ct" className=" offset-md-4 col-md-2 col-6  text-muted cursor-pointer"><i class="fa fa-angle-up" aria-hidden="true"></i></span> */}
                    </div>
                    <div id="rphead2" style={{display:'none'}}>
                        {ResultsFetched && renderReportCorrectAnswers()}
                    </div>
                    
                </div>

                </div>
                :
                <div>
                    <hr></hr>
                    {
                        <AllReports />
                    }
                </div>
            }
            </div>
            
        </div>
    )
}

export default Report
