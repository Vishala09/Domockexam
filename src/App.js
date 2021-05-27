import logo from './logo.svg';
import './App.css';
import Register from './Components/User/Register';
import Header from './Components/Header/Header';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import Login from './Components/User/Login';
import 'font-awesome/css/font-awesome.min.css';
import SearchBar from './Components/Header/SearchBar';
import Home from './Components/Home/Home';
function App() {
  return (
    <div className="">
      <Router>
            
            <Header ></Header>
            <div style={{marginTop:'13vh'}}>
            <Route exact path="/home">
                  <Home />
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
