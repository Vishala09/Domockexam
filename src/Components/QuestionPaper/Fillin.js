import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Fillin({el,index}) {
    const grid = 2;
 
const Item = styled.div`  
user-select: none;
border-radius: 3px;
text-align:center;
margin-top:2px;
border: 1px ${props => (el.type!=="singledragbox" ? props.isDragging ? 'dashed #000' : 'solid black' : '')};
background: ${props => (props.isDragging && props.item=='stay' ? 'lightblue' : '')};
`;

const List = styled.div`
background: #fff;
border-radius: 3px;
font-family: sans-serif;

`;

const Kiosk = styled(List)`
    height: ${props => (props.img ? '100px' : '30px')};
    min-width:100px;
    
`;

    const [answers, setanswers] = useState({});
    const [Questions, setQuestions] = useState(el);

    useEffect(() => {
        el.options.unshift({q:'',a:''})
        
    }, [])
    
    useEffect(() => {
            let str=Questions.q; //[^A-Za-z0-9]
            const regex = /{[^\s]+}/ig;
            str = str.replace(regex, '_');
            Questions.q=str;        
         setQuestions({...Questions})
        }, [])

const getItemStyle = (isDragging, draggableStyle,place) => ({
    userSelect: 'none',
    ...draggableStyle
});

const getListStyle = (isDraggingOver,item) => ({

    background: isDraggingOver ? 'lightblue' : '',
    borderBottom:isDraggingOver ? '2px solid dodgerblue' : '2px dotted black',
    minWidth:item!=undefined ? '10px' : '100px',
    minHeight:'25px',
    textAlign: 'center',
    display: 'inline-block',
    fontStyle: 'italic',
    fontWeight: 600
});

      function onDragEnd(result) {
        const { destination, source, draggableId } = result
        console.log(source,destination);
        if (!destination) {
          return
        }
    
         let sourceelem = el.options[source.index];
         answers[destination.droppableId]=sourceelem;
         console.log(answers);
         setanswers({...answers})
      }
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
      );
      const remove = (ind) => {
          answers[ind]=undefined;
          setanswers({...answers})
      }
    return (
        <div>
       
            <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <h5>{el.question}</h5>
                            <div >
                            <DragDropContext onDragEnd={onDragEnd} >
                            <div  >
                            <div className={el.image?'row':''}>
                                    {
                                        el.image && 
                                        <div className="col-md-8 ">
                                            <img src={el.image} height="350px" width="100%" />
                                        </div>
                                    }
                            <div className={el.image && window.screen.width>=720 ?'col-md-4 ':'d-flex flex-row flex-wrap align-items-center justify-content-between'} style={{border:el.type=="singledragbox" && '2px solid black' }}>
                            {el.options.map((item, ind) => ( ind!=0 &&
                            <Droppable droppableId={'items'+ind} isDropDisabled={true}>
                            {(provided, snapshot) => (
                               
                                <Kiosk 
                                    ref={provided.innerRef}
                                    isDraggingOver={snapshot.isDraggingOver}
                                    
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
                                                type={el.type}
                                                className={Object.values(answers).includes(item) && 'selected'}
                                                >
                                                {item} 
                                                
                                            </Item>
                                                    {snapshot.isDragging && (
                                                        <Item isDragging={snapshot.isDragging} item={'stay'}  >
                                                            {item}
                                                            
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
                 </div>
                 </div>
                            
                                   
                                    <div style={{marginTop:'20px'}}>
                                    {
                                        el.q.split("").map((fillq,ind)=>
                                        <>
                                                {
                                                fillq=='_'?
                                                <span className=""  >
                                                    <Droppable droppableId={ind}>
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
                                                                        
                                                                        {answers[ind]}
                                                                        {
                                                                            answers[ind]!=undefined &&
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
                                                    :
                                                    fillq
                                                }
                                        </>
                                        )
                                    }
                                    </div>
                                </DragDropContext>
                               
                            </div>
                        </div>
        </div>
    )
}

export default Fillin
