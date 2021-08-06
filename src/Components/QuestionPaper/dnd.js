import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
`;

const Kiosk = styled(List)`
  position: relative;
`;





const ITEMS = [
    {
        id: 100,
        content: 'Headline'
    },
    {
        id: 200,
        content: 'Copy'
    },
    {
        id: 300,
        content: 'Image'
    },
    {
        id: 400,
        content: 'Slideshow'
    },
    {
        id: 500,
        content: 'Quote'
    }
];

class Dnd extends Component {

    render() {
        return (
            <DragDropContext >
                <Droppable droppableId="ITEMS" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <Kiosk
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}>
                            {ITEMS.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
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
                                                {item.content}
                                            </Item>
                                            {snapshot.isDragging && (
                                                <Clone>{item.content}</Clone>
                                            )}
                                        </React.Fragment>
                                    )}
                                </Draggable>
                            ))}
                        </Kiosk>
                    )}
                </Droppable>
                
            </DragDropContext>
        );
    }
}

export default Dnd;
