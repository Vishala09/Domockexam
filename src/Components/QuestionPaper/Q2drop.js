import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Q2drop({droppedElement,onDrop,onRemoveHandler,qindex}) {
    const [state, setstate] = useState('')
    const style = {
        border:'2px solid black',
        textAlign: 'center',
        fontSize: '1rem',
        lineHeight: 'normal',
    };
    const [{ isOver, canDrop }, drop] = useDrop({
        accept:'box'+qindex,
        drop: (droppedElem)=>{ setstate(droppedElem.dragElement) },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    let border = '2px solid black';
    if (isActive) {
        border = '3px dotted #0D6EFD';
    }
    else if (canDrop) {
        border = '3px dotted gold';
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
      );
    const remove = () => {
        onRemoveHandler(state);
        setstate('');
    }
    return (
        <div ref={drop} className="dropelement col-11" style={{ ...style, border }}>
            {state.q}
            
            {
                state!="" &&
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 100 }}
                    overlay={renderTooltip}
                >
                    <i onClick={()=>remove()} class="fa fa-minus-circle mytooltip tooltipdelete cp"></i>
                </OverlayTrigger>
            }
            <br></br>
            {
                state.img && <img src={state.img} height="70" width="100" />
            }
        </div>
    )
}

export default Q2drop
