import React, { useState } from 'react';
import './Qp.css';
import Questions from './Q3.json';
 
function Q3() {
    const [idindex, setidindex] = useState(0);
      function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }

      function drop(ev,index,idx) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let element = document.getElementById(data);
        

        if(ev.target.childNodes.length==0)
        {
          
            element.style.background="gray";

            let newelement = document.createElement('DIV');  newelement.innerText=element.innerHTML;
            newelement.setAttribute("id","div"+element.id);
            let button = document.createElement('SPAN');
            button.classList.add('close');
            button.innerHTML = "X";
            button.setAttribute("id","but"+element.id);
            button.onclick = function()
            {
                //alert(this.id);
                document.getElementById(this.id.toString().slice(3)).style.background="white";
                document.getElementById("div"+this.id.toString().slice(3)).remove();
            }
            
            newelement.appendChild(button);
            ev.target.appendChild(newelement);
        }
        else
        {
            // let delchild = ev.target.childNodes[0];
            // ev.target.removeChild(delchild);
            // ev.target.appendChild(newelement);
        }
      }
    return (
        <div className="container-fluid">
            {
                Questions.map((el,index)=>
                <div >
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px'}}>
                        <h5>{el.question}</h5>
                        <div className="" id={'div'+index} onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
                            {
                                el.options.map((op,idx)=>
                                <span className="dragelement"
                                draggable={true} onDragStart={(event)=>drag(event)} id={'drag'+index+idx}>{op+' '}</span>
                                )
                            }
                        </div>
                        <div style={{lineHeight:window.screen.width>770?2.5:1.5}}>
                            
                            {
                                el.q.split("").map((fillq,idx)=>
                                <>
                                        {
                                            fillq=='_'?
                                                <span className="dropelementfillin" 
                                                onDrop={(event)=>drop(event,index,idx)} onDragOver={(event)=>allowDrop(event)}>
                                                        
                                                </span>
                                            :
                                            fillq
                                        }
                                </>
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

export default Q3
