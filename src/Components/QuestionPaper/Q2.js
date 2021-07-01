import React from 'react'
import './Qp.css'
function Q2() {
    function allowDrop(ev) {
        ev.preventDefault();
      }
      
      function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
      }
      
      function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let element = document.getElementById(data);
        let newelement = document.createElement('DIV'); 
        newelement.innerText=element.innerHTML;
        //console.log(ev.target.childNodes);
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
        <div className="">
            <h4>1. Match the following</h4>
            <div style={{marginLeft:'20px'}}>
            <h5>Write the letter of most suitable notice in the given box</h5>
            
            <div style={{display:'flex'}}  id="div1" onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}>
                
                <span style={{border:'2px solid gray',width:'150px',height:'50px',marginRight:'20px'}} draggable={true} 
                onDragStart={(event)=>drag(event)} id="drag1">Handle with care</span>
                <span style={{border:'2px solid gray',width:'150px',height:'50px',marginRight:'20px'}} draggable={true} onDragStart={(event)=>drag(event)} id="drag2">Reference only</span>
                <span style={{border:'2px solid gray',width:'150px',height:'50px',marginRight:'20px'}} draggable={true} onDragStart={(event)=>drag(event)} id="drag3">Take off your shoes</span>
                <span style={{border:'2px solid gray',width:'150px',height:'50px',marginRight:'20px'}} draggable={true} onDragStart={(event)=>drag(event)} id="drag4">Reserved for pregnant mothers</span>
                <span style={{border:'2px solid gray',width:'150px',height:'50px',marginRight:'20px'}} draggable={true} onDragStart={(event)=>drag(event)} id="drag5">Caution! Men at work</span>
                <span style={{border:'2px solid gray',width:'150px',height:'50px',marginRight:'20px'}} draggable={true} onDragStart={(event)=>drag(event)} id="drag6">No bathing rough sea</span>
                
            </div>
            <br></br><br></br>
            <div>
                <div  style={{height:'50px'}} className="row">
                    <div className="col-3">On a box full of glassware</div>
                    <div className="col-3" style={{border:'2px solid gray',width:'300px',height:'50px',textAlign:'center'}}  id="div2" 
                    onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></div>
                </div>
                <div  style={{height:'50px'}} className="row">
                    <div className="col-3">At a building site</div>
                    <div className="col-3" style={{border:'2px solid gray',width:'300px',height:'50px',textAlign:'center'}}  id="div2" 
                    onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></div>
                </div>
                <div  style={{height:'50px'}} className="row">
                    <div className="col-3">On a beach</div>
                    <div className="col-3" style={{border:'2px solid gray',width:'300px',height:'50px',textAlign:'center'}}  id="div2" 
                    onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></div>
                </div>
                <div  style={{height:'50px'}} className="row">
                    <div className="col-3">In a temple</div>
                    <div className="col-3" style={{border:'2px solid gray',width:'300px',height:'50px',textAlign:'center'}}  id="div2" 
                    onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></div>
                </div>
                <div  style={{height:'50px'}} className="row">
                    <div className="col-3">At a house</div>
                    <div className="col-3" style={{border:'2px solid gray',width:'300px',height:'50px',textAlign:'center'}}  id="div2" 
                    onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></div>
                </div>
                <div  style={{height:'50px'}} className="row">
                    <div className="col-3">In a library</div>
                    <div className="col-3" style={{border:'2px solid gray',width:'300px',height:'50px',textAlign:'center'}}  id="div2" 
                    onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></div>
                </div>

            </div>
            
            </div>
        </div>
    )
}

export default Q2
