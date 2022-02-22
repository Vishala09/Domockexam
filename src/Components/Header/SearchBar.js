import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import CompanyName from '../Home/CompanyName';


function SearchBar(props) {
  
    const UserLogin = useSelector(state => state.LoginReducer);
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const history=useHistory();
    let CurrentPath = location.pathname;
   


    function saveInput(v){
        dispatch({type:'SET_SEARCH_DATA',payload:v});
        if(CurrentPath!='/exams')
        {
            history.push('/exams');
        }
    }
    
    const processChange = useCallback(
        debounce(saveInput, 300)
      , []);
    

    return (
            <div style={{position:'fixed',background:'black',height:'8vh',textAlign:'center',top:props.view=='mobile'?'7vh':'0',left:0,right:0,
        width:'100%',alignItems:'center',display:'flex',fontWeight:'bolder',color:'white',zIndex:10}}>
                {
                    props.view=='desktop' &&
                    <div className="header_left" >
                        <div  id="bar" style={{position:'absolute',left:'20px', fontSize:'22px'}} className="cursor-pointer" onClick={()=>props.openSideNav()}>
                            <i class="fa fa-bars customLink" aria-hidden="true"></i>
                        </div>
                        <Link to="/" className="noLink" > <CompanyName/> </Link>
                    </div>
                }
                        
                        {/* <select style={{width:props.view=='mobile'?'20%':'10%',height:'5vh',border:'2px solid #ff8000',background:'whitesmoke'}}
                            class="smalltext" aria-label="Default select example" >
                                                                <option selected value="">All</option>
                                                                <option value="1">Category 1</option>
                                                                <option value="2">Category 2</option>
                        </select> */}
                    
                        <input type="text" value={searchText} onChange={(e)=>{setSearchText(e.target.value);processChange(e.target.value)}} 
                        style={{width:props.view=='mobile'?'90%':'60%',height:'5vh',border:'2px solid #ff8000'}} />
                        <button style={{width:props.view=='mobile'?'15%':'5%',background:'#ff9933',height:'5vh',border:'2px solid #ff8000'}}>
                        <i class="fa fa-search" ></i></button>

                        {
                            window.screen.width>770&&
                            <div style={{color:'white',marginLeft:'5px'}}>Welcome &nbsp;
                    
                                {(UserLogin.username=='undefined' || UserLogin.username=='')?' User':UserLogin.username}
                            </div>  
                        }
                    
                       
            </div>
        
    )
}

export default SearchBar
