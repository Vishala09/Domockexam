import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import HtmlParser from 'react-html-parser';
import { connect } from 'react-redux';

function Match(props) {
    const {el,index,qusID,isResult,Results,sectionID,isCorrectAnswers} = props
    const grid = 2;

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
    const [OptionsLeft, setOptionsLeft] = useState([]);

useEffect(() => {
    formatQuestion();
    if(props.answersFromStore[index])
    {
        setanswers(props.answersFromStore[index].selectedAnswer);
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
useEffect(() => {
    //console.log(answers);
}, [answers]) 

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
            str=str.split('<p>&nbsp;</p>').join("");
            str=str.split('<br />').join("");
            Question.questionName=str;
            let opts = el.options;
            //opts = shuffle(el.options)
            const regex = /{[^{}]+}/g;
            for(let i=0;i<opts.length;i++)
            {
                
                opts[i].left = opts[i].option.replace(regex,'');
                opts[i].right = opts[i].option.match(regex);
                if(Array.isArray(opts[i].right))
                {
                    opts[i].right = opts[i].right[0]
                    opts[i].right = opts[i].right.replace('{','');
                    opts[i].right = opts[i].right.replace('}','');
                }
                OptionsLeft[i]= opts[i];
            }

            Question.options=opts;
            setQuestion({...Question});

            let optsleft = shuffle(OptionsLeft)
            setOptionsLeft([...optsleft]);


}

 

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({

    background: isDraggingOver? 'lightblue' : '',
    padding: grid,
    border:isDraggingOver ? '2px solid dodgerblue' : '2px dotted black',
    minWidth: '250px',
    minHeight: '35px',
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
    
         let sourceelem = OptionsLeft[source.index];
         answers[destination.droppableId-1]=sourceelem;
         setanswers([...answers])
         let obj={index:index,qusId:qusID,selectedAnswer:answers,qusType:'Match the following',lastUpdatedSectionIndex:sectionID}
         props.saveAnswersToStore(obj);
       
      }
      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
      );
      const remove = (ind) => {
          answers[ind]='';
          setanswers([...answers])
          let obj={index:index,qusId:qusID,selectedAnswer:answers,qusType:'Match the following',lastUpdatedSectionIndex:sectionID}
         props.saveAnswersToStore(obj);
      }
    return (
        <div>
            {/* <h4>{index}.&nbsp;{el.questionheading} </h4> */}
                        <div style={{marginLeft:'20px',marginRight:'20px'}}>
                            <div style={{overflow:'auto',width:'100%'}}>{HtmlParser( el.questionName )}</div>
                            <div >
                            <DragDropContext onDragEnd={onDragEnd} >
                                <div className="d-flex flex-row flex-wrap" >
                                    
                            {OptionsLeft.map((item, ind) => ( 
                            <Droppable droppableId={'options'+index+''+ind} 
                            isDropDisabled={true}
                            >
                    {(provided, snapshot) => (
                        <Kiosk 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                            >
                                <Draggable isDragDisabled={isResult}
                                key={ind} draggableId={index+''+ind} index={ind}>
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
                                                }
                                                className={!isResult && answers.includes(item) && 'selected'}
                                                >
                                                  
                                                {item.left} 
                                                {
                                                    item.img && 
                                                    <>
                                                    
                                                    <img draggable={false} src={item.img} height="70px" width="100px" />
                                                    </>
                                                }
                                                  
                                            </Item>
                                                     {snapshot.isDragging && (
                                                        <Clone  isDragging={snapshot.isDragging}> 
                                                            {item.left}
                                                        {
                                                            item.img && 
                                                            <>
                                                            <img draggable={false} src={item.img} height="70px" width="100px" />
                                                            </>
                                                        }</Clone>
                                                    )}
                                            
                                        </React.Fragment>
                                    )}
                                </Draggable>
                           
                        </Kiosk>
                    )}
                </Droppable>
                 ))}
                 </div>
                            
                                   
                                    <div style={{marginTop:'10px'}} >
                                        {
                                            Question.options.map((m,ind)=> ( 
                                            <div  className="row d-flex align-items-center mb-2">
                                                <div className="col-12 col-md-4" >
                                                    <div>{m.right}</div>
                                                </div>
                                                <div className="col-12 col-md-5" >
                                                    <div style={{fontStyle:'italic',display:'flex',alignItems:'center'}}
                                                     className="text-center col-11"  >
                                                      <Droppable droppableId={ind+1}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            style={getListStyle(snapshot.isDraggingOver)}
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

                                                                        {isResult && isCorrectAnswers && el.options[ind]?.left}

                                                                        {/* {isResult && !isCorrectAnswers && 'NA'} */}

                                                                        {answers[ind] && answers[ind].option}

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

//export default Match


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
  export default connect(mapStateToProps,mapDispatchToProps)(Match);