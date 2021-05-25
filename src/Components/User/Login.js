import React from 'react'
import Home from './Home'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
function Login() {
    const history = useHistory();
    return (
        <div>
            <div style={{marginTop:'10vh'}} className="container-fluid">
           
            <div className="row d-flex" >
                <Home />
                <div className="col-md-9 d-flex flex-column justify-content-center align-items-center" >
                <h3>Login</h3>
                    <div className="">
                        
                        <div className="" style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da',margin:'20px'}}>
                                <div className="mb-2" style={{backgroundColor:'dodgerblue',color:'white',paddingLeft:'10px'}}>
                                    Login Form
                                </div>
                                <form>
                                <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Email Address or Username : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="text" name="Email" placeholder="Enter Email Address or Username" /> 
                                    </div>
                                </div>
                                <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="text" name="password" placeholder="Enter Password" /> 
                                    </div>
                                </div>
                            
                                </form>
                        </div>
                    <div className="d-flex flex-column align-items-center">
                        
                        <button className="btn btn-primary register">Login</button>
                    </div>
                    
                    <div className="d-flex flex-column align-items-center">
                        <div className="smalltext"><i>Don't have an account?</i></div>
                        <button className="btn btn-warning" onClick={()=>history.push('')}>Register</button>
                    </div>
                    </div>
                   
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login
