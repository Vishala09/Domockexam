import React, { useState } from 'react';
import Q1 from './Q1';
import Q4 from './Q4';
import Q5 from './Q5';
import Q6 from './Q6';
import Questions from './Questions.json';
import 'bootstrap/dist/css/bootstrap.css';
import Q7 from './Q7';
import Q8 from './Q8';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Match from './Match';
import Fillin from './Fillin';
import Rearrange from './Rearrange';
import Q2bdnd from './Q2bdnd';

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
            
            {
                Questions.map((el,index)=>
                <>
                    
                    {/* {el.type=="fillin" && <Q1 el={el} index={index} />}
                    {el.type=="match" && <Match el={el} index={index} /> }
                    { (el.type=="dragin" || el.type=="singledragbox" ) && <Fillin el={el} index={index} />}
                     {el.type=="dropdown" && <Q4 el={el} index={index} />}
                    {el.type=="typein" && <Q5 el={el} index={index} />} */}
                    {(el.qusType=="MCQ") && <Q6 el={el} index={index} />}
                    {/* {el.type=="essay" && <Q7 el={el} index={index} />} */}
                    {(el.qusType=="True or False") && <Q8 el={el} index={index} />} 
                    {el.qusType=="Gap Filling" && <Fillin el={el} index={el.qusID} key={el.qusID} /> }
                    {el.qusType=='One word answer' && <Q1 el={el} index={el.qusID} key={el.qusID} />}

                    {el.qusType=='Match the following' && <Match el={el} index={el.qusID} key={el.qusID}  />}
                    
                    {/* {(el.type=="" || el.type=="rearrangebw") && <Rearrange el={el} index={index} />}  */}
                    <hr></hr>
                </>
                )
            }
          
        </div>
    )
}

export default  QuestionPaper;
