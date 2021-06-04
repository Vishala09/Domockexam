import React,{useState,useRef, useEffect} from 'react'
import District from '../HelperComps/District';
import PasswordView from '../HelperComps/PasswordView';
import Parent from './Parent'
import RegisterFooter from './RegisterFooter';
import {validateFirstName,validatePhone,validateSchool,validateGender,validateGrade,validateEmail,validatePassword,validateUsername} from '../HelperFunctions/Validations'
import DistrictMUI from '../HelperComps/DistrictMUI';
function Student(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];
    const [IsParent, setIsParent] = useState(false);
    const [StudentData, setStudentData] = useState({firstname:"",surname:"",gender:"",grade:"",email:"",password:"",
                                                school:"",district:"",child:IsParent,phone:"",username:"",source:""})
    
    const above18ref = useRef()
    let checkSchoolGrade = (val) => {
        if(val!="" && val!="Other" && val<=12)
        {
            setIsParent(true)
        }
        else{
            setIsParent(false)
        }
    }
    const Passref = useRef()
    let [validationRules,setValidationRules] = useState({
        firstname:"",
        surname:"",
        gender:"",
        grade:"",
        email:"",
        username:"",
        password:"",
        phone:"",
        above18:"",
        school:""
    });
   
   
    const validateAbove18 = ( ) => {
        if(!IsParent && !above18ref.current.checked)
            return "Please confirm if you are above 18"
        else
            return ""
    }
    const PhoneInputHandler = (e) => {
        let phone=e.target.value;
        
        if(e.nativeEvent.data>=0 && e.nativeEvent.data<=9)
        {
            setStudentData({...StudentData,phone:phone})
            setValidationRules({...validationRules,phone: validatePhone(e.target.value)})
        }
        
    }
    let validate = () => {
        let flag=false;
        let tempValidationRules={}
        tempValidationRules['firstname']=validateFirstName(StudentData.firstname);
        tempValidationRules['surname']=validateFirstName(StudentData.surname);
        tempValidationRules['gender']=validateGender(StudentData.gender);
        tempValidationRules['grade']=validateGrade(StudentData.grade);
        tempValidationRules['email']=validateEmail(StudentData.email);
        tempValidationRules['password']=validatePassword(StudentData.password);
        tempValidationRules['school']=validateSchool(StudentData.school);
        tempValidationRules['phone']=validatePhone(StudentData.phone);
        tempValidationRules['above18']=validateAbove18();
        if(IsParent)
        tempValidationRules['username']=validateUsername(StudentData.username);
        setValidationRules({...tempValidationRules})
        for(let key in tempValidationRules)
        {
            if(tempValidationRules[key]!="")
            {
                flag=true;
                break;
            }
        }
       return !flag
    }
   
    return (
        <>
        <div className="row d-flex flex-row justify-content-center align-items-stretch" style={{width:'100%'}}>
        <div className={IsParent ? 'col-md-6':'col-md-12'}>
        <div  style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da'}}>
                <div className="mb-2" style={{backgroundColor:'#0D6EFD',color:'white',paddingLeft:'10px'}}>
                       Student Registration Form
                </div>
                <form >
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">Student First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                    <div class="px-3 paddedInput mb-2"  >
                        <input class="mb-1 form-control smalltext" type="text" value={StudentData.firstname}
                        onChange={(e)=>{setStudentData({...StudentData,firstname:e.target.value});
                        ;setValidationRules({...validationRules,firstname: validateFirstName(e.target.value)})}} 
                        name="firstname" placeholder="Enter First Name" /> 
                        <span className="err">{validationRules.firstname}</span>
                    </div>
                </div>
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">Student Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                    <div class="px-3 paddedInput mb-2" >
                        <input class="mb-1 form-control smalltext" type="text" value={StudentData.surname} 
                        onChange={(e)=>{setStudentData({...StudentData,surname:e.target.value});
                        setValidationRules({...validationRules,surname: validateFirstName(e.target.value)}) } }
                        name="surname" placeholder="Enter Surname" /> 
                        <span className="err">{validationRules.surname}</span>
                    </div>
                </div>
                <div class="row px-1 smalltext" > 
                    <div className="smalltext">
                            <h6 className="smalltext">Gender : <span className="px-1" style={{color:'red'}}>*</span> 
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Female" 
                                onChange={(e)=>{setStudentData({...StudentData,gender:"Female"})
                                setValidationRules({...validationRules,gender: validateGender(e.target.value)}) }} />
                                <label class="form-check-label smalltext" for="inlineRadio1">Female</label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Male" 
                                onChange={(e)=>{setStudentData({...StudentData,gender:"Male"})
                                setValidationRules({...validationRules,gender: validateGender(e.target.value)}) }}/>
                                <label class="form-check-label smalltext" for="inlineRadio2">Male</label>
                                </div>
                                <span className="err">{validationRules.gender}</span>
                            </h6>
                            
                    </div>
                    
                </div>
                <div className="row smalltext">
                    <h6 class="px-3 smalltext"> School Grade : (In {monthNames[new Date().getMonth()] +" "+ new Date().getFullYear()}) 
                    <span className="px-1" style={{color:'red'}}>*</span>  </h6>
                    <div class="px-3 paddedInput mb-2" >
                        <select value={StudentData.grade} class="mb-1 form-select smalltext"
                        onChange={(e)=>{setStudentData({...StudentData,grade:e.target.value});checkSchoolGrade(e.target.value);
                        setValidationRules({...validationRules,grade: validateGrade(e.target.value)})}} 
                        
                        aria-label="Default select example">
                            <option value="" selected>Select Grade</option>
                            
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5(Scholarship)</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">G.C.E O/L</option>
                            <option value="12">G.C.E A/L</option>
                            <option value="Other">Other(Above 18 years of age)</option>

                        </select>
                        <span className="err">{validationRules.grade}</span>
                    </div>
                </div>
                {!IsParent && <div className="row smalltext">
                    <div class="form-check">
                        <label class="form-check-label pull-left" for="child">
                            <h6 class="smalltext pr-15">Are you above 18 years of age? +{'           '} 
                            <span className="" style={{color:'red'}}>*</span></h6>
                        </label>
                        
                        <input class="mb-1 form-check-input" type="checkbox" ref={above18ref}
                        value={StudentData.child}  id="child"
                        onChange={(e)=>{setValidationRules({...validationRules,above18: validateAbove18(e.target.value)})}} />
                        <span className="err">{validationRules.above18}</span>
                    </div>
                </div>}
                {
                    IsParent ?
                    <> 
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Username : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput mb-2" >
                            <input class="mb-1 form-control smalltext" type="email" value={StudentData.username} 
                            onChange={(e)=>{setStudentData({...StudentData,username:e.target.value});
                            setValidationRules({...validationRules,username: validateUsername(e.target.value)})}}
                            
                            name="username" placeholder="Enter User Name" /> 
                           <span className="err">{validationRules.username}</span>
                        </div>
                    </div>
                    
                    </> :
                    <> 
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput mb-2" >
                            <input class="mb-1 form-control smalltext" type="email" value={StudentData.email} 
                            onChange={(e)=>{setStudentData({...StudentData,email:e.target.value});
                            setValidationRules({...validationRules,email: validateEmail(e.target.value)})}} 
                            
                            name="email" placeholder="Enter Email Address" /> 
                            <span className="err">{validationRules.email}</span>
                        </div>
                    </div>
                   
                    </> 
                }
                 <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput mb-2" >
                            <span style={{display:'flex',justifyContent:'space-around'}}>
                            <input ref={Passref} class="mb-1 form-control smalltext" type="password" 
                            value={StudentData.password} name="password"
                            onChange={(e)=>{setStudentData({...StudentData,password:e.target.value});
                            setValidationRules({...validationRules,password: validatePassword(e.target.value)})}}  
                            placeholder="Enter Password" /> 
                            <PasswordView Passref={Passref} />
                            </span>
                            <span className="err">{validationRules.password}</span>
                        </div>
                </div>  
                {
                    !IsParent &&
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Phone Number :</h6>
                        <div class="px-3 paddedInput mb-2" >
                            <input class="mb-1 form-control smalltext" type="number"  name="phone" value={StudentData.phone}
                             onChange={(e)=> {PhoneInputHandler(e);}} placeholder="Enter Phone Number" /> 
                            <span className="err">{validationRules.phone}</span>
                        </div>
                    </div>
                }             
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">School Name :</h6>
                    <div class="px-3 paddedInput mb-2" >
                        <input class="mb-1 form-control smalltext" type="text" value={StudentData.school} name="school" 
                        onChange={(e)=>{setStudentData({...StudentData,school:e.target.value})
                        setValidationRules({...validationRules,school: validateSchool(e.target.value)})}} placeholder="Enter School Name" /> 
                        <span className="err">{validationRules.school}</span>
                    </div>
                </div>
                <District Data={StudentData} setData={setStudentData} />
                {
                    !IsParent &&
                    <div className="row smalltext">
                        <h6 class="px-3 smalltext"> How did you hear about us?  </h6>
                        <div class="px-3 paddedInput" >
                            <select class="form-select smalltext mb-2" value={StudentData.source} name="source" 
                        onChange={(e)=>setStudentData({...StudentData,source:e.target.value})} aria-label="Default select example">
                                <option selected>Select Source</option>
                                <option value="1">Search Engine</option>
                                <option value="2">Social Media</option>
                                <option value="3">Friend</option>
                            </select>
                        </div>
                    </div>
                }
            </form>
        </div>
        </div>
        {
            IsParent && <Parent />
        }
        </div>
        <div>
            <RegisterFooter validate={validate}  />
        </div>        
        
        </>
    )
}

export default Student
