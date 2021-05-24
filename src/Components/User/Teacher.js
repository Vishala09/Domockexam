import React,{useState} from 'react'

function Teacher() {
    const [TeacherData, setTeacherData] = useState({firstname:"",surname:"",gender:"",phone:"",email:"",password:"",school:"",district:"",source:""})
    return (
        <div className="row justify-content-center">
            <div className="col-12">
            <div  style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da'}}>
                            <div className="mb-2" style={{backgroundColor:'dodgerblue',color:'white',paddingLeft:'10px',width:'100%'}}>
                                   Teacher Registration Form
                            </div>
                            <form>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Teacher First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput"  >
                                    <input class="mb-2 form-control smalltext" type="text" value={TeacherData.firstname}
                                    onChange={(e)=>setTeacherData({...TeacherData,firstname:e.target.value})} name="firstname" placeholder="Enter First Name" /> 
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Teacher Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" value={TeacherData.surname} 
                                    onChange={(e)=>setTeacherData({...TeacherData,surname:e.target.value})} name="surname" placeholder="Enter Surname" /> 
                                </div>
                            </div>
                            <div class="row px-1 smalltext" > 
                                <div className="smalltext">
                                        <h6 className="smalltext">Gender : <span className="px-1 py-2" style={{color:'red'}}>*</span> 
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Female" onChange={()=>setTeacherData({...TeacherData,gender:"Female"})} />
                                            <label class="form-check-label smalltext" for="inlineRadio1">Female</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Male" onChange={()=>setTeacherData({...TeacherData,gender:"Male"})}/>
                                            <label class="form-check-label smalltext" for="inlineRadio2">Male</label>
                                            </div>
                                        </h6>
                                </div>
                                
                            </div>
                            <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Phone Number : </h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="number" value={TeacherData.phone} 
                                        onChange={(e)=>setTeacherData({...TeacherData,phone:e.target.value})} name="phone" 
                                        placeholder="Enter Phone Number" /> 
                                    </div>
                            </div>
                            
                                <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="email" value={TeacherData.email} 
                                        onChange={(e)=>setTeacherData({...TeacherData,email:e.target.value})} name="email" placeholder="Enter Email Address" /> 
                                    </div>
                                </div>
                                <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="password" value={TeacherData.password} name="password"
                                        onChange={(e)=>setTeacherData({...TeacherData,password:e.target.value})}  placeholder="Enter Password" /> 
                                    </div>
                                </div>
                            
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">School Name :</h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" value={TeacherData.school} name="school" 
                                    onChange={(e)=>setTeacherData({...TeacherData,school:e.target.value})} placeholder="Enter School Name" /> 
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">District Name :</h6>
                                <div class="px-3 paddedInput" >
                                    <input class="mb-2 form-control smalltext" type="text" value={TeacherData.district} name="district" 
                                    onChange={(e)=>setTeacherData({...TeacherData,district:e.target.value})} placeholder="Enter District Name" /> 
                                </div>
                            </div>
                            
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

export default Teacher
