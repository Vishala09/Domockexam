import React from 'react'


function Q8({el,index}) {
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
            <div>
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        <h5>{el.question}</h5>
                        <div className="row">
                                      <div className="col-6 col-md-9" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center'}}>
                                           
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center'}}>
                                            True
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center'}}>
                                            False
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center'}}>
                                            Not Given
                                      </div>
                                  </div>
                        <div >
                              {
                                  el.q.map((q,ind)=>
                                  <div className="row">
                                      <div className="col-6 col-md-9" style={{border:'2px solid black'}}>
                                            {q}
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',textAlign:'center',display:'flex',justifyContent:'center'}}>
                                            <label class="customchecktf">
                                                <input  type="checkbox" onClick={(e)=>deSelect(e,'true'+index+ind)} name={index+ind} id={'true'+index+ind} />
                                                <span class="checkmarktf"></span>
                                            </label>
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',textAlign:'center',display:'flex',justifyContent:'center'}} >
                                            <label class="customchecktf">
                                                <input  type="checkbox" onClick={(e)=>deSelect(e,'false'+index+ind)} name={index+ind}id={'false'+index+ind}  />
                                                <span class="checkmarktf"></span>
                                            </label>
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',textAlign:'center',display:'flex',justifyContent:'center'}} >
                                            <label class="customchecktf">
                                                <input  type="checkbox" onClick={(e)=>deSelect(e,'na'+index+ind)} name={index+ind} id={'na'+index+ind} />
                                                <span class="checkmarktf"></span>
                                            </label>
                                      </div>
                                  </div>
                                  )
                              }  
                        </div>
                    </div>
                    
                    <hr></hr>
                </div>
        </div>
    )
}

export default Q8
