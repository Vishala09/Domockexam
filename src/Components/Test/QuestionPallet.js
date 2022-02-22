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
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #6c757d 50%, #ffc107 50%)'}} 
                        onClick={()=>sectionIdChange(index)}  >{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button>
                        :
                        SectionsStatus[index].visited==true ? 
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="secondary">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button> 
                        :
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px'}} 
                        onClick={()=>sectionIdChange(index)}  variant="dark">{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button> 
                        : 
                        (!QuestionToggle) && <Button style={{margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold',fontSize:'10px'}} 
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
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold',fontSize:'10px'}} 
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
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                    variant="light" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >
                                    {(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].answered==true && SectionsStatus[index][subsectionind][el.qusID].flagged==true ? 
                                    <Button  class="btn"  style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].answered==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                    variant="primary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].flagged==true && SectionsStatus[index][subsectionind][el.qusID].halfanswered==true ? 
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].halfanswered==true?
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].flagged==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #6c757d 50%, #ffc107 50%)'}} 
                                        variant="warning" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].visited==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="secondary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    :
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="dark" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    : 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',border:'2px solid black',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="light" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >
                                    {(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                      
                                    }
                                    </div>
                                    <div className="">
                                    
                                        <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                            variant="warning" onClick={()=>{
                                            SectionsStatus[index][subsectionind][el.qusID].flagged = SectionsStatus[index][subsectionind][el.qusID].flagged?false:true;
                                            if(SectionsStatus[index][subsectionind][el.qusID].flagged==true)
                                            {
                                                SectionsStatus[index][subsectionind].flagged = true;
                                                SectionsStatus[index].flagged = true;
                                            }
                                            else
                                            {
                                                let flag=0;

                                                for(let qstatus in SectionsStatus[index][subsectionind])
                                                {
                                                if(typeof SectionsStatus[index][subsectionind][qstatus] == 'object'){
                                                        if(SectionsStatus[index][subsectionind][qstatus].flagged)
                                                        {
                                                            flag=1;
                                                        }
                                                    }
                                                }
                                                
                                                    if(flag==1)
                                                    {
                                                        SectionsStatus[index][subsectionind].flagged = true;
                                                        SectionsStatus[index].flagged = true;
                                                    }
                                                    else
                                                    {
                                                        SectionsStatus[index][subsectionind].flagged = false;
                                                        
                                                    }

                                                ///// 
                                                let flagged = 0;
                                                for(let sstatus in SectionsStatus[index])
                                                {
                                                    if(typeof SectionsStatus[index][sstatus] == 'object')
                                                    {
                                                        for(let qstatus in SectionsStatus[index][sstatus])
                                                        {
                                                            if(typeof SectionsStatus[index][sstatus][qstatus] == 'object'){
                                                            let secStats = SectionsStatus[index][sstatus][qstatus];
                                                                    if(secStats.flagged==true)
                                                                    {
                                                                        flagged=1;break;
                                                                    }
                                                            }
                                                        }
                                                    }
                                                }
                                                if(flagged==0)
                                                SectionsStatus[index].flagged=false;
                                                else if(flagged==1)
                                                SectionsStatus[index].flagged=false;
                                            }

                                            setSectionsStatus({...SectionsStatus})
                                                               
                                                                }}  >
                                                <i style={{color:(
                                                SectionsStatus[currentSectionId][subsectionind][el.qusID].flagged) ? 'red':'white'}}
                                                
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
                                                    //el.qusType!='MCQ' &&  
                                                    JSON.parse(el.correctOption)?.map((op,idx)=>
                                                        <>
                                                        
                                                            {<Button key={ answersFromStore[Number(el.qusID)]?.selectedAnswer[idx]?'true'+el.qusID+''+idx:'false'+el.qusID+''+idx} 
                                                            style={{margin:'2px',fontSize:'9px',fontWeight:'bold',padding:'5px'}}
                variant={ answersFromStore[Number(el.qusID)] ?  answersFromStore[Number(el.qusID)].selectedAnswer[idx]!=undefined&& (answersFromStore[Number(el.qusID)].selectedAnswer[idx]!='' && answersFromStore[Number(el.qusID)].selectedAnswer[idx]!='Select Answer')?'primary':'secondary':'secondary'} >{idx+1}
                                                            
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
                        <Button style={{margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'10px',backgroundImage:'linear-gradient(to right, #6c757d 50%, #ffc107 50%)'}} 
                        onClick={()=>sectionIdChange(index)} >{(numToRoman(index+1))<10?"0"+(numToRoman(index+1)):(numToRoman(index+1))}</Button>
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
                                    
                                    SectionsStatus[index][subsectionind][el.qusID].answered==true && SectionsStatus[index][subsectionind][el.qusID].flagged==true ? 
                                    <Button  class="btn"  style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #ffc107 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].answered==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                    variant="primary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].flagged==true && SectionsStatus[index][subsectionind][el.qusID].halfanswered==true ? 
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 0, #007bff 33%, #6c757d 33%, #6c757d 66%, #ffc107 66%, #ffc107 100%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].halfanswered==true?
                                    <button class="btn" style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #007bff 50% , #6c757d 50%)'}} 
                                    onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].flagged==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px',backgroundImage:'linear-gradient(to right, #6c757d 50%, #ffc107 50%)'}} 
                                        variant="warning" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button>
                                    :
                                    SectionsStatus[index][subsectionind][el.qusID].visited==true ? 
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="secondary" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}}>{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    :
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                        variant="dark" onClick={()=>{setcurrentSubSectionSingleId(subsectionind);subSectionIdChange(el.qusID,index)}} >{(subsection.qIndex+ind)<10?"0"+(subsection.qIndex+ind):(subsection.qIndex+ind)}</Button> 
                                    
                                    }
                                    </div>
                                    <div className="">
                                    
                                    <Button style={{width:'100%',margin:'5px',display:'flex',justifyContent:'center',fontWeight:'bold',fontSize:'9px',padding:'5px'}} 
                                            variant="warning" onClick={()=>{

                                                SectionsStatus[index][subsectionind][el.qusID].flagged = SectionsStatus[index][subsectionind][el.qusID].flagged?false:true;
                                                if(SectionsStatus[index][subsectionind][el.qusID].flagged==true)
                                                {
                                                    SectionsStatus[index][subsectionind].flagged = true;
                                                    SectionsStatus[index].flagged = true;
                                                }
                                                else
                                                {
                                                    let flag=0;
    
                                                    for(let qstatus in SectionsStatus[index][subsectionind])
                                                    {
                                                    if(typeof SectionsStatus[index][subsectionind][qstatus] == 'object'){
                                                            if(SectionsStatus[index][subsectionind][qstatus].flagged)
                                                            {
                                                                flag=1;
                                                            }
                                                        }
                                                    }
                                                    
                                                        if(flag==1)
                                                        {
                                                            SectionsStatus[index][subsectionind].flagged = true;
                                                            SectionsStatus[index].flagged = true;
                                                        }
                                                        else
                                                        {
                                                            SectionsStatus[index][subsectionind].flagged = false;
                                                            
                                                        }
    
                                                    ///// 
                                                    let flagged = 0;
                                                    for(let sstatus in SectionsStatus[index])
                                                    {
                                                        if(typeof SectionsStatus[index][sstatus] == 'object')
                                                        {
                                                            for(let qstatus in SectionsStatus[index][sstatus])
                                                            {
                                                                if(typeof SectionsStatus[index][sstatus][qstatus] == 'object'){
                                                                let secStats = SectionsStatus[index][sstatus][qstatus];
                                                                        if(secStats.flagged==true)
                                                                        {
                                                                            flagged=1;break;
                                                                        }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if(flagged==0)
                                                    SectionsStatus[index].flagged=false;
                                                    else if(flagged==1)
                                                    SectionsStatus[index].flagged=false;
                                                }
    
                                                setSectionsStatus({...SectionsStatus})
                                                                }}  >
                                                <i style={{color:SectionsStatus[index][subsectionind][el.qusID].flagged ? 'red':'white'}}
                                                
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
                                                    //el.qusType!='MCQ' &&  
                                                    JSON.parse(el.correctOption)?.map((op,idx)=>
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
