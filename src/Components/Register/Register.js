import React,{useState,useEffect} from 'react';
import './Register.css';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import Home from './Home';

function Register() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];
    const [Parent, setParent] = useState(false);
    const history = useHistory()
    return (
        <div style={{marginTop:'10vh'}} className="container-fluid">
            <div className="row d-flex" >
                <Home />
                <div className="col-md-9 d-flex flex-column" >
                    <div className="row" >
                        <h3 className="d-flex justify-content-center align-items-center">Register</h3>
                        <div className="d-flex justify-content-center align-items-center">
                        <div class="form-check form-switch cursor-pointer">
                            <input class="form-check-input cursor-pointer" type="checkbox" id="flexSwitchCheckChecked" value={Parent}  onChange={() => setParent(!Parent)} checked={Parent==true} />
                            <label class="form-check-label cursor-pointer" for="flexSwitchCheckChecked">Are you a Parent?</label>
                        </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                    <div className={Parent ? 'col-md-6':'col-md-10'} 
                    style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da'}}>
                            <div className="mb-2" style={{backgroundColor:'dodgerblue',color:'white',paddingLeft:'10px'}}>
                                   Student Registration Form
                            </div>
                            <form>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" name="Email" placeholder="Enter Email Address" /> 
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" name="password" placeholder="Enter Password" /> 
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Student First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput"  >
                                    <input class="mb-2 form-control smalltext" type="text" name="firstname" placeholder="Enter First Name" /> 
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Student Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" name="surname" placeholder="Enter Surname" /> 
                                </div>
                            </div>
                            <div class="row px-1 smalltext" > 
                                <div className="smalltext">
                                        <h6 className="smalltext">Gender : <span className="px-1 py-2" style={{color:'red'}}>*</span> 
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="option1" />
                                            <label class="form-check-label smalltext" for="inlineRadio1">Female</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="option2" />
                                            <label class="form-check-label smalltext" for="inlineRadio2">Male</label>
                                            </div>
                                        </h6>
                                </div>
                                
                            </div>
                            <div className="row smalltext">
                                <h6 class="px-3 smalltext">School Grade :  (In {monthNames[new Date().getMonth()] +" "+ new Date().getFullYear()}) <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="date" name="grade" placeholder="Enter School Grade"  /> 
                                </div>
                            </div>
                            </form>
                    </div>
                    
                    {
                        Parent && 
                        <div className="col-md-6" style={{marginTop:window.screen.width<=576?'15px':'0px', backgroundColor:'#F5F5F5',border:'1px solid #ced4da',overflow:'hidden'}}>
                        <div className="mb-2" style={{backgroundColor:'dodgerblue',color:'white',paddingLeft:'10px'}}>
                               Parent Registration Form
                        </div>
                        <form>
                        <div class="row smalltext" > 
                            <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput" >
                                <input class="mb-2 form-control smalltext" type="text" name="Email" placeholder="Enter Email Address" /> 
                            </div>
                        </div>
                        <div class="row smalltext" > 
                            <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput" >
                                <input class="mb-2 form-control smalltext" type="text" name="password" placeholder="Enter Password" /> 
                            </div>
                        </div>
                        <div class="row smalltext" > 
                            <h6 class="px-3 smalltext">Student First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput"  >
                                <input class="mb-2 form-control smalltext" type="text" name="firstname" placeholder="Enter First Name" /> 
                            </div>
                        </div>
                        <div class="row smalltext" > 
                            <h6 class="px-3 smalltext">Student Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput" >
                                <input class="mb-2 form-control smalltext" type="text" name="surname" placeholder="Enter Email Address" /> 
                            </div>
                        </div>
                        <div class="row px-1 smalltext" > 
                            <div className="smalltext">
                                    <h6 className="smalltext">Gender : <span className="px-1 py-2" style={{color:'red'}}>*</span> 
                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="genderp" id="inlineRadio3"  />
                                        <label class="form-check-label smalltext" for="inlineRadio3">Female</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="genderp" id="inlineRadio4"  />
                                        <label class="form-check-label smalltext" for="inlineRadio4">Male</label>
                                        </div>
                                    </h6>
                            </div>
                            
                        </div>
                        <div class="row smalltext" > 
                            <h6 class="px-3 smalltext">Phone Number(Optional) :</h6>
                            <div class="px-3 paddedInput" >
                                <input class="mb-2 form-control smalltext" type="number" name="phone" placeholder="Enter Phone Number" /> 
                            </div>
                        </div>
                        <div className="row smalltext">
                        <h6 class="px-3 smalltext"> How did you hear about us?  </h6>
                        <div class="px-3 paddedInput" >
                            <select class="form-select smalltext" aria-label="Default select example">
                                <option selected>Select Course</option>
                                <option value="1">Search Engine</option>
                                <option value="2">Social Media</option>
                                <option value="3">Friend</option>
                            </select>
                        </div>
                        </div>
                        </form>
                    </div>
                    }
                    
                    <div className="d-flex flex-column align-items-center">
                        <div class="form-check ">
                            <input class="form-check-input" type="checkbox" value="" id="tc" />
                            <label class="form-check-label " for="tc">
                            <span className="px-1 py-2 " style={{color:'red'}}>*</span>  Accept terms and conditions
                            </label>
                        </div>
                        <button className="btn btn-primary register">Register</button>
                    </div>
                    </div>
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
