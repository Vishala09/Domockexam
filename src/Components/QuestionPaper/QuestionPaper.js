import React from 'react';
import Q1 from './Q1';
import Q2 from './Q2';
import Q3 from './Q3';
import Q4 from './Q4';
import Q5 from './Q5';
import Q6 from './Q6';
import Questions from './Questions.json';
import 'bootstrap/dist/css/bootstrap.css';
import Q7 from './Q7';
import Q8 from './Q8';
import Q9 from './Q9';
function QuestionPaper() {
    return (
        <div className="container-fluid" style={{fontFamily:'"Times New Roman", Times, serif'}}>
            <h1>Question Paper</h1>
            {
                Questions.map((el,index)=>
                <>
                <h5>Question Type : {el.type}</h5>
                    {el.type=="fillin" && <Q1 el={el} index={index} />}
                    {el.type=="match" && <Q2 el={el} index={index} />}
                    {(el.type=="dragin" || el.type=="singledragbox") && <Q3 el={el} index={index} /> }
                    {el.type=="dropdown" && <Q4 el={el} index={index} />}
                    {el.type=="typein" && <Q5 el={el} index={index} />}
                    {(el.type=="radio" || el.type=="check") && <Q6 el={el} index={index} />}
                    {el.type=="essay" && <Q7 el={el} index={index} />}
                    {el.type=="trueorfalse" && <Q8 el={el} index={index} />}
                    {el.type=="rearrange" && <Q9 el={el} index={index} />}

                </>
                )
            }
            
        </div>
    )
}

export default QuestionPaper
