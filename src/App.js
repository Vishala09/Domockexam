import logo from './logo.svg';
import './App.css';
import Register from './Components/User/Register';
import Header from './Components/Header/Header';
import { BrowserRouter as Router , Switch, Route,Link,useHistory, BrowserRouter , Redirect, useLocation} from 'react-router-dom';
import Login from './Components/User/Login';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from './Components/Header/SearchBar';
import Home from './Components/Home/Home';
import Exams from './Components/Exams/Exams';
import { useEffect } from 'react';
import QuestionPaper from './Components/QuestionPaper/QuestionPaper';
import axios from 'axios';
import Test from './Components/Test/Test';
import Report from './Components/Reports/Report';
import { useDispatch, useSelector } from 'react-redux';
import {setCookie,getCookie} from './Components/HelperFunctions/CookieSettings';
import { HashRouter } from 'react-router-dom';
import ForgotPassword from './Components/User/ForgotPassword';
import ResetPassword from './Components/User/ResetPassword';
import ChangePassword from './Components/User/ChangePassword';
import AssignedTests from './Components/AssignedTests/AssignedTests';
import EmailConfirmation from './Components/User/EmailConfirmation';
import AddStudent from './Components/User/AddStudent';
import ContactUs from './Components/Home/ContactUs';


function App(props) {
      const UserLogin = useSelector(state => state.LoginReducer);
       useEffect(() => {
          console.log('LOOGED IN USER DETAILS ',UserLogin)
       }, []);
      
      
       
  return (
    <div className="">
      <div className="dim" id="dim"></div>
      
      <HashRouter >
            
            
            <div >
            <Switch>
            <Route path="/test">
                  <Test />
            </Route>
            
            <Route path="/home">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><Home /></div>
                  
            </Route>
            <Route path="/contactUs">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><ContactUs /></div>
            </Route>
            <Route path="/report">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><Report /></div>
            </Route>
            <Route path="/assignedtests">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><AssignedTests /></div>
            </Route>
            <Route path="/exams">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><Exams /></div>
            </Route>
            <Route path="/addStudent">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><AddStudent /></div>
            </Route>
            <Route path="/ConfirmEmail">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><EmailConfirmation /></div>
            </Route>
            <Route path="/changePassword">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><ChangePassword /></div>
            </Route>
            <Route path="/ResetPassword">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><ResetPassword /></div>
            </Route>
            <Route path="/forgotpassword">

                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><ForgotPassword /></div>
            </Route>
            <Route path="/login">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><Login /></div>
                  {/* <Redirect to='/login'  /> */}
            </Route>
            <Route path="/">
                  <Header ></Header>
                  <div style={{marginTop:'15vh'}}><Register /></div>
            </Route>
            </Switch>
            </div>
      </HashRouter>
      
    </div>
  );
}

export default App;
