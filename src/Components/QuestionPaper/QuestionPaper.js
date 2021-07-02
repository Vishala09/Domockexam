import React from 'react'
import Q1 from './Q1'
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
function QuestionPaper() {
    return (
        <div className="container-fluid">
            {/* <DndProvider backend={HTML5Backend }> */}
            <h1>Question Paper</h1>
            <Q2 />
            
            <Q3 />
            <Q4 />
            {/* </DndProvider> */}
        </div>
    )
}

export default QuestionPaper
