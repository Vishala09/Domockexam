import React, { useEffect, useState } from 'react'
import './Qp.css';
import Parser from 'html-react-parser';

function Q1({el,index,qusID}) {
    const [answers, setanswers] = useState([]);
    const [Question, setQuestion] = useState(el);
    function changedValue(){
        alert('changed');
    }
    const formatques = function()
    {
        let str=Question;
         let rstr="";
        for(let i=0;i<str.length;i++)
        {
            if(str[i]=="{")
            {
                rstr=rstr+` 
                <input type="text" spellCheck="false" onchange="changedValue()"  class="typein" placeholder="Type here" />
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
                
              i=j;
              
            }
            
            else
            {
                rstr=rstr+str[i];
            }
        }
        str=rstr; 
        str=str.split('<p>&nbsp;</p>').join("");
        str=str.split('<br />').join("");
        Question.questionName=str;
        setQuestion({...Question})
        //return rstr;
    }
    useEffect(() => {
        formatques();
    }, [])
    return (
        <div>
                <div>
                    {/* <h4>{index}.&nbsp;{el.questionheading} </h4> */}
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                       
                        <div style={{lineHeight:'2.5',overflow:'auto',width:'100%'}}>
                                {Parser(Question.questionName)}
                        </div>
                    </div>
                    
                   
                </div>
             
        </div>
    )
}

export default Q1
