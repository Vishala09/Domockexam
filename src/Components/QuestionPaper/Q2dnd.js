import React, { useCallback, useState } from 'react';
import Q2drag from './Q2drag';
import Q2drop from './Q2drop';
import Questions from './Questions.json';
function Q2dnd({el}) {
    const [Selected, setSelected] = useState([])
    const handleDrop = useCallback((item) => {
       
    }, []);
    const onDropped = (item) => {
        let sel=Selected;
        sel.push(String(item))
        setSelected([...sel]);
    }
    const onRemoved = (item) => {
        let sel=Selected;
        let ind=sel.indexOf(item)
        sel = sel.filter(checkAdult)    
        function checkAdult(s,index) {
            return index!=ind;
        }
        setSelected([...sel])
    }
    return (
        <div>
            <div>
                        <h4>{1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            
                            <h5>{el.question}</h5>
                            {
                                
                                        <ul>
                                            {
                                                el.options.map((op)=>
                                                    <Q2drag Selected={Selected} onDropped={(item) => onDropped(item)} dragElement={op.q}></Q2drag>
                                            
                                                )
                                            }
                                        </ul>
                                  
                            }
                            
                            <div>
                                {
                                    el.options.map((m,idx)=>
                                    <div  className="row d-flex align-items-center mb-2">
                                        <div className="col-12 col-md-4" >
                                            <div>{m.q}</div>
                                        </div>
                                        <div className="col-12 col-md-5 d-flex" >
                                               <Q2drop  onRemoveHandler={(item) => onRemoved(item)} />    
                                            
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                         
                        </div>
            </div>
                {/* 
                <Q2drag onDropped={(item) => onDropped(item)} dragElement={'A'}></Q2drag>
                <Q2drop onDrop={(item) => handleDrop(item)} droppedElement={droppedElem} />
                */}
            
           
            
        </div>
    )
}

export default Q2dnd
