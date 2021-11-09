import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Rearrange(props) {
    const {el,index,qusID,isResult,Results} = props
    const [choosed, setChoosed] = useState(false);


const Item = styled.div`
    display: flex;
    user-select: none;
    padding: 3px;
    margin: 2px;
    align-items: center;
    align-content: flex-start;
    flex-direction:column;
  //  line-height: 1.5;
    border-radius: 3px;
    border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid black')};
    background: ${props => (props.isDragging ? 'lightblue' : '')};
    font-size:15px;
`;

const Clone = styled(Item)`
    + div {
        display: none !important;
    }
`;
const List = styled.div`

`;

const Kiosk = styled(List)`
  
`;

    const [answers, setanswers] = useState([]);
    useEffect(() => {
        for(let i=0;i<el.options.length;i++)
        {
          answers[i]='';
        }
        setanswers([...answers]);
    }, [])


    const getItemStyle = (isDragging, draggableStyle,place) => ({
        userSelect: 'none',
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver,item) => ({

        background: isDraggingOver ? 'lightblue' : '',
        borderBottom:isDraggingOver ? '2px solid dodgerblue' : '2px dotted black',
        minWidth:item!='' ? '10px' : '100px',
        minHeight:'25px',
        textAlign: 'center',
        display: 'inline-block',
        fontStyle: 'italic',
        fontWeight: 600
    });

      function onDragEnd(result) {
        const { destination, source, draggableId } = result
        console.log(source,destination,source.index>=el.q.length-1);
        if (!destination) {
          return
        }
    if(answers[destination.droppableId-1] != "")
    {
        return;
    }
    if(source.index>=el.q.length-1)
    {
        source.index=source.index-el.q.length;
        let sourceelem = el.choose[source.index];
        answers[destination.droppableId-1]=sourceelem;
        setanswers([...answers])
        setChoosed(true);
    }
    else{
         let sourceelem = el.q[source.index];
         answers[destination.droppableId-1]=sourceelem;
         setanswers([...answers])
    }
      }
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
      );
      const remove = (ind) => {
          if(el.choose.includes(answers[ind]))
          {
              setChoosed(false);
          }
          answers[ind]='';
          setanswers([...answers])
      }
      useEffect(() => {
          console.log('choosed',choosed);
      }, [choosed])
    return (
        <div>

                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <h5>{el.questionName}</h5>
                            <div >
                            <DragDropContext onDragEnd={onDragEnd} >
                            <div className="d-flex flex-row flex-wrap" >
                            {el.options.map((item, ind) => ( (el.choose!=null && ind!=el.options.length-1) &&
                            <Droppable droppableId={'items'+ind} isDropDisabled={true}>
                            {(provided, snapshot) => (
                            <Kiosk 
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            //className="btn"
                            >
                            
                                <Draggable
                                key={ind} draggableId={item} index={ind}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>                            
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                
                                                className={answers.includes(item) && 'selected'}
                                                >
                                                {item} 
                                               
                                            </Item>
                                             {snapshot.isDragging && (
                                                        <Clone isDragging={snapshot.isDragging}> {item}</Clone>
                                                    )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                           
                        </Kiosk>
                    )}
                </Droppable>
                //CHOOSE
                 ))}
                <div style={{border:'1px solid black',display:'flex',borderRadius:'3px'}}>
                {el.choose.map((item, ind) => (  
               <Droppable droppableId={'items'+ind} isDropDisabled={true}>
                            {(provided, snapshot) => (
                            <Kiosk 
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            //className="btn"
                            style={{fontSize:'13px'}}
                            >
                            
                                <Draggable 
                                isDragDisabled={choosed==true ? true : false}
                                key={ind+el.q.length-1} draggableId={item} index={ind+el.q.length-1}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>                            
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                type='rchoose'
                                                className={answers.includes(item) ? 'selected' : choosed==true ? 'choosed':'' }

                                                >
                                                {item} 
                                               
                                            </Item>
                                                    {/* {snapshot.isDragging && (
                                                        <Item isDragging={snapshot.isDragging} type='rchoose' item={'stay'} >
                                                            {item}
                                                           
                                                        </Item>
                                                    )} */}
                                             {snapshot.isDragging && (
                                                        <Clone isDragging={snapshot.isDragging}> {item}</Clone>
                                                    )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                           
                        </Kiosk>
                    )}
                </Droppable>

                 ))}
                 </div>
                 </div>
                            
                                   
                                    <div style={{marginTop:'20px'}} className="d-flex flex-row flex-wrap" >
                                        {
                                            el.q.map((m,ind)=> ( 
                                            
                                                    <span style={{fontStyle:'italic',marginRight:'20px'}}   >
                                                      <Droppable droppableId={ind+1}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver,answers[ind])}
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
                                                                        provided.draggableProps.style
                                                                    )}
                                                                    >
                                                                        {answers[ind] && answers[ind]}
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
                                                                    
                                                                )}
                                                                </Draggable>
                                                            
                                                            {/* {provided.placeholder} */}
                                                            </div>
                                                        )}
                                                        </Droppable>  
                                                       
                                                    </span>
                                                    
                                                
                                            ))
                                        }

                                        
                                    </div>
                                </DragDropContext>
                               
                            </div>
                        </div>
        </div>
    )
}

export default Rearrange
