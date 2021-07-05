import React, { useState } from 'react'
import './Qp.css';
import Questions from './Q2.json';
import Tooltip from '@material-ui/core/Tooltip';
function Q2() {
      function dragEnter(event) {
          if(event.target.innerHTML=="")
          event.target.style.border = "3px dotted green";
      }
      function dragLeave(event) {
          event.target.style.border = "";
      }
      function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      function dragEnd(ev,index,idx){
           // ev.target.style.background="gray";
      }
      
      function drop(ev,index,idx) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let element = document.getElementById(data);

        if(ev.target.childNodes.length==0)
        {
            ev.target.style.border = "";
            element.style.background="lightgray";
            let newelement = document.createElement('Tooltip');  
            newelement.title="Delete";
            newelement.innerHTML=element.innerHTML;
            //newelement.classList.add('tooltip')
            let seconds = 's' + new Date().getSeconds();
            newelement.classList.add("div"+element.id);
            newelement.setAttribute("id","div"+element.id+seconds);
            let button = document.createElement('SPAN');
            //button.classList.add('tooltiptext');
            button.classList.add('cp');
            button.classList.add('fa');
            button.classList.add('fa-minus-circle');
            button.setAttribute("id","but"+element.id+seconds);
            button.onclick = function()
            {
                let ind=this.id.indexOf('s');
                // console.log(this.id,this.id.slice(3,ind));
                // console.log(document.getElementsByClassName("div"+this.id.slice(3,ind)));
                if(document.getElementsByClassName("div"+this.id.toString().slice(3,ind)).length==1)
                {
                    document.getElementById(this.id.slice(3,ind)).style.background="white";
                }
                document.getElementById("div"+this.id.slice(3)).remove();
            }
            newelement.appendChild(button);
            ev.target.appendChild(newelement);
        }
        else
        {
            //  let delchild = ev.target.childNodes[0];
            //  ev.target.removeChild(delchild);
            //  ev.target.appendChild(newelement);
        }
      }
     
    return (
        <div className="">
            {
                Questions.map((el,index)=>
                <div>
                        <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px'}}>
                            <h5>{el.question}</h5>
                            <div style={{width:'100%'}} id={'div'+el.type+index} >
                                {
                                    el.options.map((m,idx)=>
                                    <> 
                                         <span className="dragelement" 
                                         draggable={true} onDragStart={(event)=>drag(event)} 
                                         onDragEnd={(event)=>dragEnd(event,index,idx)} id={'drag'+el.type+index+idx}>{m.a}</span>
                                         
                                    </>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    el.options.map((m,idx)=>
                                    <div  className="row mb-2">
                                        <div className="col-12 col-md-4">{m.q}</div>
                                        <div className="col-12 col-md-5 d-flex">
                                            <div className="dropelement col-11" onDragEnter={(event)=>dragEnter(event)}
                                            id={'div'+el.type+index+idx} onDrop={(event)=>drop(event,index,idx)} 
                                            onDragOver={(event)=>allowDrop(event)} onDragLeave={(event)=>dragLeave(event)} >
                                                   
                                            </div>
                                            
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
