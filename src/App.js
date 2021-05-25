import logo from './logo.svg';
import './App.css';
import Register from './Components/User/Register';
import Header from './Components/Header/Header';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import Login from './Components/User/Login';
import 'font-awesome/css/font-awesome.min.css';
function App() {
  return (
    <div className="">
      <Router>
            <Header ></Header>
            
            <Route exact path="/login">
                  <Login />
            </Route>
            <Route exact path="/">
                  <Register />
            </Route>
      </Router>
      
    </div>
  );
}

export default App;
