import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux';

function Rearrange(props) {
    const {el,index,qusID,isResult,Results,sectionID,isCorrectAnswers} = props
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
    const [Question, setQuestion] = useState(el);
    const [Options, setOptions] = useState([...el.options])

    useEffect(() => {
        formatQuestion();
        if(props.answersFromStore[index])
        {
            setanswers(props.answersFromStore[index].selectedAnswer)
        }
        else
        {
            for(let i=0;i<el.options.length;i++)
            {
            answers[i]='';
            }
            setanswers([...answers]);
        }
    }, [])

    function shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));
    
            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }
    
    const formatQuestion = () => {
                let str=el.questionName; 
                const regex = /{[^{}]+}/g;
                str = str.replace(regex, '<h1 style="display:inline-block;"></h1>');
            
                str=str.split('<p>&nbsp;</p>').join("");
                str=str.split('<br />').join("");
                Question.questionName=str;
    
                // const imgRegex = /<img .*?>/ig
                // str = str.replace(imgRegex, 'IMAGE');
               let opts = Options;
               opts = shuffle(opts);
               setOptions([...opts]);
            
            Question.questionName=str;
            setQuestion({...Question})
    
    }
    

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
        //console.log(source,destination);
        if (!destination) {
          return
        }
    
         let sourceelem = Options[source.index];
         answers[destination.droppableId-1]=sourceelem;
         setanswers([...answers]);
         let obj={index:index,qusId:qusID,selectedAnswer:answers,qusType:'Re-Ararnge',lastUpdatedSectionIndex:sectionID}
         props.saveAnswersToStore(obj);
      }

      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
      );

      const remove = (ind) => {
          answers[ind]='';
          setanswers([...answers]);
          let obj={index:index,qusId:qusID,selectedAnswer:answers,qusType:'Re-Ararnge',lastUpdatedSectionIndex:sectionID}
         props.saveAnswersToStore(obj);
      }
     
    return (
        <div>

                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <h5>{el.questionName}</h5>
                            <div style={{overflow:'auto !important'}}>
                            <DragDropContext onDragEnd={onDragEnd} >
                            <div className="d-flex flex-row flex-wrap" >

                            {Options.map((item, ind) => (  
                            <Droppable droppableId={ind} isDropDisabled={true}>
                            {(provided, snapshot) => (
                            <Kiosk 
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            //className="btn"
                            >
                            
                                <Draggable draggableId={index+''+ind}
                                key={ind}  index={ind}>
                                    {(provided, snapshot) => (
                                        <React.Fragment>                            
                                            <Item
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isDragging={snapshot.isDragging}
                                                
                                                className={answers.includes(item) && 'selected'}
                                                >
                                                {item.option} 
                                               
                                            </Item>
                                             {snapshot.isDragging && (
                                                        <Clone isDragging={snapshot.isDragging}> {item.option}</Clone>
                                                    )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                           
                        </Kiosk>
                    )}
                </Droppable>
                //CHOOSE
                 ))}
               
                 </div>
                            
                                   
                                    <div style={{marginTop:'20px'}} className="d-flex flex-row flex-wrap" >
                                        {
                                            Options.map((m,ind)=> ( 
                                            
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
                                                                    className={((isResult &&Results && Results.length>0 && Results[ind]?.isCorrect) ? ' bggreen ' : isResult &&Results && Results.length>0 && Results[ind]?.isCorrect==false ?' bgred ' : ' none ')}
                                                                   
                                                                    >
                                                                        {isResult && isCorrectAnswers && el.options[ind].option}

                                                                        {/* {isResult && !isCorrectAnswers && 'NA'} */}

                                                                        {answers[ind] && answers[ind].option}
                                                                        {
                                                                            answers[ind]!="" && isResult!=true &&
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

//export default Rearrange

const mapStateToProps = state => {
    return {
       answersFromStore:state.AnswersReducer,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        saveAnswersToStore:(json) => dispatch({type:'SET_ANSWERS',payload:json})
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Rearrange);