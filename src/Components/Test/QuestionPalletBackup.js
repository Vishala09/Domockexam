//BEFORE CHANGING SECTION STATUS TO QUESION STATUS

import React from 'react'
import { Button } from 'react-bootstrap';

function QuestionPallet(props) {
    const {Sections,SectionsStatus,QuestionsStatus,QuestionToggle,currentSectionId,currentSubSectionSingleId,numToRoman,sectionIdChange,
        setQuestionToggle,setcurrentSubSectionSingleId,subSectionIdChange,setQuestionsStatus,setSectionsStatus,answersFromStore,submitClicked} =props;
    

    //subsection.qIndex+ind

        return (
        <div>
            { !submitClicked ?
            <div className="">
            <div className="d-flex flex-row flex-wrap ">
                {
                Sections!=null &&  Sections?.map((section,index) => 
                <>
                <>
                    <span className="" style={{background:index==currentSectionId&&QuestionToggle?'lightblue':'',padding:''}}>
        
                    {   
                        (index != currentSectionId ? 
                        SectionsStatus[index].answered==true && SectionsStatus[index].flagged==true ? 
                        <Button  class="btn"  style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                        onClick={()=>sectionIdChange(index)} >{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):numToRoman(index+1)}</Button>
                        :
                        SectionsStatus[index].answered==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="primary">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button>
                        :
                        SectionsStatus[index].flagged==true && SectionsStatus[index].halfanswered==true ? 
                        <button class="btn" style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                        onClick={()=>sectionIdChange(index)} >{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</button>
                        :
                        SectionsStatus[index].halfanswered==true?
                        <button class="btn" style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                        onClick={()=>sectionIdChange(index)}>{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</button>
                        :
                        SectionsStatus[index].flagged==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="warning">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button>
                        :
                        SectionsStatus[index].visited==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="secondary">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button> 
                        :
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="dark">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button> 
                        : 
                        (!QuestionToggle) && <Button style={{margin:'5px',display:'flex',justifyContent:'center',border:'0px solid black',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>{setQuestionToggle((pQuestionToggle)=>!pQuestionToggle)}}  variant="light">
                        {(numToRoman(index+1))<10?"0"+numToRoman(index+1):numToRoman(index+1)}
                       
                        </Button>
                        )
                        
                    }
                    </span> 
                     
              
                    { 
                    ((index==currentSectionId && QuestionToggle)) &&   
                    <>
                        <div style={{background:'lightblue',width:'100%'}}  >
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',border:'0px solid black',fontWeight:'bold',fontSize:'10px'}} 
                                onClick={()=>{setQuestionToggle((pQuestionToggle)=>!pQuestionToggle)}}  variant="light">
                                {(numToRoman(index+1))<10?"0"+numToRoman(index+1):numToRoman(index+1)}</Button>
                                
                        </div>
                        <div style={{background:'lightblue',width:'100%'}} className="d-flex flex-row flex-wrap" >
                        {
                        Sections[currentSectionId].sections?.map((subsection,subsectionind)=>
                    <div style={{padding:'10px'}}>
                        <div className="d-flex flex-row flex-wrap">
                            {
                            subsection.questions?.map((el,ind)=>
                            <div style={{padding:'10px'}}>
                            <div className="d-flex flex-row flex-wrap">
                            <div className="">       
                                {
                                    el.qusID  ? 
                                    currentSubSectionSingleId == subsectionind && subsection.section==0 ?
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'0px solid black',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                    variant="light" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >
                                    {(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    :
                                    QuestionsStatus[el.qusID].answered==true && QuestionsStatus[el.qusID].flagged==true ? 
                                    <Button  class="btn"  style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].answered==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                    variant="primary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].flagged==true && QuestionsStatus[el.qusID].halfanswered==true ? 
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    QuestionsStatus[el.qusID].halfanswered==true?
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    QuestionsStatus[el.qusID].flagged==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="warning" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].visited==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="secondary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    :
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="dark" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    : 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'0px solid black',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="light" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >
                                    {(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                      
                                    }
                                    </div>
                                    <div className="">
                                    
                                        <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                            variant="warning" onClick={()=>{

                                                                QuestionsStatus[el.qusID].flagged = QuestionsStatus[el.qusID].flagged?false:true;
                                                                SectionsStatus[currentSectionId][subsectionind].flagged = !SectionsStatus[currentSectionId][subsectionind].flagged;
                                                                setQuestionsStatus({...QuestionsStatus});
                                                                let flag=0;
                                                                if(QuestionsStatus[el.qusID].flagged)
                                                                {
                                                                    SectionsStatus[currentSectionId].flagged = true;
                                                                    setSectionsStatus({...SectionsStatus});
                                                                    flag=1;
                                                                }
                                                                if(flag==0)
                                                                {
                                                                    for(let fi=0;fi<Sections[currentSectionId].sections[currentSubSectionSingleId].questions.length;fi++)
                                                                    {
                                                                        let qID = Sections[currentSectionId].sections[currentSubSectionSingleId].questions[fi].qusID;
                                                                     
                                                                        if(QuestionsStatus[qID].flagged==true)
                                                                        {
                                                                                flag=1;
                                                                        }
                                                                       
                                                                    }
                                                                    if(flag==1)
                                                                    {
                                                                        SectionsStatus[currentSectionId].flagged=true;
                                                                    }
                                                                    else
                                                                    {
                                                                        SectionsStatus[currentSectionId].flagged=false;
                                                                    }
                                                                }
                                                                }}  >
                                                <i style={{color:SectionsStatus[currentSectionId][subsectionind].flagged ? 'red':'white'}}
                                                
                                                class="fa fa-flag"></i> 
                                                
                                            </Button>
                                    </div>
                                    </div>
                                    {
                                        //SUBQUESTIONs                       
                                            <div >
                                                {
                                                    <>
                                                <div className="d-flex flex-row flex-wrap">
                                                {
                                                    
                                                    el.qusType!='MCQ' &&  el.options.map((op,idx)=>
                                                        <>
                                                        
                                                            {<Button key={ answersFromStore[Number(el.qusID)]?.selectedAnswer[idx]?'true'+el.qusID+''+idx:'false'+el.qusID+''+idx} 
                                                            style={{margin:'2px',fontSize:'9px',fontWeight:'bold',padding:'5px'}}
                variant={ answersFromStore[Number(el.qusID)] ?  answersFromStore[Number(el.qusID)].selectedAnswer[idx]!=undefined&& answersFromStore[Number(el.qusID)].selectedAnswer[idx]!=''?'primary':'secondary':'secondary'} >{idx+1}
                                                            
                                                            </Button> }
                                                        </>
                                                    )
                                                }
                                                
                                                </div>
                                                </>
                                            }
                                            </div>
                                    }
                          </div>
                          )
                                }
                            </div>
                        </div>
                        )            
                        }
                        </div>
                    
                    </>
                    }
               
            </>              
            </>
            )
            }
            </div>
        </div>
        :
        <div className="">
            <div className="d-flex flex-row flex-wrap ">
                {
                Sections!=null &&  Sections?.map((section,index) => 
                <>
                <>
                    <span className="" style={{background:'lightblue',padding:''}}>
        
                    {   
                        SectionsStatus[index].answered==true && SectionsStatus[index].flagged==true ? 
                        <Button  class="btn"  style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                        onClick={()=>sectionIdChange(index)} >{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):numToRoman(index+1)}</Button>
                        :
                        SectionsStatus[index].answered==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="primary">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button>
                        :
                        SectionsStatus[index].flagged==true && SectionsStatus[index].halfanswered==true ? 
                        <button class="btn" style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                        onClick={()=>sectionIdChange(index)} >{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</button>
                        :
                        SectionsStatus[index].halfanswered==true?
                        <button class="btn" style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                        onClick={()=>sectionIdChange(index)}>{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</button>
                        :
                        SectionsStatus[index].flagged==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="warning">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button>
                        :
                        SectionsStatus[index].visited==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="secondary">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button> 
                        :
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="dark">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button> 
                        
                    }
                    </span> 
                     
              
                    { 
                    (  
                    <>
                        {/* <div style={{background:'lightblue',width:'100%'}}  >
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',border:'0px solid black',fontWeight:'bold',fontSize:'10px'}} 
                                onClick={()=>{sectionIdChange(index);setQuestionToggle((pQuestionToggle)=>!pQuestionToggle)}}  variant="light">
                                {(numToRoman(index+1))<10?"0"+numToRoman(index+1):numToRoman(index+1)}</Button>
                        </div> */}
                        <div style={{background:'lightblue',width:'100%',marginBottom:'5px'}} className="d-flex flex-row flex-wrap" >
                        {
                    Sections[index].sections?.map((subsection,subsectionind)=>
                    <div style={{padding:'10px'}}>
                        <div className="d-flex flex-row flex-wrap">
                            {
                            subsection.questions?.map((el,ind)=>
                            <div style={{padding:'10px'}}>
                            <div className="d-flex flex-row flex-wrap">
                            <div className="">       
                                {
                                   // (currentSubSectionSingleId != subsectionind && subsection.section==0 ?
                                    el.qusID  ? 
                                    currentSubSectionSingleId == subsectionind && subsection.section==0 ?
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'0px solid black',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                    variant="light" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >
                                    {(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    :
                                    QuestionsStatus[el.qusID].answered==true && QuestionsStatus[el.qusID].flagged==true ? 
                                    <Button  class="btn"  style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].answered==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                    variant="primary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].flagged==true && QuestionsStatus[el.qusID].halfanswered==true ? 
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    QuestionsStatus[el.qusID].halfanswered==true?
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    QuestionsStatus[el.qusID].flagged==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="warning" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    QuestionsStatus[el.qusID].visited==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="secondary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    :
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="dark" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    : 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'0px solid black',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="light" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >
                                    {(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                  
                                    }
                                    </div>
                                    <div className="">
                                    
                                        <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                            variant="warning" onClick={()=>{

                                                                QuestionsStatus[el.qusID].flagged = QuestionsStatus[el.qusID].flagged?false:true;
                                                                setQuestionsStatus({...QuestionsStatus});
                                                                let flag=0;
                                                                if(QuestionsStatus[el.qusID].flagged)
                                                                {
                                                                    SectionsStatus[index].flagged = true;
                                                                    setSectionsStatus({...SectionsStatus});
                                                                    flag=1;
                                                                }
                                                                if(flag==0)
                                                                {
                                                                    for(let fi=0;fi<Sections[index].sections[currentSubSectionSingleId].questions.length;fi++)
                                                                    {
                                                                        let qID = Sections[index].sections[currentSubSectionSingleId].questions[fi].qusID;
                                                                     
                                                                        if(QuestionsStatus[qID].flagged==true)
                                                                        {
                                                                                flag=1;
                                                                        }
                                                                       
                                                                    }
                                                                    if(flag==1)
                                                                    {
                                                                        SectionsStatus[index].flagged=true;
                                                                    }
                                                                    else
                                                                    {
                                                                        SectionsStatus[index].flagged=false;
                                                                    }
                                                                }
                                                                }}  >
                                                <i style={{color:QuestionsStatus[el.qusID].flagged?'red':'white'}}
                                                
                                                class="fa fa-flag"></i> 
                                                
                                            </Button>
                                    </div>
                                    </div>
                                    {
                                        //SUBQUESTIONs                       
                                            <div >
                                                {
                                                    <>
                                                <div className="d-flex flex-row flex-wrap">
                                                {
                                                    
                                                    el.qusType!='MCQ' &&  el.options.map((op,idx)=>
                                                        <>
                                                        
                                                            {<Button key={ answersFromStore[Number(el.qusID)]?.selectedAnswer[idx]?'true'+el.qusID+''+idx:'false'+el.qusID+''+idx} 
                                                            style={{margin:'2px',fontSize:'9px',fontWeight:'bold',padding:'5px'}}
                variant={ answersFromStore[Number(el.qusID)] ?  answersFromStore[Number(el.qusID)].selectedAnswer[idx]!=undefined&& answersFromStore[Number(el.qusID)].selectedAnswer[idx]!=''?'primary':'secondary':'secondary'} >{idx+1}
                                                            
                                                            </Button> }
                                                        </>
                                                    )
                                                }
                                                
                                                </div>
                                                </>
                                            }
                                            </div>
                                    }
                          </div>
                          )
                                }
                            </div>
                        </div>
                        )            
                        }
                        </div>
                        
                    </>
                    )
                    }
            
            </>   
                    
            </>
            
            )
            }
            </div>
        </div>
        }
        </div>
    )
}

export default QuestionPallet
