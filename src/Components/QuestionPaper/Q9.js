import React, { useState } from 'react'

function Q9({el,index}) {
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
      console.log(data);
      if(ev.target.childNodes.length==0)
      {
          
          setDragged(true);
          ev.target.style.border = "";
          ev.target.style.padding="0px";
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
        <div>
             <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                <div style={{marginLeft:'20px',marginRight:'20px'}}>
                    <h5>{el.question}</h5>
                    <div className="d-flex flex-row flex-wrap">
                        { el.q.map((q,ind)=>
                        <>
                            {ind==0?<span style={{marginRight:"10px"}}>{q}</span>:
                            <span  style={{marginRight:"10px"}}>
                                 <div className="dropelementrearrange" onDragEnter={(event)=>dragEnter(event)}
                                            id={'div'+el.type+index+ind} onDrop={(event)=>drop(event,index,ind)} 
                                            onDragOver={(event)=>allowDrop(event)} onDragLeave={(event)=>dragLeave(event)} >
                                                   
                                 </div>
                            </span>
                            }
                        </>
                        ) }
                    </div>
                    <p></p>
                    <div className="d-flex flex-row flex-wrap">
                        { el.q.map((q,ind)=>
                        <>
                            {ind==0?<span className=""></span>:
                            <span  className="">
                               <span className="dragelement cp" 
                                         draggable={true} onDragStart={(event)=>drag(event)} 
                                         onDragEnd={(event)=>dragEnd(event)} id={'drag'+el.type+index+ind}>
                                           <span>{q}</span>  
                                </span> 
                            </span>
                            }
                        </>
                        ) }
                    </div>
                </div>
            <hr></hr>
        </div>
    )
}

export default Q9
