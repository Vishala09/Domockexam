import React, { useState } from 'react'
import {useDrag , useDrop} from 'react-dnd';
import Drag from './Drag';

function Q1() {

    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [{isDropped}, drop] = useDrop({
        accept: "ANSWER",
        drop:(item,monitor)=>{onDropOver(item)},
        collect: monitor => ({
            isDropped: !!monitor.isOver()
        })
      })

    const onDropOver = (id) => {
          console.log(selectedAnswers)
        setSelectedAnswers([...selectedAnswers,id]);
      }
     
    return (
        <div className="container-fluid">
            <p>Match the following</p>
            <div className="row justify-content-between">
                <Drag text={'Handle with care'} /><Drag text={'Reference only'} /><Drag text={'Take off your shoes'} />
                <Drag text={'Reserved for pregnant mothers'} /><Drag text={'Caution! Men at work'} /> 
                <Drag text={'No bathing rough sea'} />
            </div>
            <br></br><br></br>
            {
                <div ref={drop} className="col-6" 
                style={{height:'50px',width:'200px',background:isDropped?'green':'lightgray',border:'2px solid black'}}>

                </div>
            }
            <div  className="row">
                <div className="col-6">On a box full of glassware</div> 
                <div ref={drop} className="col-6" 
                style={{height:'50px',width:'200px',background:isDropped?'green':'lightgray',border:'2px solid black'}}>

                </div>
            </div>
            <div className="row">
                <div className="col-6">At a building site</div> <div className="col-6" style={{height:'50px',width:'200px',background:'lightgray',border:'2px solid black'}}></div>
            </div>
            <div style={{background:isDropped?'red':'green',color:'white'}}>
                Selected answers
                {
                        selectedAnswers.map((el)=>
                            <p>{el.id}</p>
                        )
                }
            </div>
        </div>
    )
}

export default Q1
