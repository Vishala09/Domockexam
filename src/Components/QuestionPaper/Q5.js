import React, { useState } from 'react';
import './Qp.css';
import Questions from './Q5.json';
import Parser from 'html-react-parser';
import ReactHtmlParser from 'react-html-parser'
function Q5() {

    const formatques = function(str)
    {
         let rstr="";
        for(let i=0;i<str.length;i++)
        {
            if(str[i]=="{")
            {
                rstr=rstr+'<span style=" border-bottom:2px solid black " ">';
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
        <div className="container-fluid">
            {
                Questions.map((el,index)=>
                <div >
                    <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px'}}>
                        <h5>{el.question}</h5>
                        {
                            el.q.map((question)=>
                            <div className="row mb-2">
                                    <div className="col-6">
                                            {Parser(formatques(question))}
                                    </div>
                                    <div className="col-4" >
                                            <input type="text" placeholder="Type here" style={{width:'100%',border:'none',borderBottom:'2px dotted black',outline:'none',padding:'5px',fontStyle:'italic'}} />
                                    </div>
                            </div>  
                            )
                        }
                    </div>
                    <hr></hr>
                </div>
                )
            }
        </div>
    )
}

export default Q5
