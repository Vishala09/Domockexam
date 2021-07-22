import React, { useState } from 'react'

function Q9({el,index}) {
    const [choosed, setChoosed] = useState(false);
    const [dragged, setDragged] = useState(false);
        
    function dragEnter(event,type) {
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
        //DRAG HAS ENDED , BUT NOT IN ANSWER AREA (SOMEWHERE OUTSIDE)
        if(dragged==false)
        {
          if(ev.target.style.fontWeight=="bold")
          {
             ev.target.style.background='lightgray';
          }
          else
          {
             ev.target.style.background='white';
          }
          
        }
    }
    
    function drop(ev,type,id) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      let element = document.getElementById(data);
      if(element.id.slice(0,6).includes("choose"))
      {
          setChoosed(true);
      }
      console.log(data);
      if((ev.target.childNodes.length==0))
      {
          setDragged(true);
          var elems = document.querySelectorAll(".dragchoose"+index);
            if(element.id.includes("choo")){
                [].forEach.call(elems, function(el) {
                    el.style.fontWeight="normal";
                    el.style.background="#808080";
                   // el.style.opacity=0.8;
                    el.draggable=false;
                });
            }
          ev.target.style.border = "";
          ev.target.style.padding="0px";
          element.style.background="lightgray"; 
          element.style.fontWeight="bold";
          
          let newelement = document.createElement('div');  
          
          newelement.innerHTML=element.innerHTML;
          let seconds = 's' + new Date().getSeconds();
          newelement.classList.add("div"+element.id,"mr-10");
          newelement.setAttribute("id","div"+element.id+seconds);
          

          let button = document.createElement('div');
          button.classList.add('mytooltip',"tooltipdelete");
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
              
              if(this.id.slice(3,ind).slice(0,4)=="choo")
              {
                var elems = document.querySelectorAll(".dragchoose"+index);
            
                [].forEach.call(elems, function(el) {
                    el.style.fontWeight="normal";
                    el.style.background="white";
                    el.style.opacity=1;
                    el.draggable=true;
                });
              }
          }
          let s = document.createElement('span');
          s.innerHTML="Delete";
          s.className="tooltiptext";
          button.appendChild(s);
          newelement.appendChild(button);
          ev.target.appendChild(newelement);
      }
    }
    return (
        <div>
             <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                <div style={{marginLeft:'20px',marginRight:'20px'}}>
                    <h5>{el.question}</h5>
                    {
                        el.type=="rearrange" ?
                        <>
                    <div className="d-flex flex-row flex-wrap">
                        { el.q.map((q,ind)=>
                        <>
                            {ind==0?<span style={{marginRight:"10px"}}>{q}</span>:
                            <span  style={{marginRight:"10px"}}>
                                 <div className="dropelementrearrange" onDragEnter={(event)=>dragEnter(event,"rearrange")}
                                            id={'div'+el.type+index+ind} onDrop={(event)=>drop(event,"rearrange")} 
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
                    </>
                    :
                    <>
                     <div >
                        { el.q.map((q,ind)=>
                        <>
                            {
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
                        <span className="dragelement" >
                            { el.choose.map((q,ind)=>
                            <>
                                {
                                <span style={{border:'2px solid black',borderRadius:'5px',padding:'4px'}} className={" cp dragchoose"+index} 
                                            draggable={true} onDragStart={(event)=>drag(event)} id={'choo'+el.type+index+ind}
                                            onDragEnd={(event)=>dragEnd(event)} >
                                        <span>{q}</span>  
                                </span> 
                                }
                            </>
                            ) }
                        </span>
                    </div>
                    <p></p>
                    <div className="d-flex flex-row flex-wrap">
                        
                        { el.q.map((q,ind)=>
                            
                            <span  style={{marginRight:"2px"}}>
                                 <div className="dropelementrearrange" onDragEnter={(event)=>dragEnter(event,"rearrangebw")}
                                            id={'div'+el.type+index+ind} onDrop={(event)=>drop(event,"rearrangebw")} 
                                            onDragOver={(event)=>allowDrop(event)} onDragLeave={(event)=>dragLeave(event)} >
                                                   
                                 </div>
                            </span>
                            
                        ) }
                            <span  style={{marginRight:"2px"}}>
                                 <div className="dropelementrearrange" onDragEnter={(event)=>dragEnter(event,"rearrangebw")}
                                            id={'div'+el.type+index} onDrop={(event)=>drop(event,"rearrangebw")} 
                                            onDragOver={(event)=>allowDrop(event)} onDragLeave={(event)=>dragLeave(event)} >
                                                   
                                 </div>
                            </span>
                           
                    </div>
                    <p></p>
                   
                    </>
                }
                </div>
                
            <hr></hr>
        </div>
    )
}

export default Q9
