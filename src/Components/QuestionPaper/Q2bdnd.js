import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const jsonarr = {
     "todo" : [ {id:'item 0',content:'item 0'},
     {id:'item 1',content:'item 1'},
     {id:'item 2',content:'item 2'},
     {id:'item 3',content:'item 3'},
     {id:'item 4',content:'item 4'}],

     "done" : [
       {},{},{},{},{}
     ]
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

function Q2bdnd() {
  
  const [items, setitems] = useState(jsonarr);
  const [columns, setcolumns] = useState(['todo','done']);
  useEffect(() => {
    console.log(items);
  }, [items])
  function onDragEnd(result) {
    // let itemstemp = reorder(
    //   items,
    //   result.source.index,
    //   result.destination.index
    // );
    //   setitems(itemstemp);
    const { destination, source, draggableId } = result
    console.log(source,destination);
    if (!destination) {
      return
    }

    let itemstemp = items;
    let sourceelem = itemstemp[source.droppableId][source.index];
    itemstemp[source.droppableId].splice(source.index,1);
    
    itemstemp['done'][destination.droppableId]=sourceelem

    setitems({...itemstemp})
  }
  
    return (
      <DragDropContext onDragEnd={onDragEnd} >
        {/* {
            columns.map((col) =>  */}
        <div style={{display:'flex',flexDirection:'row'}}>
          <h2>{'todo'}</h2>
        <Droppable droppableId={'todo'} >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
                {items['todo'].map((item, index) => (
                <Draggable key={item.id+1} draggableId={'col'+item.id+1} index={index+1}>
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
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <h2>{'done'}</h2>
       
        {
        items['done'].map((item, index) => (
                  <Droppable droppableId={'done'+index}>
         
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <Draggable key={item.id} draggableId={item.id} index={index+'d'}>
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
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
              
        </div> 
         {/* )
        } */}
        
      </DragDropContext>
    );
  
}

export default Q2bdnd
