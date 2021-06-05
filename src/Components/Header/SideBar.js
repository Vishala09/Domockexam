import React from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
function SideBar() {
    let closeSideNav = () => {
        document.getElementById("mySidenav").style.left='-1000px'
        document.getElementById("mySidenav").classList.add('mySidenav')
    }

    let openSideNav = () => {
        document.getElementById("mySidenav").style.left='0px'
        document.getElementById("mySidenav").classList.add('mySidenav')
    }
    return (
        <div id="mySidenav" className="sideBar" >
                <div >
                    <div className="row text-center sideBarMenu">
                        <div className="offset-1 col-9" >
                                MENU
                        </div>
                        <div className="col-2 cursor-pointer" onClick={()=>closeSideNav()}>X</div>
                    </div>
                    <div className="" style={{fontSize:'12px'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <i class="fa fa-user-circle" style={{color:'white',fontSize:'50px',flex:0.3}}></i>
                            <div style={{display:'flex',flexDirection:'column',flex:0.7}}>
                                <span><Link onClick={()=>closeSideNav()} to="/" className="noLink linkLH">My Name</Link></span>
                                <span style={{color:'gray'}}>Student</span>
                            </div>
                        </div>
                        
                        <hr className="colorHr"></hr>
                        <Link onClick={()=>closeSideNav()} to="/" className="noLink linkLH">Change Password</Link>
                        <hr className="colorHr"></hr>
                        <Link onClick={()=>closeSideNav()} to="/" className="noLink linkLH">Log Out</Link>
                        
                    </div>
                    <p></p>
                    <div className="mt30 text-center contact " style={{background:'#4CAF50'}}><a className="noLink" href="tel:+91 9991124429">CALL US NOW</a></div>
                </div>
        </div>
    )
}

export default SideBar
