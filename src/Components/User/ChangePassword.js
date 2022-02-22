import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PasswordView from '../HelperComps/PasswordView';
import Popup from '../HelperComps/Popup';
import {validateEmail,validatePassword,validatePasswordEquality, validateSecretAnswer,validateNotEmpty} from '../HelperFunctions/Validations'
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings'
import {MapChildrenDetails} from '../HelperFunctions/UserSettings';
import StudentDetails from './StudentDetails';

function ChangePassword() {
 
    const [secretQuestion, setSecretQuestion] = useState("");
    const [secretAnswer, setSecretAnswer] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studentId, setStudentId] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const Passref = useRef()
    const CPassref = useRef();
    const [msgFromServer, setmsgFromServer] = useState({})

    const UserLogin = useSelector(state => state.LoginReducer);
      useEffect(() => {
       if(((UserLogin.username=='undefined' && UserLogin.value?.token=='undefined')))  
          {
             history.push('/login');
          }
      }, []);


    const [showModal, setshowModal] = useState(false);
    
    const ChangePasswordStatus = useSelector(state => state.ResetStudentPasswordByStudentReducer)
    useEffect(() => {
        console.log(ChangePasswordStatus)
        try{

            if(ChangePasswordStatus.status==true || ChangePasswordStatus.status=='true')
            {
                setshowModal(true);
            }
            setmsgFromServer(ChangePasswordStatus)
        }
        catch(e)
        { }
    }, [ChangePasswordStatus])

    
    const ChangePassword = () => {
        let valid  = validate();
        if(valid!=true)
        {
            alert("Please check for errors");
        }
        else
        {
            setmsgFromServer({...msgFromServer,status:"",message:""})
            let userType = getCookie('domockexamUserType');
            if(userType=='Parent')
            {
                let reqBody = {
                "UserId":Number(studentId),  //studentid
                "QuestionId":Number(secretQuestion),
                "Answer":secretAnswer,
                "Password":password,
                "ConfirmPassword":password
                }
                dispatch({type:'RESET_STUDENT_PASSWORD_BY_PASSWORD_REQUESTED',payload:reqBody});
            }
            else
            {
                let reqBody = {
                    "UserId":Number(UserLogin.studentData.studentId),  //studentid
                    "QuestionId":Number(secretQuestion),
                    "Answer":secretAnswer,
                    "Password":password,
                    "ConfirmPassword":password
                    }
                    dispatch({type:'RESET_STUDENT_PASSWORD_BY_PASSWORD_REQUESTED',payload:reqBody});
            }
          
            //setshowModal(true);
            
        }
    }


    let [validationRules,setValidationRules] = useState({
        secretAnswer:"",password:"",confirmPassword:"",passwordMatch:"",studentId:""
    });

    let validate = () => {

        let flag=false;
        let tempValidationRules={}
        tempValidationRules['secretAnswer']=validateSecretAnswer(secretAnswer);
        tempValidationRules['password']=validatePassword(password);
        tempValidationRules['confirmPassword']=validatePassword(confirmPassword);
        tempValidationRules['passwordMatch']=validatePasswordEquality(password,confirmPassword);

        if(UserType=='Parent')
        tempValidationRules['studentId']=validateNotEmpty(studentId)

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
    const [UserType, setuserType] = useState(getCookie('domockexamUserType'))

    return (
        <div >
            
                <div className="">
                    <StudentDetails></StudentDetails>
                </div>
                <div className="d-flex justify-content-center" >
                 {
                     //showModal && 
                     <div style={{color:'royalblue',fontWeight:'bold'}}>
                        {msgFromServer.message}
                     </div>
                 }
                </div>
             <div className="d-flex justify-content-center">
             
             <Card className="col-md-8 col-12" style={{overflow:'auto'}}>
             <Card.Body>
                    <Card.Title className="text-center"> 
                    Change Password  
                    {
                        UserType=='Parent' && ' For Your Child'
                    }
                    </Card.Title>
                   
                    <Card.Text style={{marginTop:'30px'}} className="">
                        {
                            UserType=='Parent' &&
                        <div class="row smalltext ">
                            <h6 class="px-3 smalltext"> Choose Student : <span className="px-1" style={{color:'red'}}>*</span> </h6>
                            <div class="px-3 paddedInput" >
                                <select class="form-select smalltext mb-2"  name="studentid" value={studentId}
                            onChange={(e)=>{setStudentId(e.target.value);setmsgFromServer({})}} aria-label="Default select example">
                                   <option value="" >---Select Student---</option>
                                   {
                                       UserLogin!=undefined && UserLogin.childrenData!=undefined 
                                       && UserLogin?.childrenData?.map((stud) =>
                                       <option value={stud.id} > {stud.userName} </option>
                                       )
                                   }
                                </select>
                                <span className="err">{validationRules.studentId}</span>
                            </div>
                        </div>
                        }
                        <div class="row smalltext ">
                            <h6 class="px-3 smalltext"> Choose Your Secret Question : <span className="px-1" style={{color:'red'}}>*</span> </h6>
                            <div class="px-3 paddedInput" >
                                <select class="form-select smalltext mb-2"  name="secretquestion" value={secretQuestion}
                            onChange={(e)=>{setSecretQuestion(e.target.value);setmsgFromServer({})}} aria-label="Default select example">
                                    {/* <option selected>Select Secret Question</option> */}
                                    <option value="1">What is your place of birth?</option>
                                    <option value="2">Who is your favourite person?</option>
                                    <option value="3">Where did you go to school?</option>
                                </select>
                            </div>
                        </div>
                        <div class="row smalltext " > 
                            <h6 class="px-3 smalltext">Secret Answer : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput mb-2" >

                                <input type="text" name='secretanswer' style={{width:'100%',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}} value={secretAnswer} 
                            placeholder='Your Secret Answer' onChange={(e)=>{setSecretAnswer(e.target.value);setValidationRules({...validationRules,secretAnswer: validateSecretAnswer(e.target.value)});setmsgFromServer({})}}  />

                                <span className="err">{validationRules.secretAnswer}</span>
                            </div>
                        </div>

                        <div class="row smalltext " > 
                            <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput mb-2" >
                            <span  style={{display:'flex',justifyContent:'space-around'}}>
                                <input ref={Passref} type="password" style={{width:'100%',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}} value={password} 
                            placeholder='Your Password' onChange={(e)=>{setPassword(e.target.value);setValidationRules({...validationRules,password: validatePassword(e.target.value)});setmsgFromServer({})}}  />
                            <PasswordView Passref={Passref} />
                            </span>
                                <span className="err">{validationRules.password}</span>
                            </div>
                        </div>

                        <div class="row smalltext " > 
                            <h6 class="px-3 smalltext">Confirm Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput mb-2" >
                            <span style={{display:'flex',justifyContent:'space-around'}}>
                            <input ref={CPassref} type="password" style={{width:'100%',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}} value={confirmPassword} 
                            placeholder='Your Confirm Password' 
                            onChange={(e)=>{setConfirmPassword(e.target.value);
                            setValidationRules({...validationRules,confirmPassword: validatePassword(e.target.value),passwordMatch:validatePasswordEquality(password,e.target.value)});setmsgFromServer({})}}  />
                            <PasswordView Passref={CPassref} />
                            </span>
                                <span className="err">{validationRules.confirmPassword}</span>
                                <br></br>
                                <span className="err">{validationRules.passwordMatch}</span>
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center"  >
                            <button className="btn btn-primary" onClick={()=>ChangePassword()} >Change Password</button>
                        </div>

                    </Card.Text>

            </Card.Body>
           
             </Card>
             
        </div>
                 
             
        </div>
    )
}

export default ChangePassword
