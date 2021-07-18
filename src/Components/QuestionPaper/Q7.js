import React, { useState } from 'react'

function Q7({el,index}) {
    const [EssayAnswer, setEssayAnswer] = useState("");
    const [Remaining, setRemaining] = useState(0);
    function validateAnswer(e)
    {
        setEssayAnswer(e.target.value);
        let val=e.target.value;
        let s = val.trim().replace(/[ ]{2,}/g, ' ');
        s = s.trim().replace(/\n/g, ' ');
        if(s.split(" ").length<100)
        {
            setRemaining(s.split(" ").length);
        }
        else if(s.split(" ").length==100 && e.nativeEvent.data!=" ")
        {
            setRemaining(100-s.split(" ").length);
        }
        
    }
    function autoResize(id) {
        document.getElementById(id).style.height = 'auto';
        document.getElementById(id).style.height = document.getElementById(id).scrollHeight + 'px';
    }
    return (
        <div>
            {/* {
                Questions.map((el,index)=> */}
                <div>
                        <h4>{index+1}.&nbsp;{el.questionheading} </h4>
                    <div style={{marginLeft:'20px'}}>
                        <h5>{el.question}</h5>
                        <em>Words count : {Remaining}</em>
                        <textarea id={"textarea"+index} rows="10" value={EssayAnswer} spellCheck={false}
                        style={{overflow:'hidden',display:'block',resize:'none',width:'100%'}} 
                        onChange={(e)=>{validateAnswer(e);autoResize("textarea"+index)}} >

                        </textarea>
                    </div>
                    <hr></hr>
                </div>
                {/* )
            } */}
        </div>
    )
}

export default Q7
