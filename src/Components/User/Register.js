import React,{useState,useEffect,useRef} from 'react';
import './Register.css';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import Home from './Home';
import Teacher from './Teacher';
import Student from './Student';
import Tutor from './Tutor';
import RecaptchaComp from './RecaptchaComp';


function Register() {
    
    const [Parent, setParent] = useState(false);
    const history = useHistory();
    const [UserType, setUserType] = useState("");
    const [Human, setHuman] = useState(false);
    const tcref = useRef();
    const [TcChecked, setTcChecked] = useState(false)
    let setUserTypeHandle = (e) => {
            if(e.target.value=="Child")
            {
                setParent(true)
            }
            else if(e.target.value=="Adult")
            {
                setParent(false);
                
            }
            else{
                setParent(false)
            }
           
    }
    
    return (
        <div style={{marginTop:'10vh'}} className="container-fluid">
            <div className="row" >
                <Home />
                <div className="col-md-9 d-flex flex-column justify-content-center align-items-center" >
                    <div className={UserType==""?'mycard':''} >
                        <h3 className="d-flex justify-content-center align-items-center">Register</h3>
                    
                        <div className="smalltext" style={{marginTop:'20px'}} >
                                <h6 class="px-3 smalltext"> Are you a Student(Child)/Student(Adult)/Teacher?  </h6>
                                <div class=" px-3 paddedInput" >
                                    <select value={UserType} class="form-select smalltext mb-2" aria-label="Default select example"
                                    onChange={(e)=>{setUserType(e.target.value);setUserTypeHandle(e)}} >
                                        <option selected value="">Select User Type</option>
                                        <option value="Adult">Student(Adult)</option>
                                        <option value="Child">Student(Child) - Parent</option>
                                        <option value="Teacher">Teacher</option>
                                       
                                    </select>
                                </div>
                        </div>
                    </div>
                    { (UserType=="Adult" || UserType=="Child")  && 
                    <Student Parent={Parent} ParentHandle={(v)=>{setParent(v);if(v==true)setUserType("Child") ; else setUserType("Adult")}} />}
                    { UserType=="Teacher" && <Teacher />} 
                    {UserType != "" &&
                    <div className="d-flex flex-column align-items-center">
                        <div class="form-check ">
                            <input class="form-check-input" type="checkbox" 
                            onChange={()=>setTcChecked(!TcChecked)} value={TcChecked}  id="tcs" />
                            <label class="form-check-label " for="tcs">
                            <span className="px-1 py-2 cursor-pointer" style={{color:'red'}}>*</span>  Accept terms and conditions
                            </label>
                        </div>
                        <RecaptchaComp verifyHumanCallback={()=>setHuman(true)} />
                        {Human && TcChecked ? 
                        <button className="btn btn-primary register" type="submit">Register</button>
                        : <button className="btn btn-secondary" type="submit">Register</button>}
                        
                    </div>
                    }
                    <div className="d-flex flex-column align-items-center">
                        <div className="smalltext"><i>Already have an account?</i></div>
                        <button className="btn btn-warning" onClick={()=>history.push('/login')}>Login</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
