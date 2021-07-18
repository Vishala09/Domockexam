import React from 'react'


function Q8({el,index}) {
    let deSelect = (e,id,index,ind) => {
        if(document.getElementById(id).classList.contains('imChecked'+index+ind))
        {
            document.getElementById(id).checked=false;
            document.getElementById(id).classList.remove("imChecked"+index+ind)
        }
        else
        {
            var elems = document.querySelectorAll(".imChecked"+index+ind);
            [].forEach.call(elems, function(el) {
                el.classList.remove("imChecked"+index+ind);
            });
            document.getElementById(id).classList.add('imChecked'+index+ind);
            console.log(document.getElementById(id).classList)
        }
    }
    return (
        <div>
            <div>
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        <h5>{el.question}</h5>
                        <div className="row">
                                      <div className="col-6 col-md-9" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                           
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            True
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            False
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
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
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            {/* <label class="customcheck">
                                                <input  type="checkbox" onClick={(e)=>deSelect(e,'true'+index+ind)} name={index+ind} id={'true'+index+ind} />
                                                <span class="checkmark"></span>
                                            </label> */}
                                            <div class="form-check ">
                                                <input class="form-check-input" onClick={(e)=>deSelect(e,'true'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'true'+index+ind} />
                                            </div>
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}} >
                                            {/* <label class="customcheck">
                                                <input  type="checkbox" onClick={(e)=>deSelect(e,'false'+index+ind)} name={index+ind}id={'false'+index+ind}  />
                                                <span class="checkmark"></span>
                                            </label> */}
                                            <div class="form-check ">
                                                <input class="form-check-input" onClick={(e)=>deSelect(e,'false'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'false'+index+ind} />
                                            </div>
                                      </div>
                                      <div className="col-2 col-md-1" style={{border:'2px solid black',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}} >
                                            {/* <label class="customcheck">
                                                <input  type="checkbox" onClick={(e)=>deSelect(e,'na'+index+ind)} name={index+ind} id={'na'+index+ind} />
                                                <span class="checkmark"></span>
                                            </label> */}
                                            <div class="form-check ">
                                                <input class="form-check-input" onClick={(e)=>deSelect(e,'na'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'na'+index+ind} />
                                            </div>
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
