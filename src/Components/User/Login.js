import React, { useRef } from 'react'
import Home from './Home'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import PasswordView from '../HelperComps/PasswordView';
function Login() {
    const history = useHistory();
    const Passref = useRef()
    // bootstrap cols - 5 for text,6 for form,1 for right space(not mentioning) ; 
    return (
        <div>
            <div style={{}} className="container-fluid">
           
            <div className="row d-flex justify-content-center align-items-center" >
                <Home />
                <div className="col-md-9 d-flex flex-column justify-content-center align-items-center" >
                    <div className="offset-lg-5">
                    
                    </div>
                    <div className="d-flex flex-row text-center justify-content-center align-items-center row">
                    <p></p>
                    <h1 className="col-lg-5 col-12 text-center">
                        We help you practice for your exam success</h1>
                    
                    <div className="mycard col-lg-6 col-11 mb-3 " >
                        <h3 className="d-flex flex-column justify-content-center align-items-center">Login</h3>
                        <div className="" style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da',margin:'20px'}}>
                                <div className="mb-2" style={{backgroundColor:'#0D6EFD',color:'white',paddingLeft:'10px'}}>
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
                                        <span style={{display:'flex',justifyContent:'space-around'}}>
                                            <input ref={Passref} class="mb-2 form-control smalltext" type="password" name="password" placeholder="Enter Password" /> 
                                            <PasswordView Passref={Passref} />
                                        </span>
                                    </div>
                                
                                </div>
                               
                                </form>
                        </div>
                        <div className="" style={{margin:'20px'}}>
                                    <button style={{width:'100%'}} className="btn btn-primary register">Login</button>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-center" style={{margin:'20px'}}>
                                <a href="/" className="linkBlue">Forgot Password</a>
                        </div>
                        <div className="" style={{margin:'20px'}}>
                                <hr></hr>
                        </div>
                        <div className="d-flex flex-column align-items-center mb">
                            <div className=""><i>Don't have an account?</i></div>
                            <button className="btn btn-warning lrbutton" onClick={()=>history.push('')}>Register</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login
