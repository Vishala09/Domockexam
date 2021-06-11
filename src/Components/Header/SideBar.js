import React from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
function SideBar(props) {
    
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
                                <span><Link onClick={()=>props.closeSideNav()} to="/" className="noLink linkLH">My Name</Link></span>
                                <span style={{color:'gray'}}>Student</span>
                            </div>
                        </div>
                        {
                            window.screen.width>=770?
                            <>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/" className="noLink linkLH">Change Password</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/" className="noLink linkLH">Log Out</Link>
                            </>
                            :
                            <>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/home" className="noLink linkLH">Home</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/exams" className="noLink linkLH">Exams</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/" className="noLink linkLH">Change Password</Link>
                                <hr className="colorHr"></hr>
                                    <Link onClick={()=>props.closeSideNav()} to="/" className="noLink linkLH">Log Out</Link>
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
