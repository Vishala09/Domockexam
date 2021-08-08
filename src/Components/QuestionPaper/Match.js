import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Match({el,index}) {
    const grid = 2;
 
const Item = styled.div`  
user-select: none;
border-radius: 3px;
text-align:center;
border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid black')};
`;

const List = styled.div`
background: #fff;
padding: 2px;
border-radius: 3px;
font-family: sans-serif;
`;
//flex: 0 0 200px;
const Kiosk = styled(List)`
    height: ${props => (props.img ? '100px' : '32px')};
    min-width:200px;
    margin:5px;
`;

    const [answers, setanswers] = useState([]);
    useEffect(() => {
        el.options.unshift({q:'',a:''})
        for(let i=0;i<el.options.length;i++)
        {
          answers[i]='';
        }
        setanswers([...answers]);
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

    background: isDraggingOver && place=='down' ? 'lightblue' : '',
    padding: grid,
    border:isDraggingOver && place=='down' ? '2px solid dodgerblue' : '2px dotted black',
    minWidth: 250,
    minHeight:place=='down' ? '35px':'25px',
    margin:'2px'
});

      function onDragEnd(result) {
        const { destination, source, draggableId } = result
        console.log(source,destination);
        if (!destination) {
          return
        }
    
         let sourceelem = el.options[source.index];
         answers[destination.droppableId]=sourceelem;
         setanswers([...answers])
      }
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
      );
      const remove = (ind) => {
          answers[ind]='';
          setanswers([...answers])
      }
    return (
        <div>
            <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <h5>{el.question}</h5>
                            <div >
                            <DragDropContext onDragEnd={onDragEnd} >
                                <div className="d-flex flex-row flex-wrap" style={{overflow:'hidden'}}>
                            {el.options.map((item, ind) => ( ind!=0 &&
                            <Droppable droppableId={'items'+ind} isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <Kiosk 
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            img={item.img?true:false}
                            >
                            
                                <Draggable
                                key={ind} draggableId={item.a} index={ind}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>                            
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                
                                                className={answers.includes(item) && 'selected'}
                                                >
                                                {item.a} 
                                                {
                                                    item.img && 
                                                    <>
                                                    <img draggable={false} src={item.img} height="70px" width="100px" />
                                                    </>
                                                }
                                            </Item>
                                                    {snapshot.isDragging && (
                                                        <Item >
                                                            {item.a}
                                                            {
                                                                item.img && 
                                                                <>
                                                                <img draggable={false} src={item.img} height="70px" width="100px" />
                                                                </>
                                                            }
                                                        </Item>
                                                    )}
                                            
                                        </React.Fragment>
                                    )}
                                </Draggable>
                           
                        </Kiosk>
                    )}
                </Droppable>
                 ))}
                 </div>
                            
                                   
                                    <div style={{marginTop:'20px'}} >
                                        {
                                            el.options.map((m,ind)=> ( ind!=0 &&
                                            <div  className="row d-flex align-items-center mb-2">
                                                <div className="col-12 col-md-4" >
                                                    <div>{m.q}</div>
                                                </div>
                                                <div className="col-12 col-md-5" >
                                                    <div style={{fontStyle:'italic',display:'flex',alignItems:'center'}} className="text-center col-11"  >
                                                      <Droppable droppableId={ind}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver,'down')}
                                                            >
                                                                <Draggable key={ind} draggableId={ind} index={ind}
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
                                                                        {answers[ind] && answers[ind].a}
                                                                        {answers[ind] && answers[ind].img &&
                                                                        <>
                                                                        <img draggable={false} src={answers[ind].img} height="70px" width="100px" />
                                                                        </>
                                                                        }
                                                                    </div>
                                                                )}
                                                                </Draggable>
                                                            
                                                            {provided.placeholder}
                                                            </div>
                                                        )}
                                                        </Droppable>  
                                                        {
                                                                            answers[ind]!="" &&
                                                                            <OverlayTrigger
                                                                                placement="right"
                                                                                delay={{ show: 250, hide: 100 }}
                                                                                overlay={renderTooltip}
                                                                            >
                                                                                <i onClick={()=>remove(ind)} class="fa fa-minus-circle mytooltip tooltipdelete cp"></i>
                                                                            </OverlayTrigger>
                                                                        }
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
