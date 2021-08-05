import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Match({el,index}) {
    const [answers, setanswers] = useState([]);
    useEffect(() => {
        for(let i=0;i<el.options.length;i++)
        {
          answers[i]='';
        }
        setanswers([...answers])
    }, [])
    const grid = 2;

const getItemStyle = (isDragging, draggableStyle,place) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: '1px',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' :' ',
    border : place=='top' ? '2px solid black':'',
    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver,place) => ({
    background: isDraggingOver && place=='down' ? 'lightblue' : 'lightgrey',
    padding: grid,
    border:isDraggingOver && place=='down' ? '2px solid yellow' : '2px solid black',
    minWidth: 250,
    minHeight:place=='down' ? '40px':'25px',
    display:'flex',
    margin:'2px'
});

      function onDragEnd(result) {
        const { destination, source, draggableId } = result
        console.log(source,destination);
        if (!destination) {
          return
        }
    
         let sourceelem = el.options[source.index];
         answers[destination.index]=sourceelem.a;
         setanswers([...answers])
      }
      
    return (
        <div>
            <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <h5>{el.question}</h5>
                            <div >
                            <DragDropContext onDragEnd={onDragEnd} >
                                    <Droppable droppableId={index+'top'}>
                                    {(provided, snapshot) => (
                                        <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {el.options.map((item, ind) => (
                                            <Draggable key={ind} draggableId={item.a} index={ind}>
                                            {(provided, snapshot) => (
                                                <div 
                                                
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style,'top'
                                                )}
                                                >
                                                {item.a}
                                                </div>
                                            )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        </div>
                                    )}
                                    </Droppable>
                                   
                                    <div style={{marginTop:'20px'}}>
                                        {
                                            el.options.map((m,ind)=>
                                            <div  className="row d-flex align-items-center mb-2">
                                                <div className="col-12 col-md-4" >
                                                    <div>{m.q}</div>
                                                </div>
                                                <div className="col-12 col-md-5" >
                                                    <div className="dropelement col-11"  >
                                                      <Droppable droppableId={ind}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver,'down')}
                                                            >
                                                                <Draggable key={ind} draggableId={m.a+'down'} index={ind}
                                                                isDragDisabled={true}
                                                                >
                                                                {(provided, snapshot) => (
                                                                    <div 
                                                                    
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={getItemStyle(
                                                                        snapshot.isDragging,
                                                                        provided.draggableProps.style,'down'
                                                                    )}
                                                                    >
                                                                        {answers[ind]}
                                                                    </div>
                                                                )}
                                                                </Draggable>
                                                            
                                                            {provided.placeholder}
                                                            </div>
                                                        )}
                                                        </Droppable>  
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            )
                                        }
                                    </div>
                                </DragDropContext>
                               
                            </div>
                        </div>
        </div>
    )
}

export default Match
