import React, { useCallback, useEffect, useState } from 'react';
import Q2drag from './Q2drag';
import Q2drop from './Q2drop';
import Questions from './Questions.json';
function Q2dnd({el,qindex}) {
    const [Selected, setSelected] = useState([])
    const handleDrop = useCallback((item) => {
       
    }, []);
    const onDropped = (item) => {  
          setSelected(Selected => [...Selected,item]);  
    }
    const onRemoved = (item) => {
        let index=Selected.indexOf(item);
        setSelected(Selected.filter((e,i)=>(i !== index)));
    }
    useEffect(() => {
        console.log('Selected elems ',Selected)
    }, [Selected]);
    
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
                                                    <Q2drag qindex={qindex} Selected={Selected} onDropped={(item) => onDropped(item)} dragElement={op}></Q2drag>
                                            
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
                                               <Q2drop qindex={qindex}  onRemoveHandler={(item) => onRemoved(item)} />    
                                            
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
