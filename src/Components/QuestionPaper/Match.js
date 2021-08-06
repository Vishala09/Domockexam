import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';

function Match({el,index}) {
    const grid = 2;
 
    
const Item = styled.div`
  
user-select: none;
padding: 0.5rem;
margin: 0 0  0.5rem 0;
align-items: flex-start;
align-content: flex-start;
line-height: 1.5;
border-radius: 3px;
background: #fff;
border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};

`;

const Clone = styled(Item)`
+ div {
  display: none!important;
}
`;



const List = styled.div`
border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
background: #fff;
padding: 0.5rem 0.5rem 0;
border-radius: 3px;
flex: 0 0 150px;
font-family: sans-serif;
display:flex;
flex-wrap:wrap;
`;

const Kiosk = styled(List)`
position: relative;
`;

    const [answers, setanswers] = useState([]);
    useEffect(() => {
        for(let i=0;i<el.options.length+1;i++)
        {
          answers[i]='';
        }
        setanswers([...answers])
        el.options.unshift({q:'',a:''})
        
    }, [])


const getItemStyle = (isDragging, draggableStyle,place) => ({
    userSelect: 'none',
    padding: grid,
    margin: '1px',
    background: isDragging ? 'lightgreen' :' ',
    border : place=='top' ? '2px solid black':'',
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
         answers[destination.droppableId]=sourceelem.a;
         setanswers([...answers])
      }
      
    return (
        <div>
            <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <h5>{el.question}</h5>
                            <div >
                            <DragDropContext onDragEnd={onDragEnd} >
                            <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <Kiosk
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {el.options.map((item, ind) => ( ind!=0 &&
                                <Draggable
                                key={ind} draggableId={item.a} index={ind}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }>
                                                {item.a}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.a}</Clone>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </Kiosk>
                    )}
                </Droppable>
                            {/* <Droppable droppableId={index+'top'} isDropDisabled={true}  >
                                    {(provided, snapshot) => (
                                        <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{border:'2px solid black',display:'flex',flexWrap:'wrap'}}
                                        // style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {el.options.map((item, ind) => (  ind!=0 &&
                                            <Draggable key={ind} draggableId={item.a} index={ind}  >
                                            {(provided, snapshot) => (
                                            <>
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style,'top'
                                                )}>
                                                {item.a}
                                                </div>
                                                {snapshot.isDragging && (
                                                    <div  style={getItemStyle(
                                                        snapshot.isDragging,undefined,'top'
                                                    )}>{item.a}</div>
                                                )}
                                            
                                            </>   
                                            )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        </div>
                                    )}
                                    </Droppable> */}
                                   
                                    <div style={{marginTop:'20px'}}>
                                        {
                                            el.options.map((m,ind)=> ( ind!=0 &&
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
                                                                <Draggable key={ind} draggableId={ind} index={ind}
                                                                isDragDisabled={true} isDropDisabled={answers[ind]!=''}
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

                                            ))
                                        }
                                    </div>
                                </DragDropContext>
                               
                            </div>
                        </div>
        </div>
    )
}

export default Match
