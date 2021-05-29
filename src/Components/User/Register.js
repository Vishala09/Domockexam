import React,{useState,useEffect,useRef} from 'react';
import './Register.css';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import Home from './Home';
import Teacher from './Teacher';
import Student from './Student';
import RecaptchaComp from './RecaptchaComp';
import RegisterFooter from './RegisterFooter';


function Register() {
    
    const history = useHistory();
    const [UserType, setUserType] = useState("");

    
    return (
        <div style={{}} className="container-fluid">
            <div className="row" >
                <Home />
                <div className="col-md-9 d-flex flex-column justify-content-center align-items-center" >
                    <div className={UserType==""?'mycard':''} >
                        <h3 className="d-flex justify-content-center align-items-center">Register</h3>
                    
                        <div className="smalltext"  >
                                <h6 class="px-3 smalltext"> Are you a Student/Teacher?  </h6>
                                <div class=" px-3 paddedInput" >
                                    <select value={UserType} class="form-select smalltext mb-2" aria-label="Default select example"
                                    onChange={(e)=>{setUserType(e.target.value);}} >
                                        <option selected value="">Select User Type</option>
                                        <option value="Adult">Student</option>
                                        <option value="Teacher">Teacher</option>
                                       
                                    </select>
                                </div>
                        </div>
                    </div>
                    { (UserType=="Adult")  && <Student />}
                    { UserType=="Teacher" && <Teacher />} 
                    
                   
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p></p>
                        <div className=""><i>Already have an account?</i></div>
                        <button className="btn btn-warning lrbutton" onClick={()=>history.push('/login')}>Login</button>
                      
                    </div>
                    
                    
                    </div>
            </div>
        </div>
    )
}

export default Register
