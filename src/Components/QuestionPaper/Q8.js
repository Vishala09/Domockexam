import React, { useEffect, useState } from 'react'
import HtmlParser from 'react-html-parser';
import { connect } from 'react-redux';


function Q8(props) {
    const {el,index,qusID,isResult,Results,sectionID,isCorrectAnswers} = props;
    const [answers, setanswers] = useState([]);
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
           // console.log(document.getElementById(id).classList)
            
        }
        var els = document.querySelectorAll(".imChecked"+index+ind);
        if(els.length==0)
        {
            answers[ind]='';
            let ans = [...answers]
            setanswers([...answers])
            let answer = {index:index,qusId:qusID,selectedAnswer:ans,qusType:'True or False',lastUpdatedSectionIndex:sectionID}  
            props.saveAnswersToStore(answer);
        }
    }
    useEffect(() => {
        if(props.answersFromStore[index])
        {
            setanswers(props.answersFromStore[index].selectedAnswer)
        }
        else
        {
            for(let i=0;i<el.options.length;i++)
            {
                answers[i]='';
            }
            setanswers([...answers])
        }
      
    }, [])
    const saveAnswers = (ind,ans,opid) => {
        var els = document.querySelectorAll(".imChecked"+index+ind);
        if(els.length==0)
        return;
        answers[ind]={id:opid,option:ans};
        setanswers([...answers])
        let answer = {index:index,qusId:qusID,selectedAnswer:answers,qusType:'True or False',lastUpdatedSectionIndex:sectionID}  
        props.saveAnswersToStore(answer);
    }
    return (
        <div>
            <div>
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        <div className="container-fluid">
                        <div style={{width:'100%',overflow:'auto',lineHeight:'2.5'}}>{HtmlParser(el.questionName)}</div>
                        {el.qusType=="True or False" &&      
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
                              {     el.qusType=="True or False" ?
                                  el.options.map((q,ind)=>
                                  <div className="row">
                                     
                                      <div className="col-6 col-md-9" style={{borderWidth:'0px 0px 2px 2px',borderStyle:'solid',borderColor:'black',}}>
                                            {q.option}
                                      </div>
                                      <div className="col-2 col-md-1" style={{borderWidth:'0px 0px 2px 2px',borderStyle:'solid',borderColor:'black', textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',
                                      background:isResult &&Results && Results.length>0 && isCorrectAnswers && Results[ind].correct==0 ? 'green' : isResult &&Results && Results.length>0 && Results[ind].choosed!=Results[ind].correct && Results[ind].choosed==0 ?'red' : 'none'}}
                                     >
                                            <label className={"customcheck"}>
                                                <input disabled={isResult} checked={!isResult && props.answersFromStore[index]?.selectedAnswer[ind]?.option=='true'} onClick={(e)=>{deSelect(e,'true'+index+ind,index,ind);saveAnswers(ind,'true',q.id)}} type="radio" name={''+index+ind} id={'true'+index+ind} />
                                                <span style={{marginTop:'-14px'}} class="checkmark"></span>
                                            </label>
                                      </div>
                                      <div className="col-2 col-md-1" style={{borderWidth:'0px 0px 2px 2px',borderStyle:'solid',borderColor:'black',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'
                                      ,background:isResult &&Results && Results.length>0 && isCorrectAnswers && Results[ind].correct==1 ? 'green' : isResult &&Results && Results.length>0 && Results[ind].choosed!=Results[ind].correct && Results[ind].choosed==1 ?'red' : 'none'}} 
                                      >
                                            <label className={"customcheck "}>
                                                <input disabled={isResult} checked={!isResult && props.answersFromStore[index]?.selectedAnswer[ind]?.option=='false'}  onClick={(e)=>{deSelect(e,'false'+index+ind,index,ind);saveAnswers(ind,'false',q.id)}} type="radio" name={''+index+ind} id={'false'+index+ind} />
                                                <span style={{marginTop:'-14px'}} class="checkmark"></span>
                                            </label>
                                      </div>
                                      <div className="col-2 col-md-1" style={{borderWidth:'0px 2px 2px 2px',borderStyle:'solid',borderColor:'black', textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center',
                                      background:isResult &&Results && Results.length>0 && isCorrectAnswers && Results[ind].correct==2 ? 'green' : isResult &&Results && Results.length>0 && Results[ind].choosed!=Results[ind].correct && Results[ind].choosed==2 ?'red' : 'none'}} 
                                     >
                                            <label className={"customcheck "}>
                                                <input disabled={isResult} checked={!isResult && props.answersFromStore[index]?.selectedAnswer[ind]?.option=='na'}  onClick={(e)=>{deSelect(e,'na'+index+ind,index,ind);saveAnswers(ind,'na',q.id)}} type="radio" name={''+index+ind} id={'na'+index+ind} />
                                                <span style={{marginTop:'-14px'}} class="checkmark"></span>
                                            </label>
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
                                  {el.options.map((q,ind)=>
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
                    
                </div>
        </div>
    )
}

//export default Q8


const mapStateToProps = state => {
    return {
       answersFromStore:state.AnswersReducer,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        saveAnswersToStore:(json) => dispatch({type:'SET_ANSWERS',payload:json})
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Q8);