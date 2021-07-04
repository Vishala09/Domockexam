import React from 'react'
import Q1 from './Q1'
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
import Q5 from './Q5';
function QuestionPaper() {
    return (
        <div className="container-fluid">
            <h1>Question Paper</h1>
            <Q2 />
            <Q3 />
            <Q4 />
            <Q5 />
        </div>
    )
}

export default QuestionPaper
