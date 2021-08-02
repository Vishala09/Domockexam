import React, { useEffect, useState } from 'react'
import './Qp.css';

function Q2({el,index}) {
      const [dragged, setDragged] = useState(false);
           
      function dragEnter(event) {
         if(event.target.innerHTML=="")
         {
            event.target.style.border = "3px dotted #0D6EFD";
         } 
      }
      function dragLeave(event) {
          event.target.style.border = "";
      }
      function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        setDragged(false);
          ev.target.style.background="#0D6EFD"; 
        ev.dataTransfer.setData("text", ev.target.id);
      }
      function dragEnd(ev){
          if(dragged==false)
          {
            if(ev.target.style.fontWeight=="bold")
                ev.target.style.background='lightgray';
            else
                ev.target.style.background='white';
            
          }
      }
      
      function drop(ev,index,idx) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let element = document.getElementById(data);
        if(ev.target.childNodes.length==0)
        {
            
            setDragged(true);
            ev.target.style.border = "";
            ev.target.style.padding="2px";
            element.style.background="lightgray"; 
            element.style.fontWeight="bold";
            let newelement = document.createElement('div');  
            
            newelement.innerHTML=element.innerHTML;
            //newelement.classList.add('tooltip')
            let seconds = 's' + new Date().getSeconds();
            newelement.classList.add("div"+element.id);
            newelement.setAttribute("id","div"+element.id+seconds);

            let button = document.createElement('div');
            //button.title="Delete";
            button.classList.add('mytooltip',"tooltipdelete");
            //button.innerHTML="Delete"
            button.classList.add('cp','fa');
            button.classList.add('fa-minus-circle');
            button.setAttribute("id","but"+element.id+seconds);
            button.onclick = function()
            {
                let ind=this.id.indexOf('s');
                if(document.getElementsByClassName("div"+this.id.toString().slice(3,ind)).length==1)
                {
                    document.getElementById(this.id.slice(3,ind)).style.background="white";
                    document.getElementById(this.id.slice(3,ind)).style.fontWeight="normal";
                }
                document.getElementById("div"+this.id.slice(3)).remove();
            }
            let s = document.createElement('span');
            s.innerHTML="Delete";
            s.className="tooltiptext";
            button.appendChild(s);
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
            {/* {
                Questions.map((el,index)=> */}
                <div>
                        <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <h5>{el.question}</h5>
                            <div id={'div'+el.type+index} >
                                {
                                    el.options.map((m,idx)=>
                                    <> 
                                         <span className="dragelement cp" style={{position:'relative'}}
                                         draggable={true}  onDragStart={(event)=>drag(event)} 
                                         onDragEnd={(event)=>dragEnd(event)} id={'drag'+el.type+index+idx}>
                                            <span>{m.a}</span> 
                                            {m.img && <> <br></br>  <img draggable={false} src={m.img} height="70px" width="100px" /> </> } 
                                        </span>
                                         
                                    </>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    el.options.map((m,idx)=>
                                    <div  className="row d-flex align-items-center mb-2">
                                        <div className="col-12 col-md-4" >
                                            <div>{m.q}</div>
                                        </div>
                                        <div className="col-12 col-md-5 d-flex" >
                                            <div className="dropelement col-11" onDragEnter={(event)=>dragEnter(event)}
                                            id={'div'+el.type+index+idx} 
                                            onDrop={(event)=>drop(event,index,idx)} onTouchEnd={(event)=>drop(event,index,idx)}
                                            onDragOver={(event)=>allowDrop(event)} 
                                            onDragLeave={(event)=>dragLeave(event)} onTouchCancel={(event)=>dragLeave(event)}
                                            
                                            >
                                                   
                                            </div>
                                            
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                            
                        </div>
                        <hr></hr>
                </div>
                {/* )
            } */}
        </div>
    )
}

export default Q2
