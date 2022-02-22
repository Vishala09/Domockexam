import React, { useEffect, useState } from 'react';
import Parser from 'html-react-parser';
import './Qp.css';
import { connect } from 'react-redux';
function Q4({el,index}) {
    useEffect(() => {
      let elems =  document.getElementsByClassName('mydropdown');
      for(let i=0;i<elems.length;i++)
      {
          elems[i].addEventListener("change", checkSelection)
      }
     
    }, [])
    function changedValue(){
        console.log(this.options[this.selectedIndex].value);
        //e.options[e.selectedIndex].value
    }
    let checkSelection = function()
    {
        let elems=document.getElementsByClassName('selans');
        for(let i=0;i<elems.length;i++)
        {
            if(elems[i].selected)
            {
                elems[i].parentElement.style.background="lightgray";
                
            }
            else
            {
                elems[i].parentElement.style.background="white";
            }
        }
    }
    
    const formatques = function(str)
    {
         let rstr="";
        for(let i=0;i<str.length;i++)
        {
            if(str[i]=="{")
            {
                rstr=rstr+`
                <select id=${index+'dropdown'}  class="mydropdown dropdown-toggle" data-flip="false" onchange="changedValue()"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-dropup-auto="false" >  
                <option  value="selans"  class="selans" style="font-style:normal;" > Select answer </option>
                `
                let j=i+1;
                while(j<str.length)
                {
                    if(str[j]=="}")
                    {
                        break;
                    }
                       j++;
                }
                for(let k=0;k<el.options.length;k++)
                {
                    rstr=rstr+`<option  class="myoption" value=`+el.options[k].option+`>`+el.options[k].option+`</option>`
                }
                rstr=rstr+` </select></span>`;
                
              i=j;
              
            }
            
            else
            {
                rstr=rstr+str[i];
            }
        }
        return rstr;
    }
    const [Question, setQuestion] = useState(el);

useEffect(() => {
    
        let str=el.questionName; 

        if(Question.instruction==undefined ||Question.instruction==""){

            const regex = /{Instruction:"(.*?)\"}/g;
            var matches = regex.exec(el.questionName);
            console.log(matches,'matches');
            str = str.replace(regex, '');
            if(matches!=null && matches.length>0)
            Question.instruction = matches[1];
            else
            Question.instruction = "Please choose from the drop down.";

        }
    
            str=str.split('<p>&nbsp;</p>').join("");
            str=str.split('<br />').join("");

        Question.questionName=str;

    let opts = Question.options;
    opts = shuffle(opts);
    Question.options=opts;
    setQuestion({...Question})
}, [])   

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
} 
    return (
        <div>
                <div>
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        <h5>{Question.instruction}</h5>
                        <div style={{lineHeight:'2.5',overflow:'auto',width:'100%'}}>
                                {Parser(formatques(Question.questionName))}
                        </div>
                    </div>
                   
                </div>
        </div>
    )
}

//export default Q4
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
  export default connect(mapStateToProps,mapDispatchToProps)(Q4);