import React from 'react'
import Questions from './Q3.json';
function Q3() {
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
        let newelement = document.createElement('DIV'); 
        newelement.innerText=element.innerHTML;
        if(ev.target.childNodes.length==0)
        {
            ev.target.appendChild(newelement);
        }
        else
        {
            let delchild = ev.target.childNodes[0];
            ev.target.removeChild(delchild);
            ev.target.appendChild(newelement);
        }
      }
    return (
        <div>
            {
                Questions.map((el,index)=>
                <div>
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px'}}>
                        <h5>{el.question}</h5>
                        <div style={{display:'flex'}} id={'div'+el.type+index} onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
                                {
                                    el.options.map((op,idx)=>
                                    <span style={{border:'2px solid gray',width:'150px',height:'30px',marginRight:'20px',cursor:'pointer',textAlign:'center'}} 
                                    draggable={true} onDragStart={(event)=>drag(event)} id={'drag'+el.type+index+idx}>{op}</span>
                                    )
                                }
                        </div>
                        <br></br> 
                        <div style={{lineHeight:'2.5'}}>
                            {
                                el.q.split("").map((fillq)=>
                                <>
                                        {
                                            fillq=='_'?
                                                <span style={{borderBottom:'2px solid gray',width:'200px',height:'30px',textAlign:'center',display:'inline-block'}}  
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

export default Q3
