import React,{useState} from 'react'
import Parent from './Parent'
function Student(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];
    const [StudentData, setStudentData] = useState({firstname:"",surname:"",gender:"",grade:"",email:"",password:"",school:"",district:""})
    let checkSchoolGrade = (val) => {
        if(val<=5)
        {
            props.ParentHandle(true)
        }
        else{
            props.ParentHandle(false)
        }
    }
    
    return (
        <div className="row d-flex justify-content-center align-items-stretch">
        <div className={props.Parent ? 'col-md-6':'col-md-12'}>
        <div  style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da'}}>
                <div className="mb-2" style={{backgroundColor:'dodgerblue',color:'white',paddingLeft:'10px'}}>
                       Student Registration Form
                </div>
                <form>
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">Student First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                    <div class="px-3 paddedInput"  >
                        <input class="mb-2 form-control smalltext" type="text" value={StudentData.firstname}
                        onChange={(e)=>setStudentData({...StudentData,firstname:e.target.value})} name="firstname" placeholder="Enter First Name" /> 
                    </div>
                </div>
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">Student Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                    <div class="px-3 paddedInput" >
                        <input class="mb-2 form-control smalltext" type="text" value={StudentData.surname} 
                        onChange={(e)=>setStudentData({...StudentData,surname:e.target.value})} name="surname" placeholder="Enter Surname" /> 
                    </div>
                </div>
                <div class="row px-1 smalltext" > 
                    <div className="smalltext">
                            <h6 className="smalltext">Gender : <span className="px-1 py-2" style={{color:'red'}}>*</span> 
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Female" onChange={()=>setStudentData({...StudentData,gender:"Female"})} />
                                <label class="form-check-label smalltext" for="inlineRadio1">Female</label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Male" onChange={()=>setStudentData({...StudentData,gender:"Male"})}/>
                                <label class="form-check-label smalltext" for="inlineRadio2">Male</label>
                                </div>
                            </h6>
                    </div>
                    
                </div>
                <div className="row smalltext">
                    <h6 class="px-3 smalltext"> School Grade : (In {monthNames[new Date().getMonth()] +" "+ new Date().getFullYear()}) <span className="px-1" style={{color:'red'}}>*</span>  </h6>
                    <div class="px-3 paddedInput" >
                        <select value={StudentData.grade} class="form-select smalltext mb-2"
                        onChange={(e)=>{setStudentData({...StudentData,grade:e.target.value});checkSchoolGrade(e.target.value)}} aria-label="Default select example">
                            <option selected>Select Grade</option>
                            <option value="1">I</option>
                            <option value="2">II</option>
                            <option value="3">III</option>
                            <option value="4">IV</option>
                            <option value="5">V</option>
                            <option value="6">VI</option>
                            <option value="7">VII</option>
                            <option value="8">VIII</option>
                            <option value="9">IX</option>
                            <option value="10">X</option>
                        </select>
                    </div>
                </div>
                {
                    !props.Parent &&
                    <>
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput" >
                            <input class="mb-2 form-control smalltext" type="email" value={StudentData.email} 
                            onChange={(e)=>setStudentData({...StudentData,email:e.target.value})} name="email" placeholder="Enter Email Address" /> 
                        </div>
                    </div>
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput" >
                            <input class="mb-2 form-control smalltext" type="password" value={StudentData.password} name="password"
                            onChange={(e)=>setStudentData({...StudentData,password:e.target.value})}  placeholder="Enter Password" /> 
                        </div>
                    </div>
                    </>
                }
                
                
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">School Name :</h6>
                    <div class="px-3 paddedInput" >
                        <input class="mb-2 form-control smalltext" type="text" value={StudentData.school} name="school" 
                        onChange={(e)=>setStudentData({...StudentData,school:e.target.value})} placeholder="Enter School Name" /> 
                    </div>
                </div>
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">District Name :</h6>
                    <div class="px-3 paddedInput" >
                        <input class="mb-2 form-control smalltext" type="text" value={StudentData.district} name="district" 
                        onChange={(e)=>setStudentData({...StudentData,district:e.target.value})} placeholder="Enter District Name" /> 
                    </div>
                </div>
            </form>
        </div>
        </div>
        {
            props.Parent && <Parent />
        }
        <div className="d-flex flex-column align-items-center">
            <div class="form-check ">
                <input class="form-check-input" type="checkbox" value="" id="tcs" />
                <label class="form-check-label " for="tcs">
                <span className="px-1 py-2 cursor-pointer" style={{color:'red'}}>*</span>  Accept terms and conditions
                </label>
            </div>
            <button className="btn btn-primary register" type="submit">Register</button>
        </div>
                   
        </div>
    )
}

export default Student
