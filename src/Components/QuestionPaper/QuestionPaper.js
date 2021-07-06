import React from 'react';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
import Q5 from './Q5';
function QuestionPaper() {
    return (
        <div className="container-fluid" style={{fontFamily:'"Times New Roman", Times, serif'}}>
            <h1>Question Paper</h1>
            <Q2 />
            <Q3 />
            
            <Q5 />
            <Q4 />
        </div>
    )
}

export default QuestionPaper
