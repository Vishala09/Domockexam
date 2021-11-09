import logo from './logo.svg';
import './App.css';
import Register from './Components/User/Register';
import Header from './Components/Header/Header';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
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

function App() {
      useEffect(() => {
            let rbody = {
                        "UserName":"bala23",
                        "Password":"Sample@7774",
                        "RememberMe":true
                        }
            var requestOptions = {
              method: 'POST',
              body: JSON.stringify(rbody),
              redirect: 'follow',
              headers:{'Content-Type':'application/json'}
            };

            fetch("https://api.domockexam.com/account/login", requestOptions)
              .then(response => response.json())
              .then(result => {console.log(result);
                 
            })
              .catch(error => console.log('error', error));

              //////////////////////////

        }, []); 
       
  return (
    <div className=""  >
      <div className="dim" id="dim"></div>
      <Router>
           
            <Header ></Header>
            <div style={{marginTop:'15vh'}}>
            <Route exact path="/test">
                  <Test />
            </Route>
            <Route exact path="/questionpaper">
                  <QuestionPaper />
            </Route>
            <Route exact path="/home">
                  <Home />
            </Route>
            <Route exact path="/report">
                  <Report />
            </Route>
            <Route exact path="/exams">
                  <Exams />
            </Route>
            <Route exact path="/login">
                  <Login />
            </Route>
            <Route exact path="/">
                  <Register />
            </Route>
            </div>
      </Router>
      
    </div>
  );
}

export default App;
