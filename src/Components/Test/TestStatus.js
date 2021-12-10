import React from 'react';
import { numToRoman } from '../HelperFunctions/NumToRoman';

function TestStatus(props) {
    const {QuestionsStatus} = props;
    const {Sections} = props;
    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Section</th>
                        <th scope="col">Question</th>
                        <th scope="col">Answered</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Sections.map((sec,sindex)=>
                        <>
                            {
                               sec.questions.map((el,qindex)=>
                               <>
                                    <tr>
                                        <td>{numToRoman(sindex+1)}</td>
                                        <td>{qindex+1}</td>
                                        <td>{QuestionsStatus[el.qusID].answered==true?'Answered':
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

export default TestStatus
