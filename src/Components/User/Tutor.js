import React,{useRef, useState} from 'react'
import District from '../HelperComps/District'
import PasswordView from '../HelperComps/PasswordView';
function Tutor() {
    const [TutorData, setTutorData] = useState({firstname:"",surname:"",gender:"",phone:"",email:"",password:"",school:"",district:"",source:""})
    const Passref = useRef()
    return (
        <div className="row justify-content-center" style={{width:'100%'}}>
            <div className="col-12">
            <div  style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da'}}>
                            <div className="mb-2" style={{backgroundColor:'#0275d8',color:'white',paddingLeft:'10px',width:'100%'}}>
                                   Tutor Registration Form
                            </div>
                            <form>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Tutor First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput"  >
                                    <input class="mb-2 form-control smalltext" type="text" value={TutorData.firstname}
                                    onChange={(e)=>setTutorData({...TutorData,firstname:e.target.value})} name="firstname" placeholder="Enter First Name" /> 
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Tutor Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" value={TutorData.surname} 
                                    onChange={(e)=>setTutorData({...TutorData,surname:e.target.value})} name="surname" placeholder="Enter Surname" /> 
                                </div>
                            </div>
                            <div class="row px-1 smalltext" > 
                                <div className="smalltext">
                                        <h6 className="smalltext">Gender : <span className="px-1 py-2" style={{color:'red'}}>*</span> 
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Female" onChange={()=>setTutorData({...TutorData,gender:"Female"})} />
                                            <label class="form-check-label smalltext" for="inlineRadio1">Female</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Male" onChange={()=>setTutorData({...TutorData,gender:"Male"})}/>
                                            <label class="form-check-label smalltext" for="inlineRadio2">Male</label>
                                            </div>
                                        </h6>
                                </div>
                                
                            </div>
                            <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Phone Number : </h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="number" value={TutorData.phone} 
                                        onChange={(e)=>setTutorData({...TutorData,phone:e.target.value})} name="phone" 
                                        placeholder="Enter Phone Number" /> 
                                    </div>
                            </div>
                            
                                <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="email" value={TutorData.email} 
                                        onChange={(e)=>setTutorData({...TutorData,email:e.target.value})} name="email" placeholder="Enter Email Address" /> 
                                    </div>
                                </div>
                                <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                    <span style={{display:'flex',justifyContent:'space-around'}}>
                                        <input  ref={Passref} class="mb-2 form-control smalltext" type="password" value={TutorData.password} name="password"
                                        onChange={(e)=>setTutorData({...TutorData,password:e.target.value})}  placeholder="Enter Password" /> 
                                        <PasswordView Passref={Passref} />
                                        </span>
                                    </div>
                                </div>
                            
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">School Name :</h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" value={TutorData.school} name="school" 
                                    onChange={(e)=>setTutorData({...TutorData,school:e.target.value})} placeholder="Enter School Name" /> 
                                </div>
                            </div>
                            <District Data={TutorData} setData={setTutorData} />
                            
                        </form>
                    </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                                <div class="form-check ">
                                    <input class="form-check-input" type="checkbox" value="" id="tct" />
                                    <label class="form-check-label " for="tct">
                                    <span className="px-1 py-2 " style={{color:'red'}}>*</span>  Accept terms and conditions
                                    </label>
                                </div>
                    <button className="btn btn-primary register" type="submit">Register</button>
                    </div>
        </div>
        
    )
}

export default Tutor
