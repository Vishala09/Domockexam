import React, { useState } from 'react';
import { numToRoman } from '../HelperFunctions/NumToRoman';

function TestStatus(props) {
    const {QuestionsStatus} = props;
    const {Sections} = props;
    let [quesNumber, setquesNumber] = useState(1);
    return (
        <div className='row align-items-start justify-content-between customtable p-1'>
                  
                        {/* <div className='col-6'>
                            <table style={{width:'100%'}} className="customtable">
                                <thead >
                                    <tr>
                                        <th className="col-2" scope="col">Section</th>
                                        <th className="col-2" scope="col">Question</th>
                                        <th className="col-8" scope="col">Answer Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className='col-6'>
                            <table style={{width:'100%'}} className="customtable">
                                <thead >
                                    <tr>
                                        <th className="col-2" scope="col">Section</th>
                                        <th className="col-2" scope="col">Question</th>
                                        <th className="col-8" scope="col">Answer Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div> */}
                    {
                        Sections.map((sec,sindex)=>
                        <div className='col-6'>
                        <table style={{width:'100%'}} className="mt-1 ">
                            <thead style={{fontSize:'14px'}}>
                                
                            </thead>
                            <tbody>
                                {
                                    sec.sections.map((subsec,subsecind)=>
                                    <>
                                    {
                                        subsec.questions.map((el,qindex)=>
                                        <>
                                                <tr>
                                                    <th className="col-2">{numToRoman(sindex+1)}</th>
                                                    <td className="col-2">{quesNumber++}</td>
                                                    <td className="col-8">{QuestionsStatus[el.qusID].answered==true?'Answered':
                                                        QuestionsStatus[el.qusID].halfanswered==true?'Partially Answered':'Not Answered'}</td>
                                                </tr>
                                        </>
                                        )
                                    }
                                    </>
                                    )
                                }
                            
                             </tbody>
                            </table>
                        </div>
                        )
                    }
                    
                    
               
        </div>
    )
}

export default TestStatus
