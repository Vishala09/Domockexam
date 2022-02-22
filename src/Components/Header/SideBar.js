import React from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings'

function SideBar(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const UserLogin = useSelector(state => state.LoginReducer);
    
    
    return (
        <div id="mySidenav" className="sideBar" >
                <div >
                    <div className="row text-center sideBarMenu">
                        <div className="col-1 cursor-pointer" style={{}} onClick={()=>props.closeSideNav()}>
                            <i class="fa fa-times customLink" aria-hidden="true"></i>
                        </div>
                        <div className="offset-1 col-9" >
                                
                        </div>
                        
                    </div>
                    <div className="" style={{fontSize:'12px'}}>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <i className="fa fa-user-circle" style={{color:'white',fontSize:'50px'}}></i>
                            
                            <div style={{display:'flex',flexDirection:'column',marginLeft:'12px'}} className="">
                                <span><Link onClick={()=>props.closeSideNav()} to="/" className="noLink linkLH">
                                {(UserLogin.username=='undefined' || UserLogin.username=='')?' User':UserLogin.username}
                                </Link></span>
                                <span style={{color:'gray'}}>User</span>
                            </div>
                        </div>
                        {   
                            UserLogin.username!='undefined' ?
                            (window.screen.width>=770?
                            <>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/changePassword" className="noLink linkLH">Reset Password</Link>
                                {
                                    UserLogin.userType=='Parent' && 
                                    <>
                                        <hr className="colorHr"></hr>
                                        <Link onClick={()=>{props.closeSideNav()}} to="/addStudent" className="noLink linkLH">Add Student</Link>
                                    </>
                                }
                                
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>{props.closeSideNav();dispatch({type:'LOGOUT_USER'});history.push('')}} to="/" className="noLink linkLH">Log Out</Link>
                                
                            </>
                            :
                            <>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/home" className="noLink linkLH">Home</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/exams" className="noLink linkLH">Exams</Link>
                                {   
                                    !(UserLogin.username=='undefined' && UserLogin.value?.token=='undefined') &&
                        
                                    <>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/report" className="noLink linkLH">Reports</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/assignedtests" className="noLink linkLH">Assigned Exams</Link>
                                 

                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/changePassword" className="noLink linkLH">Reset Password</Link>
                                    {
                                    UserLogin.userType=='Parent' && 
                                    <>
                                        <hr className="colorHr"></hr>
                                        <Link onClick={()=>{props.closeSideNav()}} to="/addStudent" className="noLink linkLH">Add Student </Link>
                                    </>
                                    }
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>{props.closeSideNav();dispatch({type:'LOGOUT_USER'});history.push('')}} to="/" className="noLink linkLH">Log Out</Link>
                                    </>
                                }
                            </>)
                            :
                            <>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/home" className="noLink linkLH">Home</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/login" className="noLink linkLH">Login</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/exams" className="noLink linkLH">Exams</Link>
                                
                            </>
                        }
                        
                    </div>
                    <p></p>
                    <div className="mt30 text-center contact " style={{background:'#4CAF50'}}><a className="noLink" href="tel:+91 9991124429">CALL US NOW</a></div>
                </div>
        </div>
    )
}

export default SideBar
