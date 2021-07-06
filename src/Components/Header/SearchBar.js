import React from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
function SearchBar(props) {
    
    return (
            <div style={{position:'fixed',background:'black',height:'8vh',textAlign:'center',top:props.view=='mobile'?'7vh':'0',left:0,right:0,
        width:'100%',alignItems:'center',display:'flex',fontWeight:'bolder',color:'white'}}>
                {
                    props.view=='desktop' &&
                    <div className="header_left" >
                        <div  id="bar" style={{position:'absolute',left:'20px', fontSize:'22px'}} className="cursor-pointer" onClick={()=>props.openSideNav()}>
                            <i class="fa fa-bars customLink" aria-hidden="true"></i>
                        </div>
                        <Link to="/" className="noLink" >Company Logo</Link>
                    </div>
                }
                        
                        <select style={{width:props.view=='mobile'?'20%':'10%',height:'5vh',border:'2px solid #ff8000',background:'whitesmoke'}}
                            class="smalltext" aria-label="Default select example" >
                                                                <option selected value="">All</option>
                                                                <option value="1">Category 1</option>
                                                                <option value="2">Category 2</option>
                        </select>
                        {/* <select class="form-select" style={{width:props.view=='mobile'?'20%':'10%',height:'5vh',border:'2px solid #ff8000',background:'whitesmoke',padding:'2px',zIndex:'-1'}} aria-label="Default select example">
                            <option selected>All</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select> */}
                        <input type="text" style={{width:props.view=='mobile'?'70%':'50%',height:'5vh',border:'2px solid #ff8000'}} />
                        <button style={{width:props.view=='mobile'?'15%':'5%',background:'#ff9933',height:'5vh',border:'2px solid #ff8000'}}>
                        <i class="fa fa-search" ></i></button>
                        
            </div>
        
    )
}

export default SearchBar
