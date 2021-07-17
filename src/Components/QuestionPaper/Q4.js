import React, { useEffect, useState } from 'react';
import Parser from 'html-react-parser';
import './Qp.css';
import Q from './Q4.json';
function Q4() {
    const [Questions, setQuestions] = useState(Q);
    // useEffect(() => {
    //     for(let i=0;i<Q.length;i++){
    //         let str=Q[i].q; //[^A-Za-z0-9]
    //         const regex = /{[^\s]+}/ig;
    //         str = str.replace(regex, '_');
    //         Questions[i].q=str;
    //     }
    //      setQuestions([...Questions])
    //     }, [])

    useEffect(() => {
      let elems =  document.getElementsByClassName('mydropdown');
      for(let i=0;i<elems.length;i++)
      {
          elems[i].addEventListener("change", checkSelection)
      }
    }, [])
    let checkSelection = function()
    {
        console.log('selans');
        let elems=document.getElementsByClassName('selans');
        for(let i=0;i<elems.length;i++)
        {
            console.log('elems[i]',elems[i]);
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
    const formatques = function(str,index)
    {
         let rstr=""; let r="";
        for(let i=0;i<str.length;i++)
        {
            if(str[i]=="{")
            {
                rstr=rstr+`<span><select  class="mydropdown dropdown-toggle" data-flip="false" 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-dropup-auto="false" >  
                <option  value="selans"  class="selans" style="font-style:normal;" > Select answer </option> `
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
              //  console.log(opts);
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
                                {Parser(formatques(el.q,index))}
                                
                        </div>
                        <select>
                            <option style={{background:'red'}}>Select answer</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </select>
                    </div>
                    <hr></hr>
                    
                </div>
                )
            }
        </div>
    )
}

export default Q4
