import React from 'react'
import './Qp.css';
import Questions from './Q6.json';
import Parser from 'html-react-parser';
function Q6() {
    return (
        <div>
            {
                Questions.map((el,index) => 
                <div>
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px'}}>
                        <h5>{el.question}</h5>
                             {
                                 el.q.map((q,ind)=>
                                 <div style={{marginTop:'10px'}}>
                                        <div>{q.ques}</div>
                                        <div className="d-flex flex-row flex-wrap " >
                                        {/* minWidth:'20%',marginLeft:'10px' */}
                                            {
                                                q.options.map((op,i) => 
                                                <div className="col-3 choose" style={{}} >
                                                    <div className="form-check" >
                                                        <input className="form-check-input cp" type="radio" name={''+index+ind} id={el.type+'radio'+index+''+ind+''+i} />
                                                        <label className="form-check-label cp" for={el.type+'radio'+index+''+ind+''+i}>
                                                            {op}
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
                )
            }
        </div>
    )
}

export default Q6
