import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';

function Q2drag({dragElement,type, isDropped , onDropped,Selected}) {
    const [bg, setbg] = useState('white')
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { 'dragElement':dragElement },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(item && dropResult)
            {
                onDropped(item.dragElement);
               // setbg('gray');
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    useEffect(() => {
        //console.log(Selected)
        if(!Selected.includes(dragElement))
        {
            setbg('white');
        }
        else
        {
            setbg('lightgray');
        }
    }, [Selected])
   // const background = isDragging ? 'green' : 'red'
    const style = {
        cursor: "move"
      };
    return (
        <div ref={drag} role="Box" className="dragelement" style={{ ...style,background:bg }}>
            {dragElement}
        </div>
    )
}

export default Q2drag
