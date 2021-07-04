import React from 'react';
import './Qp.css';
import Questions from './Q3.json';
import ExamHall4 from '../../images/ExamHall4.jpg'
function Q4() {
    function dragEnter(event) {
        if(event.target.innerHTML=="")
        event.target.style.borderBottom = "3px dotted green";
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

      function drop(ev,index,idx) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let element = document.getElementById(data);
        if(ev.target.childNodes.length==0)
        {
            ev.target.style.border = "";
            element.style.background="lightgray";
            let newelement = document.createElement('DIV');  newelement.innerText=element.innerHTML;
            let seconds = 's' + new Date().getSeconds();
            newelement.setAttribute("class","div"+element.id); 
            newelement.setAttribute("id","div"+element.id+seconds);
            let button = document.createElement('SPAN');
            button.classList.add('cp');
            button.classList.add('fa');
            button.classList.add('fa-minus-circle');
            button.setAttribute("id","but"+element.id+seconds);
            button.onclick = function()
            {
                let ind=this.id.indexOf('s');
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
                        <div className="row d-flex flex-row">
                            <div className="col-8">
                                <img src={ExamHall4} height="300px" width="100%" />
                            </div>
                            <div className="col-4 d-flex flex-column" style={{border:'2px solid black'}} id={'div'+el.type+index} >
                                {
                                    el.options.map((op,idx)=>
                                    <span className="q4drag" 
                                    draggable={true} onDragStart={(event)=>drag(event)} id={'drag'+el.type+index+idx}>{op+' '}</span>
                                    )
                                }
                            </div>
                        </div>
                        <div style={{lineHeight:window.screen.width>770?2.5:1.5}}>
                            
                            {
                                el.q.split("").map((fillq)=>
                                <>
                                        {
                                            fillq=='_'?
                                                <span className="dropelementfillin" onDragEnter={(event)=>dragEnter(event)} onDragLeave={(event)=>dragLeave(event)}
                                                id={'div'+el.type+index} onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
                                                        
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

export default Q4
