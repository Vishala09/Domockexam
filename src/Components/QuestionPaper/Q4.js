import React, { useEffect } from 'react';
import Parser from 'html-react-parser';
import './Qp.css';
import Questions from './Q4.json';
function Q4() {
    
    const formatques = function(str)
    {
         let rstr="";
        for(let i=0;i<str.length;i++)
        {
            if(str[i]=="{")
            {
                rstr=rstr+`<span><select class="mydropdown dropdown-toggle" data-flip="false" 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-dropup-auto="false" >  
                <option value="selans" class="myoption" >Select answer</option> `
                let j=i+1;
                let opts=[];
                let s="";
                while(j<str.length)
                {
                    if(str[j]=="," || str[j]=="}")
                    {
                        opts.push(s);
                        s="";
                    }
                    else
                    {
                        s=s+str[j];
                    }
                    if(str[j]=="}")
                    {
                        break;
                    }
                       j++;
                }
                console.log(opts);
                for(let k=0;k<opts.length;k++)
                {
                    rstr=rstr+`<option class="myoption" value=`+opts[k]+`>`+opts[k]+`</option>`
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
    return (
        <div>
            {
                Questions.map((el,index)=>
                <div>
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px'}}>
                        <h5>{el.question}</h5>
                        <div style={{lineHeight:'2.5'}}>
                                {Parser(formatques(el.q))}
                        </div>
                    </div>
                    <hr></hr>
                </div>
                )
            }
        </div>
    )
}

export default Q4
