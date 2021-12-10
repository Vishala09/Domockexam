import React, { useEffect, useRef, useState } from 'react'
import PasswordView from '../HelperComps/PasswordView';
import {validateFirstName,validatePhone,validateSchool,validateGender,validateGrade,validateEmail,validatePassword,validateUsername} from '../HelperFunctions/Validations'


function Parent(props) {
    const {ParentDataHandler} = props;
    const sendParentData = () => {
        ParentDataHandler(ParentData);
    }
    const Passref = useRef();
    const [ParentData, setParentData] = useState({firstname:"",surname:"",gender:"",email:"",password:"",
                                                child:false,phone:"",source:""});

    useEffect(() => {
        setValidationRules(props.ParentValidationRules);
    }, [props.ParentValidationRules])


    // let [validationRules,setValidationRules] = useState({
    //                                                 firstname:"",
    //                                                 surname:"",
    //                                                 gender:"",
    //                                                 grade:"",
    //                                                 email:"",
    //                                                 username:"",
    //                                                 password:"",
    //                                                 phone:"",
    //                                                 above18:"",
    //                                                 school:""
    //                                             });
    let [validationRules,setValidationRules] = useState(props.ParentValidationRules);


                                                const PhoneInputHandler = (e) => {
                                                    let phone=e.target.value;
                                                    if(e.nativeEvent.data>=0 && e.nativeEvent.data<=9)
                                                    {
                                                        setParentData({...ParentData,phone:phone})
                                                        setValidationRules({...validationRules,phone: validatePhone(e.target.value)})
                                                    }
                                                }
                                            
                                            
                                                

    return (
        <div className="col-md-6">
        <div  style={{marginTop:window.screen.width<=770?'15px':'0px', backgroundColor:'#F5F5F5',border:'1px solid #ced4da',overflow:'hidden'}}>
            <div className="mb-2" style={{backgroundColor:'#0D6EFD',color:'white',paddingLeft:'10px'}}>
                   Parent Registration Form(Must be completed)
            </div>
            <form>
           
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Parent First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput"  >
                    <input class="mb-2 form-control smalltext" type="text" value={ParentData.firstname}
                    onChange={(e)=>{setParentData({...ParentData,firstname:e.target.value});sendParentData(ParentData);
                    ;setValidationRules({...validationRules,firstname: validateFirstName(e.target.value)})}} 
                    name="firstname" placeholder="Enter First Name" /> 
                     <span className="err">{validationRules.firstname}</span>
                </div>
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Parent Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput" >
                    <input class="mb-2 form-control smalltext" type="text" value={ParentData.surname} 
                        onChange={(e)=>{setParentData({...ParentData,surname:e.target.value});sendParentData(ParentData);
                        setValidationRules({...validationRules,surname: validateFirstName(e.target.value)}) } }
                    name="surname" placeholder="Enter Surname" /> 
                    <span className="err">{validationRules.surname}</span>
                </div>
            </div>
            <div class="row px-1 smalltext" > 
                <div className="smalltext">
                        <h6 className="smalltext">Gender : <span className="px-1 py-2" style={{color:'red'}}>*</span> 
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value={2} 
                                onChange={(e)=>{setParentData({...ParentData,gender:2})
                                setValidationRules({...validationRules,gender: validateGender(e.target.value)}) }} name="genderp" id="inlineRadio3"  />
                            <label class="form-check-label smalltext" for="inlineRadio3">Female</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value={1} 
                                onChange={(e)=>{setParentData({...ParentData,gender:1});sendParentData(ParentData)
                                setValidationRules({...validationRules,gender: validateGender(e.target.value)}) }} name="genderp" id="inlineRadio4"  />
                            <label class="form-check-label smalltext" for="inlineRadio4">Male</label>
                            </div>
                            <span className="err">{validationRules.gender}</span>
                        </h6>
                </div>
                
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput" >
                    <input class="mb-2 form-control smalltext" type="text" value={ParentData.email} 
                            onChange={(e)=>{setParentData({...ParentData,email:e.target.value});sendParentData(ParentData);
                            setValidationRules({...validationRules,email: validateEmail(e.target.value)})}}  name="Email"  placeholder="Enter Email Address" /> 
                    <span className="err">{validationRules.email}</span>
                </div>
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                <div class="px-3 paddedInput" >
                    <span style={{display:'flex',justifyContent:'space-around'}} >
                    <input  ref={Passref} class="mb-2 form-control smalltext" value={ParentData.password} 
                            onChange={(e)=>{ParentData.password=e.target.value;setParentData({...ParentData});sendParentData(ParentData);
                            setValidationRules({...validationRules,password: validatePassword(e.target.value)})}}   type="password"  name="password" placeholder="Enter Password" /> 
                    <PasswordView Passref={Passref} />
                    </span>
                    <span className="err">{validationRules.password}</span>
                </div>
            </div>
            <div class="row smalltext" > 
                <h6 class="px-3 smalltext">Phone Number :</h6>
                <div class="px-3 paddedInput" >
                    <input class="mb-2 form-control smalltext" value={ParentData.phone}
                    onChange={(e)=> {PhoneInputHandler(e);sendParentData(ParentData)}} type="text" name="phone" placeholder="Enter Phone Number" /> 
                    <span className="err">{validationRules.phone}</span>
                </div>
            </div>
            <div className="row smalltext">
                <h6 class="px-3 smalltext"> How did you hear about us?  </h6>
                <div class="px-3 paddedInput" >
                    <select class="form-select smalltext mb-2" value={ParentData.source}
                        onChange={(e)=>{setParentData({...ParentData,source:e.target.value});sendParentData(ParentData)}} aria-label="Default select example">
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
    )
}

export default Parent
