import React, { useState } from 'react';
import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
import Q5 from './Q5';
import Q6 from './Q6';
import Questions from './Questions.json';
import 'bootstrap/dist/css/bootstrap.css';
import Q7 from './Q7';
import Q8 from './Q8';
import Q9 from './Q9';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';


import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Q2drag from './Q2drag';
import Q2dnd from './Q2dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Q2bdnd from './Q2bdnd';
import Match from './Match';
 import MultiBackend from "react-dnd-multi-backend";
import Dnd from './dnd';
import Fillin from './Fillin';
// import { DragDropContext } from "react-dnd";

function QuestionPaper() {
   
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    return (
        <div className="container-fluid" 
        onPaste={(e)=>{
            toggleShowA()
            e.preventDefault()
            return false;
          }} onCopy={(e)=>{
            toggleShowA()
            e.preventDefault()
            return false;
          }} 
        style={{fontFamily:'"Times New Roman", Times, serif'}}>
            <ToastContainer position="top-end" className="p-3" style={{marginTop:'100px'}}>
                <Toast show={showA} onClose={toggleShowA} delay={2000} animation={true} bg="danger" autohide >
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto">Alert</strong>
                    </Toast.Header>
                    <Toast.Body>Please do not copy/paste</Toast.Body>
                </Toast>
                
            </ToastContainer>
            <h1>Question Paper</h1>
         
                {/* {
                    Questions.map((el,index)=>
                    <div >
                        {
                            (el.type=="dragin" || el.type=="singledragbox") && <Fillin el={el} index={index} />
                        }

                    </div>
                    )
                } */}
          
            
            {
                Questions.map((el,index)=>
                <>
                {/* <h5>Question Type : {el.type}</h5> */}
                    {/* {el.type=="fillin" && <Q1 el={el} index={index} />} */}
                    {el.type=="match" && <Match el={el} index={index} /> }
                    { (el.type=="dragin" || el.type=="singledragbox") && <Fillin el={el} index={index} />}
                    {/* {el.type=="dropdown" && <Q4 el={el} index={index} />}
                    {el.type=="typein" && <Q5 el={el} index={index} />}
                    {(el.type=="radio" || el.type=="check") && <Q6 el={el} index={index} />}
                    {el.type=="essay" && <Q7 el={el} index={index} />}
                    {(el.type=="trueorfalse" || el.type=="trueorfalsednd") && <Q8 el={el} index={index} />}
                    {(el.type=="rearrange" || el.type=="rearrangebw") && <Q9 el={el} index={index} />} */}
                    <hr></hr>
                </>
                )
            }
          
        </div>
    )
}

export default  QuestionPaper;
