import React, { useState } from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import './Header.css'
import SearchBar from './SearchBar';
import SideBar from './SideBar';
function Header() {
    let closeSideNav = () => {
        document.getElementById("mySidenav").style.left='-1000px'
        document.getElementById("mySidenav").classList.add('mySidenav')
    }

    let openSideNav = () => {
        document.getElementById("mySidenav").style.left='0px'
        document.getElementById("mySidenav").classList.add('mySidenav')
    }
    const [ActiveHeader, setActiveHeader] = useState("")
    return (
        <div>
            
            {
                window.screen.width >=576 ? 
            <div>
                <SearchBar view='desktop' />
        <div style={{position:'fixed',background:'#232F3E',height:'7vh',top:'8vh',left:0,right:0,
        width:'100%',alignItems:'center',display:'flex',fontWeight:'bolder',zIndex:3000}}>
            
            {/* <div  id="bar"  onClick={()=>openSideNav()}><i style={{color:'white',marginLeft:'30px'}}  class="fa fa-bars" aria-hidden="true"></i></div> */}
            <div className="header_center" >
                <Link to="/home" onClick={()=>setActiveHeader('home')} className={ActiveHeader=='home'?'header_item activeHeader':'noLink header_item'} >
                        Home
                </Link>
                <Link to="/exams" onClick={()=>setActiveHeader('exams')} className={ActiveHeader=='exams'?'header_item activeHeader':'noLink header_item'} >
                        Exams
                </Link>
                <Link to="" onClick={()=>setActiveHeader('contact')} className={ActiveHeader=='contact'?'header_item activeHeader':'noLink header_item'} >
                        Contact Us
                </Link>
            </div>
            <SideBar />
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
                <SideBar />
            </div>
            <SearchBar view='mobile' />
        </div>
            }
    </div>
    )
}

export default Header
