import React, { useState } from 'react'
import './Qp.css';
import Questions from './Q2.json'
function Q2() {
    const [Ques, setQues] = useState(Questions);
      function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        // let element = document.getElementById(ev.target.id);
        // element.style.fontWeight=900;
        ev.dataTransfer.setData("text", ev.target.id);
      }
      
      function drop(ev,index,idx) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let element = document.getElementById(data);
        // let newelement = document.createElement('DIV'); 
        // newelement.innerText=element.innerHTML;
        if(ev.target.childNodes.length==0)
        {
            Ques[index].match[idx].selectedanswer=element.innerHTML;
            setQues([...Ques]);
            //ev.target.appendChild(newelement);
        }
        else
        {
            // let delchild = ev.target.childNodes[0];
            // ev.target.removeChild(delchild);
            // ev.target.appendChild(newelement);
        }
      }
      function removeSelectedAnswer(index,idx){
        Ques[index].match[idx].selectedanswer="";
        setQues([...Ques]);
      }
    return (
        <div className="">
            {
                Questions.map((el,index)=>
                <div>
                        <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px'}}>
                            <h5>{el.question}</h5>
                            <div id={'div'+el.type+index} onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
                                {
                                    el.match.map((m,idx)=>
                                    <> 
                                         <span className="dragelement"
                                    draggable={true} onDragStart={(event)=>drag(event)} id={'drag'+el.type+index+idx}>{m.a}</span>
                                         
                                    </>
                                    )
                                }
                            </div>
                            <br></br> <br></br>
                            <div>
                                {
                                    el.match.map((m,idx)=>
                                    <div  className="row mb-2">
                                        <div className="col-12 col-md-4">{m.q}</div>
                                        <div className="col-12 col-md-5 d-flex">
                                            <div className="dropelement col-11" 
                                            id={'div'+el.type+index} onDrop={(event)=>drop(event,index,idx)} onDragOver={(event)=>allowDrop(event)}>
                                                    {Ques[index].match[idx].selectedanswer}
                                            </div>
                                            {
                                            Ques[index].match[idx].selectedanswer!="" &&
                                            <div onClick={()=>removeSelectedAnswer(index,idx)} className="close">X</div>
                                            }
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                        <hr></hr>
                </div>
                )
            }
        </div>
    )
}

export default Q2
