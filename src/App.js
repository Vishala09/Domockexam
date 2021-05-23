import logo from './logo.svg';
import './App.css';
import Register from './Components/Register/Register';
import Header from './Components/Header/Header';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import Login from './Components/Register/Login';
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
