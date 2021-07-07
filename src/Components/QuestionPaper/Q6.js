import React from 'react'
import './Qp.css';
import Questions from './Q6.json';
import Parser from 'html-react-parser';
function Q6() {
    return (
        <div>
            {
                Questions.map((el) => 
                <div>
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px'}}>
                        <h5>{el.question}</h5>

                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Q6
