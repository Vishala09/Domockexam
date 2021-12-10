import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {pad2} from '../HelperFunctions/NumberFunctions';

function AllReports() {
    const dispatch = useDispatch();
    const Reports = useSelector(state => state.ReportsReducer);
    const CalculatedResults = useSelector(state => state.GetCalculatedResultsReducer);
    const testIds = [];

    useEffect(() => {
        dispatch({type:'GET_STUDENT_TEST_REPORT_REQUESTED'});
        dispatch({type:'GET_CALCULATED_RESULT_REQUESTED'});
        Reports.map((el,index)=>
        {
            testIds.push(el.testId);
        });
        // testIds.map((id,index)=>{
        //     dispatch({type:'GET_QUESTIONS_BY_TEST_REQUESTED',payload:{testid:id}})
        // })
    }, []);

    useEffect(() => {
        console.log(CalculatedResults);
    }, [CalculatedResults]);

    useEffect(() => {
        console.log(Reports);
    }, [Reports]);



    return (
        <div>
            <h5>Reports of all exams</h5>
            {
                Reports.map((el,index)=>
                <div>
                    Title : {el.title}
                    {
                        el.studentTestHistories.map((test)=>
                        <div style={{padding:'10px'}}>
                            {/* <div className="reportHeadings row"> Summary </div> */}
                                <div style={{display:'flex',justifyContent:'center',padding:'10px'}}>
                                    <div class="card" style={{background:'lightblue',width:'100%'}}>
                                        <div class="card-body">
                                            <div className="row">
                                                <div className="col-4">Exam Name</div>  
                                                <div className="col-8">{el.title}</div>
                                            </div>
                                            <hr></hr>
                                            <div className="row">
                                                <div className="col-4">Time Taken</div>  
                                                <div className="col-8">{pad2(Math.floor(Number(test.timeTaken) / 60))} : {pad2(Number(test.timeTaken) - Math.floor(Number(test.timeTaken) / 60) * 60)} </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row">
                                                <div className="col-4">Exam Date</div>  
                                                <div className="col-8">{new Date(test.attemptedAt).toUTCString()}  </div>
                                            </div>
                                            <hr></hr>
                                            <div className="row">
                                                <div className="col-4">Mark(%)</div>  
                                                <div className="col-8">{test.score}</div>
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
                                                <div className="col-8">{test.score}/{test.totalMarks}</div>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                )
            }
        </div>
    )
}

export default AllReports
