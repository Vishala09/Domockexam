import logo from './logo.svg';
import './App.css';
import Register from './Components/User/Register';
import Header from './Components/Header/Header';
import { BrowserRouter as Router , Switch, Route,Link,useHistory, BrowserRouter , Redirect} from 'react-router-dom';
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

function App(props) {
      const dispatch = useDispatch();
      const UserLogin = useSelector(state => state.LoginReducer);
      let reqBody = {
            "UserName":UserLogin?.username,
            "Password":UserLogin?.password,
            "RememberMe":true
        }
      useEffect(() => {
            console.log(getCookie('domockexamToken'),UserLogin)
            {
                  if(UserLogin.firstName=='')
                  {
                    //dispatch({type:'LOGIN_USER_REQUESTED',payload:reqBody});
                  }
            }
        }, []); 
       
  return (
    <div className="">
      <div className="dim" id="dim"></div>
      
      <HashRouter >
           
            <Header ></Header>
            <div style={{marginTop:'15vh'}}>
            <Switch>
            <Route path="/test">
                  <Test />
                  <Redirect to='/test'  />
            </Route>
            <Route path="/home">
                  <Home />
                  <Redirect to='/home'  />
            </Route>
            <Route path="/report">
                  <Report />
                  <Redirect to='/report'  />
            </Route>
            <Route path="/exams">
                  <Exams />
                  <Redirect to='/exams'  />
            </Route>
            <Route path="/login">
                  <Login />
                  <Redirect to='/login'  />
            </Route>
            <Route path="/">
                  <Register />
            </Route>
            </Switch>
            </div>
      </HashRouter>
      
    </div>
  );
}

export default App;
