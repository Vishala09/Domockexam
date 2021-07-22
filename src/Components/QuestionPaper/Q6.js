import React, { useEffect, useRef, useState } from 'react'
import './Qp.css';import './CustomCheckBox.css'


function Q6({el,index}) {
    let deSelect = (e,id) => {
        if(e.target.checked)
        {
            let radios = document.getElementsByName(e.target.name);
            for(let i=0;i<radios.length;i++)
            {
                radios[i].checked=false;
            }
            document.getElementById(id).checked=true;
        }
    }
    return (
        <div>
            {/* {
                Questions.map((el,index) =>  */}
                <div>
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        {el.type == 'radio'?'':<h5>Select multiple answers</h5>}
                        <h5>{el.question}</h5>
                             {
                                 el.q.map((q,ind)=>
                                 <div style={{marginTop:'10px'}}>
                                        <div>{q.ques}</div>
                                        <div className="d-flex flex-row flex-wrap " >
                                            {
                                                el.type=='radio' ?
                                                q.options.map((op,i) => 
                                                <div  className="col-6 col-lg-2 col-md-3 choose" style={{}} >
                                                    <div  className="mb-1">
                                                        <label class="customcheck">{op}
                                                            <input onClick={(e)=>deSelect(e,''+index+ind+i)} type="checkbox"
                                                             name={''+index+ind} id={''+index+ind+i}  />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    </div>
                                                    {/* <div className="form-check" >
                                                        <input className="form-check-input cp" type="radio" name={''+index+ind} id={el.type+'radio'+index+''+ind+''+i} />
                                                        <label className="form-check-label cp" for={el.type+'radio'+index+''+ind+''+i}>
                                                            {op}
                                                        </label>
                                                    </div> */}
                                                </div>
                                                )
                                                :
                                                q.options.map((op,i) => 
                                                <div className="col-6 col-lg-2 col-md-3 choose" style={{}} >
                                                    <div  className="mb-1">
                                                    <label class="customcheck">{op}
                                                        <input type="checkbox" name={''+index+ind} />
                                                        <span class="checkmark"></span>
                                                    </label>
                                                    </div>
                                                </div>
                                                )
                                            }
                                        </div>
                                        
                                 </div>
                                 )
                             }
                        
                    </div>
                    <hr></hr>
                </div>
                {/* )
            } */}
        </div>
    )
}

export default Q6
