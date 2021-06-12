import React,{useRef, useState} from 'react'
import District from '../HelperComps/District'
import PasswordView from '../HelperComps/PasswordView';
import RegisterFooter from './RegisterFooter';
import {validateFirstName,validatePhone,validateSchool,validateGender,validateGrade,validateEmail,validatePassword,validateUsername} from '../HelperFunctions/Validations'

function Teacher() {
    const [TeacherData, setTeacherData] = useState({firstname:"",surname:"",gender:"",phone:"",email:"",
    password:"",school:"",district:"",source:""})
  
    const PhoneInputHandler = (e) => {
        let phone=e.target.value;
        console.log(e.nativeEvent)
        if(e.nativeEvent.data>=0 && e.nativeEvent.data<=9)
        {
            console.log(e.nativeEvent.data)
            setTeacherData({...TeacherData,phone:phone})
            setValidationRules({...validationRules,phone: validatePhone(e.target.value)})
        }
        
    }
    let validate = () => {
        let flag=false;
        let tempValidationRules={}
        tempValidationRules['firstname']=validateFirstName(TeacherData.firstname);
        tempValidationRules['surname']=validateFirstName(TeacherData.surname);
        tempValidationRules['gender']=validateGender(TeacherData.gender);
        tempValidationRules['email']=validateEmail(TeacherData.email);
        tempValidationRules['password']=validatePassword(TeacherData.password);
        tempValidationRules['school']=validateSchool(TeacherData.school);
        tempValidationRules['phone']=validatePhone(TeacherData.phone);
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
    const Passref = useRef()
    let [validationRules,setValidationRules] = useState({
        firstname:"",
        surname:"",
        gender:"",
        email:"",
        password:"",
        phone:"",
        school:""
    });
    return (
        <div className="row justify-content-center" style={{width:'100%'}}>
            <div className="col-12">
            <div  style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da'}}>
                            <div className="mb-2" style={{backgroundColor:'#0D6EFD',color:'white',paddingLeft:'10px',width:'100%'}}>
                                   Teacher Registration Form
                            </div>
                            <form>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Teacher First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput mb-2"  >
                                    <input class="mb-1 form-control smalltext" type="text" value={TeacherData.firstname}
                                    onChange={(e)=>{setTeacherData({...TeacherData,firstname:e.target.value});
                                    ;setValidationRules({...validationRules,firstname: validateFirstName(e.target.value)})}} 
                                    name="firstname" placeholder="Enter First Name" /> 
                                    <span className="err">{validationRules.firstname}</span>
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Teacher Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput mb-2" >
                                    <input class="mb-1 form-control smalltext" type="text" value={TeacherData.surname} 
                                    onChange={(e)=>{setTeacherData({...TeacherData,surname:e.target.value});
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
                                            onChange={(e)=>{setTeacherData({...TeacherData,gender:"Female"})
                                            setValidationRules({...validationRules,gender: validateGender(e.target.value)}) }} />
                                            <label class="form-check-label smalltext" for="inlineRadio1">Female</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Male" 
                                            onChange={(e)=>{setTeacherData({...TeacherData,gender:"Male"})
                                            setValidationRules({...validationRules,gender: validateGender(e.target.value)}) }}/>
                                            <label class="form-check-label smalltext" for="inlineRadio2">Male</label>
                                            </div>
                                            <span className="err">{validationRules.gender}</span>
                                        </h6>
                                        
                                </div>
                            </div>
                            
                            
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput mb-2" >
                                    <input class="mb-1 form-control smalltext" type="email" value={TeacherData.email} 
                                    onChange={(e)=>{setTeacherData({...TeacherData,email:e.target.value});
                                    setValidationRules({...validationRules,email: validateEmail(e.target.value)})}} 
                                    
                                    name="email" placeholder="Enter Email Address" /> 
                                    <span className="err">{validationRules.email}</span>
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                <div class="px-3 paddedInput mb-2" >
                                    <span style={{display:'flex',justifyContent:'space-around'}}>
                                    <input ref={Passref} class="mb-1 form-control smalltext" type="password" 
                                    value={TeacherData.password} name="password"
                                    onChange={(e)=>{setTeacherData({...TeacherData,password:e.target.value});
                                    setValidationRules({...validationRules,password: validatePassword(e.target.value)})}}  
                                    placeholder="Enter Password" /> 
                                    <PasswordView Passref={Passref} />
                                    </span>
                                    <span className="err">{validationRules.password}</span>
                                </div>
                            </div>  
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">Phone Number :</h6>
                                <div class="px-3 paddedInput mb-2" >
                                    <input class="mb-1 form-control smalltext" type="text"  name="phone" value={TeacherData.phone}
                                    onChange={(e)=> {PhoneInputHandler(e);}}  placeholder="Enter Phone Number" /> 
                                    <span className="err">{validationRules.phone}</span>
                                </div>
                            </div>
                            <div class="row smalltext" > 
                                <h6 class="px-3 smalltext">School Name :</h6>
                                <div class="px-3 paddedInput mb-2" >
                                    <input class="mb-1 form-control smalltext" type="text" value={TeacherData.school} name="school" 
                                    onChange={(e)=>{setTeacherData({...TeacherData,school:e.target.value})
                                    setValidationRules({...validationRules,school: validateSchool(e.target.value)})}} placeholder="Enter School Name" /> 
                                    <span className="err">{validationRules.school}</span>
                                </div>
                            </div>
                            <District Data={TeacherData} setData={setTeacherData} />
                            <div className="row smalltext">
                                <h6 class="px-3 smalltext"> How did you hear about us?  </h6>
                                <div class="px-3 paddedInput" >
                                    <select class="form-select smalltext mb-2" value={TeacherData.source} name="source" 
                                onChange={(e)=>setTeacherData({...TeacherData,source:e.target.value})} aria-label="Default select example">
                                        <option selected>Select Source</option>
                                        <option value="1">Search Engine</option>
                                        <option value="2">Social Media</option>
                                        <option value="3">Friend</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    <RegisterFooter validate={validate}  />
        </div>
        
    )
}

export default Teacher
