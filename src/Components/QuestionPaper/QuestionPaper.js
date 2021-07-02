import React from 'react'
import Q1 from './Q1'
import {DndProvider} from 'react-dnd';
import {HTML5Backend } from 'react-dnd-html5-backend'
import Q2 from './Q2';
import Q3 from './Q3';
function QuestionPaper() {
    return (
        <div className="container-fluid">
            {/* <DndProvider backend={HTML5Backend }> */}
            <h1>Question Paper</h1>
            <Q2 />
            
            <Q3 />
            {/* </DndProvider> */}
        </div>
    )
}

export default QuestionPaper
