import React,{useState,useRef} from 'react'
import District from '../HelperComps/District';
import PasswordView from '../HelperComps/PasswordView';
import Parent from './Parent'
import RegisterFooter from './RegisterFooter';
function Student(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];
    const [IsParent, setIsParent] = useState(false);
    const [StudentData, setStudentData] = useState({firstname:"",surname:"",gender:"",grade:"",email:"",password:"",
                                                school:"",district:"",child:IsParent,phone:""})
    const above18ref = useRef()
    let checkSchoolGrade = (val) => {
        if(val!="Other" && val<=12)
        {
            setIsParent(true)
        }
        else{
            setIsParent(false)
        }
    }
    const Passref = useRef()
    let validationRules = {
        firstname:"First Name should have minimum 5 and maximum 20 letters",
        surname:"Surname should not be empty and should not contain special characters",
        gender:"Must select a gender",
        grade:"Must select a grade",
        email:"Please enter a valid email address",
        password:"Please enter a valid password of minimum length 8 containing special characters,numbers,capital and small letters",
        phone:"Must contain only 10 digits",
        above18:"Please confirm"
    }
    const [ValidationError, setValidationError] = useState({firstname:false,surname:false,gender:false,grade:false,email:false,
        password:false,school:false,district:false,child:IsParent,phone:false,above18:false
    })

    let validate = () => {
        let flag=false;
        var splcharformat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let ValidationErrorTemp = {firstname:false,surname:false,gender:false,grade:false,email:false,password:false,school:false,district:false,child:IsParent,phone:false}
        
        if(StudentData.firstname.length <5 || StudentData.firstname.length > 20 || splcharformat.test(StudentData.firstname)) 
        {ValidationErrorTemp['firstname']=true;flag=true}
        else {ValidationErrorTemp['firstname']=false}
         
        if(StudentData.surname.length <1 || splcharformat.test(StudentData.surname)) 
        {ValidationErrorTemp['surname']=true;flag=true;}
        else 
        {ValidationErrorTemp['surname']=false;}

        if(StudentData.gender == "") 
        {ValidationErrorTemp['gender']=true;flag=true}
        else {ValidationErrorTemp['gender']=false}
        
        if(StudentData.grade == "") 
        {ValidationErrorTemp['grade']=true;flag=true;}
        else {ValidationErrorTemp['grade']=false}

        if(emailformat.test(StudentData.email)) 
        {ValidationErrorTemp['email']=false;}
        else {ValidationErrorTemp['email']=true;flag=true}

        if(StudentData.password.match(/[a-z]/g) && StudentData.password.match(
            /[A-Z]/g) && StudentData.password.match(
            /[0-9]/g) && StudentData.password.match(
            /[^a-zA-Z\d]/g) && StudentData.password.length >= 8) 
        {ValidationErrorTemp['password']=false;}
        else {ValidationErrorTemp['password']=true;flag=true}

        if(!IsParent && !above18ref.current.checked)
        {ValidationErrorTemp['above18']=true;flag=true}
        else
        {ValidationErrorTemp['above18']=false;}

       setValidationError({...ValidationErrorTemp});
       
       return !flag;
    }
    return (
        <div className="row d-flex justify-content-center align-items-stretch" style={{width:'100%'}}>
        <div className={IsParent ? 'col-md-6':'col-md-12'}>
        <div  style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da'}}>
                <div className="mb-2" style={{backgroundColor:'dodgerblue',color:'white',paddingLeft:'10px'}}>
                       Student Registration Form
                </div>
                <form >
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">Student First Name : <span className="px-1" style={{color:'red'}}>*</span></h6>
                    <div class="px-3 paddedInput mb-2"  >
                        <input class="form-control smalltext" type="text" value={StudentData.firstname}
                        onChange={(e)=>setStudentData({...StudentData,firstname:e.target.value})} name="firstname" placeholder="Enter First Name" /> 
                        { ValidationError.firstname ? <span className="err">{validationRules.firstname}</span> : ''}
                    </div>
                </div>
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">Student Surname : <span className="px-1" style={{color:'red'}}>*</span></h6>
                    <div class="px-3 paddedInput mb-2" >
                        <input class="form-control smalltext" type="text" value={StudentData.surname} 
                        onChange={(e)=>setStudentData({...StudentData,surname:e.target.value})} name="surname" placeholder="Enter Surname" /> 
                        { ValidationError.surname ? <span className="err">{validationRules.surname}</span> : ''}
                    </div>
                </div>
                <div class="row px-1 smalltext" > 
                    <div className="smalltext">
                            <h6 className="smalltext">Gender : <span className="px-1" style={{color:'red'}}>*</span> 
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Female" onChange={()=>setStudentData({...StudentData,gender:"Female"})} />
                                <label class="form-check-label smalltext" for="inlineRadio1">Female</label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Male" onChange={()=>setStudentData({...StudentData,gender:"Male"})}/>
                                <label class="form-check-label smalltext" for="inlineRadio2">Male</label>
                                </div>
                                { ValidationError.gender ? <span className="err">{validationRules.gender}</span> : ''}
                            </h6>
                            
                    </div>
                    
                </div>
                <div className="row smalltext">
                    <h6 class="px-3 smalltext"> School Grade : (In {monthNames[new Date().getMonth()] +" "+ new Date().getFullYear()}) 
                    <span className="px-1" style={{color:'red'}}>*</span>  </h6>
                    <div class="px-3 paddedInput mb-2" >
                        <select value={StudentData.grade} class="form-select smalltext"
                        onChange={(e)=>{setStudentData({...StudentData,grade:e.target.value});checkSchoolGrade(e.target.value)}} aria-label="Default select example">
                            <option selected>Select Grade</option>
                            
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
                        { ValidationError.grade ? <span className="err">{validationRules.grade}</span> : ''}
                    </div>
                </div>
                {!IsParent && <div className="row smalltext">
                    <div class="form-check">
                        <label class="form-check-label pull-left" for="child">
                            <h6 class="smalltext pr-15">Are you above 18 years of age? +{'           '} 
                            <span className="" style={{color:'red'}}>*</span></h6>
                        </label>
                        
                        <input class="form-check-input" type="checkbox" ref={above18ref}
                        value={StudentData.child} id="child" />
                        { ValidationError.above18 ? <span className="err">{validationRules.above18}</span> : ''}
                    </div>
                </div>}
                {
                    IsParent ?
                    <> 
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Username : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput mb-2" >
                            <input class="form-control smalltext" type="email" value={StudentData.email} 
                            onChange={(e)=>setStudentData({...StudentData,email:e.target.value})} name="email" placeholder="Enter User Name" /> 
                            { ValidationError.email ? <span className="err">{validationRules.email}</span> : ''}
                        </div>
                    </div>
                    
                    </> :
                    <> 
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput mb-2" >
                            <input class="form-control smalltext" type="email" value={StudentData.email} 
                            onChange={(e)=>setStudentData({...StudentData,email:e.target.value})} name="email" placeholder="Enter Email Address" /> 
                            { ValidationError.email ? <span className="err">{validationRules.email}</span> : ''}
                        </div>
                    </div>
                   
                    </> 
                }
                 <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput mb-2" >
                            <span style={{display:'flex',justifyContent:'space-around'}}>
                            <input ref={Passref} class="form-control smalltext" type="password" 
                            value={StudentData.password} name="password"
                            onChange={(e)=>setStudentData({...StudentData,password:e.target.value})}  placeholder="Enter Password" /> 
                            <PasswordView Passref={Passref} />
                            </span>
                            { ValidationError.password ? <span className="err">{validationRules.password}</span> : ''}
                        </div>
                </div>  
                {
                    !IsParent &&
                    <div class="row smalltext" > 
                        <h6 class="px-3 smalltext">Phone Number :</h6>
                        <div class="px-3 paddedInput" >
                            <input class="mb-2 form-control smalltext" type="number" name="phone" value={StudentData.phone}
                            onChange={(e)=>setStudentData({...StudentData,phone:e.target.value})} placeholder="Enter Phone Number" /> 
                        </div>
                    </div>
                }             
                <div class="row smalltext" > 
                    <h6 class="px-3 smalltext">School Name :</h6>
                    <div class="px-3 paddedInput" >
                        <input class="mb-2 form-control smalltext" type="text" value={StudentData.school} name="school" 
                        onChange={(e)=>setStudentData({...StudentData,school:e.target.value})} placeholder="Enter School Name" /> 
                    </div>
                </div>
                <District Data={StudentData} setData={setStudentData} />
                {
                    !IsParent &&
                    <div className="row smalltext">
                        <h6 class="px-3 smalltext"> How did you hear about us?  </h6>
                        <div class="px-3 paddedInput" >
                            <select class="form-select smalltext mb-2" aria-label="Default select example">
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
        <RegisterFooter validate={validate}  />
                   
        </div>
    )
}

export default Student
