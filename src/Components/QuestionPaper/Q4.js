import React from 'react';
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
                rstr=rstr+`<span><select  style="display:inline;max-width:20%;">   `
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
                    //console.log('s',opts[k])
                    rstr=rstr+`<option value=`+opts[k]+`>`+opts[k]+`</option>`
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
                        <div>
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
