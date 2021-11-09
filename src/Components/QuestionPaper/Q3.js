import React, { useEffect, useState } from 'react';
import './Qp.css';
 
function Q3({el,index}) {
    const [dragged, setDragged] = useState(false);
    const [Questions, setQuestions] = useState(el);
    useEffect(() => {
        //for(let i=0;i<Questions.length;i++){
            let str=Questions.q; //[^A-Za-z0-9]
            const regex = /{[^\s]+}/ig;
            str = str.replace(regex, '_');
            Questions.q=str;
       // }
        
         setQuestions({...Questions})
        }, [])
        function dragEnter(event) {
            if(event.target.innerHTML=="")
            event.target.style.borderBottom = "3px dotted #0D6EFD";
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
        function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let element = document.getElementById(data);
        
        if(ev.target.childNodes.length==0)
        {
            setDragged(true);
            ev.target.style.border = "";
            ev.target.style.padding="0px";
            element.style.background="lightgray";element.style.fontWeight="bold";
            let newelement = document.createElement('div');  
            newelement.innerHTML=element.innerHTML;
            let seconds = 's' + new Date().getSeconds();
            newelement.classList.add("div"+element.id);
            newelement.setAttribute("id","div"+element.id+seconds);
            let button = document.createElement('div');
            button.classList.add('mytooltip',"tooltipdelete");
            button.classList.add('cp','fa','fa-minus-circle');
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
            // let delchild = ev.target.childNodes[0];
            // ev.target.removeChild(delchild);
            // ev.target.appendChild(newelement);
        }
      }
    return (
        <div>
            {/* {
                Questions.map((el,index)=> */}
                <div >
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        <h5>{el.question}</h5>
                        {
                            el.image ? 
                            <div className=" row d-flex flex-row flex-wrap">
                                <div className="col-8">
                                    <img src={el.image} height="350px" width="100%" />
                                </div>
                                <div className="col-4 " style={{border:'2px solid black',borderRadius:'5px',display:'flex',flexDirection:'column'}} 
                                id={'div'+el.type+index} >
                                    {
                                        el.options.map((op,idx)=>
                                        <div>
                                            <span className="dragelementright cp " onDragEnd={(event)=>dragEnd(event)}
                                            draggable={true} onDragStart={(event)=>drag(event)} id={'drag'+el.type+index+idx}>{op+' '}</span>
                                        </div>
                                        )
                                    }
                                </div>
                            </div> :
                            el.type=='singledragbox' ? 
                            <div style={{border:'2px solid black',padding:'5px',display:'flex',justifyContent:'space-between',borderRadius:'5px',flexWrap:'wrap'}} id={'div'+index} onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
                            {
                                el.options.map((op,idx)=>
                                <span className="dragelementright cp" onDragEnd={(event)=>dragEnd(event)}
                                draggable={true} onDragStart={(event)=>drag(event)} id={'drag'+index+idx}>{op+' '}</span>
                                )
                            }
                            </div>
                            :
                            // Q3 - BASIC TYPE
                            <div  id={'div'+index} onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
                            {
                                el.options.map((op,idx)=>
                                <span className="dragelement" onDragEnd={(event)=>dragEnd(event)}
                                draggable={true} onDragStart={(event)=>drag(event)} id={'drag'+index+idx}>{op+' '}</span>
                                )
                            }
                            </div>
                        }
                        
                        <div style={{}} className="">
                            
                            {
                                el.q.split("").map((fillq,idx)=>
                                <>
                                        {
                                            fillq=='_'?
                                                <span className="dropelementdragin" 
                                                onDragEnter={(event)=>dragEnter(event)} onDragLeave={(event)=>dragLeave(event)}
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
                {/* )
            } */}
        </div>
    )
}

export default Q3
