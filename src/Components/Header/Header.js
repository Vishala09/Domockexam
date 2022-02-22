import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import './Header.css'
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CompanyName from '../Home/CompanyName';


function Header(props) {
    const UserLogin = useSelector(state => state.LoginReducer);
    const history = useHistory();

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
  }, []);

  const location = useLocation();
  let CurrentPath = location.pathname;
  CurrentPath= CurrentPath.replace('/','').toUpperCase()
  useEffect(() => {
      if(CurrentPath=='')
      {
        CurrentPath='WELCOME'
      }
      document.title = 'DO MOCK EXAM | '+CurrentPath;
        setActiveHeader('')
        if(location.pathname=='/assignedtests')
        {
            setActiveHeader('assignedtests')
        }
        if(location.pathname=='/test')
        {
            setActiveHeader('test')
        }
        if(location.pathname=='/home')
        {
            setActiveHeader('home')
        }
        if(location.pathname=='/contactUs')
        {
            setActiveHeader('contactUs')
        }
        if(location.pathname=='/exams')
        {
            setActiveHeader('exams')
        }
        if(location.pathname=='/report')
        {
            setActiveHeader('report')
        }
        if(location.pathname=='/login')
        {
            setActiveHeader('')
        }
        if(location.pathname=='')
        {
            if(Object.keys(UserLogin).length>0 && ((UserLogin.value?.token!='undefined')) && UserLogin.result!=false)
              { 
                  history.push('/exams');
              }
        }
        // if(location.pathname!='')
        // {
        //     if(((UserLogin.username=='undefined' && UserLogin.value?.token=='undefined')))  
        //     {
        //        history.push('/login');
        //     }
        // }
  }, [location]);

  const navigate = (path) => {
            history.push(path);
  }

    return (
        <div>
            
        { window.screen.width >=770 ? 
        <div>
            <SearchBar openSideNav={openSideNav} closeSideNav={closeSideNav} view='desktop' />
            <div style={{position:'fixed',background:'#232F3E',height:'7vh',top:'8vh',left:0,right:0,
            width:'100%',alignItems:'center',display:'flex',zIndex:3000}} onClick={()=>closeSideNav()}>
                <div className="header_center" >
                    {
                        !(UserLogin.username=='undefined' && UserLogin.value?.token=='undefined') &&
                            <>
                    <Link  onClick={() => navigate('report')}
                    className={ActiveHeader=='report'?'header_item activeHeader':'normalHeader header_item'}>
                            My Reports
                    </Link>
                    <Link onClick={() => navigate('assignedtests')}
                    className={ActiveHeader=='assignedtests'?'header_item activeHeader':'normalHeader header_item'}>
                           Assigned Exams 
                    </Link>
                            </>
                    }
                    
                    <Link  to="/home"
                    className={ActiveHeader=='home'?'header_item activeHeader':'normalHeader header_item'} >
                            <div>Home</div>
                                {/* <div type="none"  className="selectedHeaderOptions1">
                                    <div className="subHeader">
                                            <a className="subHeaderLink" href="http://localhost:3000/#/home/#aboutusdiv">About Us</a>
                                    </div>  
                                    <div className="subHeader">
                                            <a className="subHeaderLink">Sub Header 12</a>
                                    </div>  
                                    <div className="subHeader">
                                            <a className="subHeaderLink">Sub Header 13</a>
                                    </div>         
                                </div> */}
                    </Link>
                    <Link  onClick={() => navigate('exams')}
                    className={ActiveHeader=='exams'?'header_item activeHeader':'normalHeader header_item'} >
                            <div >Exams</div>
                            {/* <div type="none"  className="selectedHeaderOptions1">
                                <div className="subHeader">
                                        <a className="subHeaderLink">Sub Header 21</a>
                                </div>  
                                <div className="subHeader">
                                        <a className="subHeaderLink">Sub Header 22</a>
                                </div>  
                                <div className="subHeader">
                                        <a className="subHeaderLink">Sub Header 23</a>
                                </div>         
                            </div> */}
                    </Link>
                    <Link to="/contactUs"  className={ActiveHeader=='contactUs'?'header_item activeHeader':'normalHeader header_item'} >
                            Contact Us
                    </Link>
                </div>
                <SideBar openSideNav={openSideNav} closeSideNav={closeSideNav} />
                
            </div>
        </div>
        :
        <div>
        <div className="container-fluid" style={{position:'fixed',background:'black',height:'7vh',textAlign:'center',top:0,left:0,right:0,
        fontWeight:'bolder',zIndex:3000,textAlign:'left',padding:'10px'}}>
            
                <div className="header row  align-items-start" >
                    <div className="col-1" style={{fontSize:'18px',paddingLeft:'20px'}} id="bar" onClick={()=>openSideNav()}>
                        <i class="fa fa-bars customLink" style={{color:'white'}} aria-hidden="true"></i>
                        
                    </div>
                   
                        <div className="col-10 noLink"
                        style={{color:'white',height:'7vh',display:'flex',justifyContent:'center'}}>
                            <CompanyName/>
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
