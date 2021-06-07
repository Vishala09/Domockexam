import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import './Header.css'
import SearchBar from './SearchBar';
import SideBar from './SideBar';
function Header() {
    let closeSideNav = () => {
        document.getElementById("mySidenav").style.left='-1000px'
        document.getElementById("mySidenav").classList.add('mySidenav')
        document.getElementById('dim').style.visibility='hidden';
    }

    let openSideNav = () => {
        document.getElementById("mySidenav").style.left='0px'
        document.getElementById("mySidenav").classList.add('mySidenav');
        document.getElementById('dim').style.visibility='visible';
        console.log(document.getElementById('dim'))
    }
    const [ActiveHeader, setActiveHeader] = useState("")
    useEffect(() => {
        document.getElementById('dim').addEventListener('click',function(){
              closeSideNav();
        })
  }, [])
    return (
        <div>
            
        { window.screen.width >=770 ? 
        <div>
            <SearchBar openSideNav={openSideNav} closeSideNav={closeSideNav} view='desktop' />
            <div style={{position:'fixed',background:'#232F3E',height:'7vh',top:'8vh',left:0,right:0,
            width:'100%',alignItems:'center',display:'flex',fontWeight:'bolder',zIndex:3000}}>
                
                {/* <div  id="bar"  onClick={()=>openSideNav()}><i style={{color:'white',marginLeft:'30px'}}  class="fa fa-bars" aria-hidden="true"></i></div> */}
                <div className="header_center" >
                    <Link to="/home" onClick={()=>setActiveHeader('home')} 
                    className={ActiveHeader=='home'?'header_item activeHeader':'normalHeader header_item'} >
                            <div >Home</div>
                           
                                <div type="none"  className="selectedHeaderOptions1">
                                    <div className="subHeader">
                                            <a className="subHeaderLink">Sub Header 1</a>
                                    </div>  
                                    <div className="subHeader">
                                            <a className="subHeaderLink">Sub Header 2</a>
                                    </div>  
                                    <div className="subHeader">
                                            <a className="subHeaderLink">Sub Header 3</a>
                                    </div>         
                                </div>
                                
                           
                    </Link>
                    <Link to="/exams" onClick={()=>setActiveHeader('exams')} className={ActiveHeader=='exams'?'header_item activeHeader':'normalHeader header_item'} >
                            <div >Exams</div>
                            <div type="none"  className="selectedHeaderOptions1">
                                <div className="subHeader">
                                        <a className="subHeaderLink">Sub Header 1</a>
                                </div>  
                                <div className="subHeader">
                                        <a className="subHeaderLink">Sub Header 2</a>
                                </div>  
                                <div className="subHeader">
                                        <a className="subHeaderLink">Sub Header 3</a>
                                </div>         
                            </div>
                    </Link>
                    <Link to="" onClick={()=>setActiveHeader('contact')} className={ActiveHeader=='contact'?'header_item activeHeader':'normalHeader header_item'} >
                            Contact Us
                    </Link>
                </div>
                <SideBar openSideNav={openSideNav} closeSideNav={closeSideNav} />
            </div>
        </div>
        :
        <div>
        <div className="container-fluid" style={{position:'fixed',background:'black',height:'7vh',textAlign:'center',top:0,left:0,right:0,
        width:'100%',fontWeight:'bolder',zIndex:3000,textAlign:'left',padding:'10px'}}>
            
                <div className="header row  align-items-start" >
                    <div className="col-1" style={{fontSize:'18px',paddingLeft:'20px'}} id="bar" onClick={()=>openSideNav()}>
                        <i class="fa fa-bars" style={{color:'white'}} aria-hidden="true"></i>
                        
                    </div>
                   
                        <div className="col-10 noLink"
                        style={{color:'white',height:'7vh',display:'flex',justifyContent:'center'}}>
                            Company Name
                        </div>
             
                    <div className="col-3">
                    </div>
                </div>
                <SideBar openSideNav={openSideNav} closeSideNav={closeSideNav} />
            </div>
            <SearchBar openSideNav={openSideNav} closeSideNav={closeSideNav} view='mobile' />
        </div>
            }
    </div>
    )
}

export default Header
