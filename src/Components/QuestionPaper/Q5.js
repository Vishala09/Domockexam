import React, { useState } from 'react';
import './Qp.css';
import Parser from 'html-react-parser';
function Q5({el,index}) {

    const formatques = function(str)
    {
         let rstr="";
        for(let i=0;i<str.length;i++)
        {
            if(str[i]=="{")
            {
                rstr=rstr+'<span style=" border-bottom:2px solid black; " ">';
            }
            else if(str[i]=="}")
            {
                rstr=rstr+'</span>';
            }
            else
            {
                rstr=rstr+str[i];
            }
        }
        return rstr;
    }
    return (
        <div >
                <div >
                    <h4>{index}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px',marginRight:'20px'}}>
                        <h5>{el.question}</h5>
                        {
                            el.q.map((question)=>
                            <div className="row">
                                
                                    <div className="col-6">
                                            {Parser(formatques(question))}
                                    </div>
                                    <div className="col-6">
                                            <input type="text" style={{width:'100%'}} spellCheck={false} className="typein" placeholder="Type here" />
                                    </div>
                            </div>  
                            )
                        }
                    </div>
                    
                </div>
        </div>
    )
}

export default Q5
