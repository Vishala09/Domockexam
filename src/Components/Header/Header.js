import React from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import './Header.css'
import SearchBar from './SearchBar';
function Header() {
    let closeSideNav = () => {
        document.getElementById("mySidenav").style.left='-1000px'
        document.getElementById("mySidenav").classList.add('mySidenav')
    }

    let openSideNav = () => {
        document.getElementById("mySidenav").style.left='0px'
        document.getElementById("mySidenav").classList.add('mySidenav')
    }

    return (
        <div>
            
            {
                window.screen.width >=576 ? 
            <div>
                <SearchBar view='desktop' />
        <div style={{position:'fixed',background:'#232F3E',height:'5vh',textAlign:'center',top:'8vh',left:0,right:0,
        width:'100%',alignItems:'center',display:'flex',fontWeight:'bolder'}}>
            
            {/* <div  id="bar"  onClick={()=>openSideNav()}><i style={{color:'white',marginLeft:'30px'}}  class="fa fa-bars" aria-hidden="true"></i></div> */}
            <div className="header_center" >
                <Link  className="noLink header_item" >
                        Home
                </Link>
                <Link  className="noLink header_item" >
                        Exams
                </Link>
            </div>
            <div className="header_right">
                <span className="header_contact">
                        <span>Contact Us</span>
                        {/* <span>xxxx-xxx-xxx</span> */}
                </span>
                
            </div>
            <div id="mySidenav" className="" style={{position:'fixed',backgroundColor:'gray',height:'100vh',width:'70%',top:'0',
                left:'-1000px',zIndex:5000000,width:'20%',textAlign:'left'}}>
                    <div className="container-fluid">
                        <div className="row text-center justify-content-center align-items-center" 
                        style={{fontWeight:'bold',backgroundColor:'black',height:'40px',color:'white'}}>
                            <div className="offset-1 col-9" >
                                    MENU
                            </div>
                            <div className="col-2 cursor-pointer" onClick={()=>closeSideNav()}><b>X</b></div>
                        </div>
                        <div className="mt30">
                            <ul type="none" 
                            style={{background:'', lineHeight:2.5,fontWeight:'bold',display:'flex',flexDirection:'column'}}>
                                <li><Link onClick={()=>closeSideNav()} to="/" className="noLink">My Profile</Link></li>
                                
                                <li><Link onClick={()=>closeSideNav()}  className="noLink">Change Password</Link></li>

                                <li><Link onClick={()=>closeSideNav()}  className="noLink">Log Out</Link></li>
                            </ul>
                            
                        </div>
                        
                        <div className="mt30 text-center contact bg-danger"><a className="noLink" href="tel:+91 9991124429">CALL US NOW</a></div>
                    </div>
                </div>
        </div>
        </div>
        :
        <div>
        <div className="container-fluid" style={{position:'fixed',background:'black',height:'7vh',textAlign:'center',top:'0',left:0,right:0,
        width:'100%',fontWeight:'bolder',zIndex:3000,textAlign:'left'}}>
            
                <div className="header row text-center align-items-center" >
                    <div className="col-3" id="bar" onClick={()=>openSideNav()}>
                        <i class="fa fa-bars" style={{color:'white'}} aria-hidden="true"></i></div>
                    <Link to="/" className="col-6 noLink">
                        <div 
                        style={{background:'#4CAF50',color:'white',height:'7vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            LOGO</div>
                    </Link>
                    <div className="col-3">
                    </div>
                </div>
                <div id="mySidenav" className="" style={{position:'fixed',backgroundColor:'gray',height:'100vh',width:'70%',top:'0',
                left:'-1000px',zIndex:50000}}>
                    <div className="container-fluid">
                        <div className="row text-center justify-content-center align-items-center" 
                        style={{fontWeight:'bold',backgroundColor:'black',height:'40px',color:'white'}}>
                            <div className="offset-1 col-9" >
                                    MENU
                            </div>
                            <div className="col-2" onClick={()=>closeSideNav()}><b>X</b></div>
                        </div>
                        <div className="mt30" style={{lineHeight:2.5,fontWeight:'bold'}}>
                            <ul type="none" >
                                <li><Link onClick={()=>closeSideNav()} to="/" className="noLink">Home</Link></li>
                                <li><Link onClick={()=>closeSideNav()} className="noLink" >Exams</Link></li>
                                
                                <li><Link onClick={()=>closeSideNav()} className="noLink">My Profile</Link></li>
                                <li><Link onClick={()=>closeSideNav()} className="noLink">Change Password</Link></li>
                                <li><Link onClick={()=>closeSideNav()} className="noLink">Log Out</Link></li>
                            </ul>
                            
                        </div>
                        
                        <div className="mt30 text-center contact bg-danger"><a className="noLink" href="tel:+91 9991124429">CALL US NOW</a></div>
                    </div>
                </div>
            </div>
            <SearchBar view='mobile' />
        </div>
            }
    </div>
    )
}

export default Header
