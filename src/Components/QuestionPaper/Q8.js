import React from 'react'


function Q8({el,index}) {
    let deSelect = (e,id,index,ind) => {
        if(document.getElementById(id).classList.contains('imChecked'+index+ind))
        {
            document.getElementById(id).checked=false;
            document.getElementById(id).style.background='darkgrey';
            document.getElementById(id).classList.remove("imChecked"+index+ind);
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
                        <div className="container-fluid">
                        <h5>{el.question}</h5>
                        {el.type=="trueorfalse" &&      
                        <div className="row">
                            <div className="col-6 col-md-9" style={{borderWidth:'2px 0px 2px 2px',borderStyle:'solid',borderColor:'black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                           
                            </div>
                            <div className="col-2 col-md-1" style={{borderWidth:'2px 0px 2px 2px',borderStyle:'solid',borderColor:'black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            True
                            </div>
                            <div className="col-2 col-md-1" style={{borderWidth:'2px 0px 2px 2px',borderStyle:'solid',borderColor:'black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            False
                            </div>
                            <div className="col-2 col-md-1" style={{borderWidth:'2px 2px 2px 2px',borderStyle:'solid',borderColor:'black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            Not Given
                            </div>
                        </div>}
                    <div style={{borderCollapse:'collapse'}}>
                              {     el.type=="trueorfalse" ?
                                  el.q.map((q,ind)=>
                                  <div className="row">
                                     
                                      <div className="col-6 col-md-9" style={{borderWidth:'0px 0px 2px 2px',borderStyle:'solid',borderColor:'black',}}>
                                            {q}
                                      </div>
                                      <div className="col-2 col-md-1" style={{borderWidth:'0px 0px 2px 2px',borderStyle:'solid',borderColor:'black', textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                            <label class="customcheck">
                                                <input  onClick={(e)=>deSelect(e,'true'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'true'+index+ind} />
                                                <span style={{marginTop:'-14px'}} class="checkmark"></span>
                                            </label>
                                            {/* <div class="form-check">
                                                <input class="form-check-input cp" onClick={(e)=>deSelect(e,'true'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'true'+index+ind} />
                                            </div> */}
                                      </div>
                                      <div className="col-2 col-md-1" style={{borderWidth:'0px 0px 2px 2px',borderStyle:'solid',borderColor:'black',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}} >
                                            <label class="customcheck">
                                                <input  onClick={(e)=>deSelect(e,'false'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'false'+index+ind} />
                                                <span style={{marginTop:'-14px'}} class="checkmark"></span>
                                            </label>
                                            {/* <div class="form-check">
                                                <input class="form-check-input cp" onClick={(e)=>deSelect(e,'false'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'false'+index+ind} />
                                            </div> */}
                                      </div>
                                      <div className="col-2 col-md-1" style={{borderWidth:'0px 2px 2px 2px',borderStyle:'solid',borderColor:'black', textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}} >
                                            <label class="customcheck">
                                                <input  onClick={(e)=>deSelect(e,'na'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'na'+index+ind} />
                                                <span style={{marginTop:'-14px'}} class="checkmark"></span>
                                            </label>
                                            {/* <div class="form-check">
                                                <input class="form-check-input cp" onClick={(e)=>deSelect(e,'na'+index+ind,index,ind)} type="radio" name={''+index+ind} id={'na'+index+ind} />
                                            </div> */}
                                      </div>
                                  </div>
                                  ) :
                                  <div>
                                 <div className="row">
                                    <div className="col-4 col-md-9" style={{borderWidth:'2px 0px 2px 2px',borderStyle:'solid',borderColor:'black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                
                                    </div>
                                    <div className="col-8 col-md-3" style={{borderWidth:'2px 2px 2px 2px',borderStyle:'solid',borderColor:'black',fontWeight:'bold',background:'darkgrey',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                    Select True or False
                                    </div>
                                    
                                </div>
                                  {el.q.map((q,ind)=>
                                  <div>
                                      
                                      <div className="row">
                                            <div style={{borderWidth:'0px 0px 2px 2px',borderStyle:'solid',borderColor:'black',display:'flex',alignItems:'center'}} className="col-4 col-md-9">{q}</div>
                                            <div className="col-8 col-md-3" style={{borderWidth:'0px 2px 2px 2px',borderStyle:'solid',borderColor:'black',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',padding:'5px'}}>
                                            <select style={{fontSize:'15px'}} className="mydropdown dropdown-toggle" data-flip="false" 
                                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-dropup-auto="false" >  
                                                <option  value="selans"  class="selans" style={{fontStyle:'normal'}} > Select answer </option>
                                                <option class="myoption" value={true}>True</option>
                                                <option class="myoption" value={false}>False</option>
                                            </select>
                                            </div>
                                      </div>
                                  </div>
                                  )}
                                  </div>
                              }  
                        </div>
                        </div>
                    </div>
                    
                    <hr></hr>
                </div>
        </div>
    )
}

export default Q8
