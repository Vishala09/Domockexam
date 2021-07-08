import React from 'react'
import Questions from './Q1.json';
import './Qp.css';
import Parser from 'html-react-parser';

function Q1() {
    const formatques = function(str)
    {
        console.log('st',str)
         let rstr="";
        for(let i=0;i<str.length;i++)
        {
            if(str[i]=="{")
            {
                rstr=rstr+`<span> <input class="fillin" type="text" /> </span> `
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
              console.log(i,rstr);
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
                        <div >
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

export default Q1
