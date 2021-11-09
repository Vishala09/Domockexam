import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Q1 from '../QuestionPaper/Q1';
import Q6 from '../QuestionPaper/Q6';
import Q8 from '../QuestionPaper/Q8';
import Match from '../QuestionPaper/Match';
import Fillin from '../QuestionPaper/Fillin';
import Rearrange from '../QuestionPaper/Rearrange';
import './Report.css'

function Report() {
    
    const dispatch = useDispatch();
    const QuestionsByTest = useSelector(state => state.GetQuestionsByTestReducer.QuestionsByTest);
    const TestDetails = useSelector(state => state.GetQuestionsByTestReducer.testdetails);
    const AnswersFromStore = useSelector(state => state.AnswersReducer);
    const [Results, setResults] = useState([]);
    const [ResultsFetched, setResultsFetched] = useState(false);
    const [totalMarks, settotalMarks] = useState(0);
    let [availableMarks, setAvailableMarks] = useState(0);
    useEffect(() => {
        console.clear();
        //api calls to retrieve selected answer using tests attempted
        console.log(QuestionsByTest,AnswersFromStore);
        calculateResults();
    }, []);
    const calculateResults= () => {
        let marks=0;
        
        try{
           
        for(let i=0;i<QuestionsByTest?.length;i++)
        {
            Results[i]=[];
             if(QuestionsByTest[i]?.qusType=='Gap Filling')
             {
                 for(let j=0;j<QuestionsByTest[i]?.options.length;j++)
                 {
                        if(AnswersFromStore[i]?.selectedAnswer[j]?.option==QuestionsByTest[i].options[j].option)
                        {
                            Results[i][j]={isCorrect:true}
                            marks=marks+1;
                        }
                        else
                        {
                            Results[i][j]={isCorrect:false}
                        }
                        availableMarks=availableMarks+1;
                 }
             }
             else if(QuestionsByTest[i].qusType=='True or False')
             {
                for(let j=0;j<QuestionsByTest[i]?.options.length;j++)
                {
                    let choosed = AnswersFromStore[i]?.selectedAnswer[j]?.option;
                            if(choosed==true+'')
                            {
                                choosed = 0;
                            }
                            else if(choosed==false+'')
                            {
                                choosed = 1;
                            }
                            else
                            {
                                choosed = 2;
                            }

                    let correct = QuestionsByTest[i].options[j].isCorrect;
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
                       if(AnswersFromStore[i]?.selectedAnswer[j]?.option==QuestionsByTest[i].options[j].isCorrect+'')
                       {
                            
                           Results[i][j]={isCorrect:true,choosed:choosed,correct:correct}
                           marks=marks+1;
                       }
                       else
                       {
                           Results[i][j]={isCorrect:false,choosed:choosed,correct:correct}
                       }
                       availableMarks=availableMarks+1;
                }
             }
             else if(QuestionsByTest[i].qusType=='MCQ')
             {
                 
                Results[i]=new Array(QuestionsByTest[i].options.length);
                for(let j=0;j<QuestionsByTest[i].options.length;j++)
                {
                    if(QuestionsByTest[i].options[j].isCorrect==true)
                    {
                        Results[i][j]={isCorrect:true}
                        if(AnswersFromStore[i]?.selectedAnswer?.includes(QuestionsByTest[i].options[j]))
                        {
                            marks=marks+1;
                        }
                        availableMarks=availableMarks+1;
                    }
                    else if(QuestionsByTest[i].options[j].isCorrect==false && AnswersFromStore[i]?.selectedAnswer?.includes(QuestionsByTest[i].options[j]))
                    {
                        Results[i][j]={isCorrect:false}
                    }
                    else if(QuestionsByTest[i].options[j].isCorrect==false && !AnswersFromStore[i]?.selectedAnswer?.includes(QuestionsByTest[i].options[j]))
                    {
                        Results[i][j]={isCorrect:undefined}
                    }
                    
                }
             }
             else if(QuestionsByTest[i].qusType=='One word answer')
             {
                 
             }
             else if(QuestionsByTest[i].qusType=='Match the following')
             {
                for(let j=0;j<QuestionsByTest[i].options.length;j++)
                {
                    
                       if(AnswersFromStore[i]?.selectedAnswer[j].option==QuestionsByTest[i].options[j].option)
                       {
                           Results[i][j]={isCorrect:true}
                           marks=marks+1;
                       }
                       else
                       {
                           Results[i][j]={isCorrect:false}
                       }
                       availableMarks=availableMarks+1;
                }
             }
        }
    }
    catch(e)
    {
        console.log('e',e)
    }
        console.log(Results);
        settotalMarks(marks);
        setAvailableMarks(availableMarks);
        console.log(marks,availableMarks)
        setResultsFetched(true);
    }

    const renderReport = () => {
        return (
        <div>
            {
                QuestionsByTest.map((el,index)=>
                <div>
                    <h4>Question {index+1} </h4>
                        {el.qusType=='MCQ' && <Q6 el={el} isResult={true} Results={Results[index]} qusID={el.qusID} index={index} key={el.qusID} /> }
                        {el.qusType=='True or False' && <Q8 el={el} isResult={true} Results={Results[index]}  qusID={el.qusID} index={index} key={el.qusID} /> }
                        {el.qusType=='Gap Filling' && <Fillin isResult={true} Results={Results[index]} el={el} qusID={el.qusID} index={index} key={el.qusID} /> }
                        {el.qusType=='One word answer' && <Q1 el={el} isResult={true} Results={Results[index]} qusID={el.qusID} index={index} key={el.qusID} /> }
                        {el.qusType=='Match the following' && <Match isResult={true} Results={Results[index]} el={el} qusID={el.qusID} index={index} key={el.qusID} /> }
                        <hr></hr>            
                </div>
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
             setclickText("Click to show")
         }
         else
         {
             el.style.display = "inline";
             setclickText("Click to hide")
         }
    }
    const [clicktext, setclickText] = useState("Click to show");
    return (
        <div>
            <div className="container-fluid " style={{padding:'10px'}} >
                <div>
                    <div onClick={()=>hideHeading('rphead1')} className="reportHeadings row" >
                            <span className="col-6"> Result of each Question  </span>
                            <span className=" offset-md-4 col-md-2 col-6  text-muted cursor-pointer">{clicktext}</span>
                    </div>
                    <div id="rphead1" style={{display:'none'}}>
                        {ResultsFetched && renderReport()}
                    </div>
                    
                </div>
                <hr></hr>
                <div style={{padding:'10px'}}>
                <div style={{padding:'10px'}}>
                     <div className="reportHeadings row"> Student Details </div>
                     <div>
                         <div className="row">
                            <div className="col-3">Student Name</div>  
                            <div className="col-8">Krishna Ram</div>
                         </div>
                         <div className="row">
                            <div className="col-3">Exam Name</div>  
                            <div className="col-8">{TestDetails.title}</div>
                         </div>
                         <div className="row">
                            <div className="col-3">Candidate Number</div>  
                            <div className="col-8">123456789012345</div>
                         </div>
                         <div className="row">
                            <div className="col-3">Type</div>  
                            <div className="col-8"></div>
                         </div>
                         <div className="row">
                            <div className="col-3">Exam Date</div>  
                            <div className="col-8">11/08/2021</div>
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
                                    <div className="col-8">1 hour</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Mark(%)</div>  
                                    <div className="col-8">87</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Average(%)</div>  
                                    <div className="col-8">68</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Max(%)</div>  
                                    <div className="col-8">89</div>
                                </div>
                                <hr></hr>
                                <div className="row">
                                    <div className="col-4">Min(%)</div>  
                                    <div className="col-8">60</div>
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
                </div>
            </div>
            
        </div>
    )
}

export default Report
