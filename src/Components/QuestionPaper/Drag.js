import React from 'react'
import {useDrag , useDrop} from 'react-dnd';
function Drag(props) {
    const [{isDragging}, drag] = useDrag({
        item:{id:props.text},
        type: "ANSWER",
        collect: monitor => ({
          isDragging: !!monitor.isDragging()
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
              //  alert(`You dropped ${item.id} into ${dropResult.name}!`);
            }
        }
      })

    return (
        <span ref={drag} style={{opacity:isDragging?'0.5':'1',height:'50px',width:'200px',background:'lightgray',border:'2px solid black'}}>
            {props.text}
        </span>
    )
}

export default Drag
