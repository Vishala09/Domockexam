import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PasswordView from '../HelperComps/PasswordView';
import Popup from '../HelperComps/Popup';
import {validateEmail,validatePassword,validateUsername,validatePasswordEquality} from '../HelperFunctions/Validations'

function ResetPassword() {

    const location= useLocation();
   

    const [emailText, setemailText] = useState(new URLSearchParams(location.search).get('Email'));
    const [tokenText, setTokenText] = useState(new URLSearchParams(location.search).get('Token'));
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const history = useHistory();
    const dispatch = useDispatch();
    const Passref = useRef()
    const CPassref = useRef();

    const ResetPasswordStatus = useSelector(state => state.ResetPasswordReducer)
    useEffect(() => {
        console.log(ResetPasswordStatus)
        if((ResetPasswordStatus.status==true || ResetPasswordStatus.status=='true'))
        {
            setshowModal(true);
        }
        else if(ResetPasswordStatus.status=='false' || ResetPasswordStatus.status==false)
        {
            setshowError(true);
        }
    }, [ResetPasswordStatus])

    const [showModal, setshowModal] = useState(false);
    const [showError, setshowError] = useState(false);
    const resetPassword = () => {
        console.log({Email:emailText,Password:password,confirmPassword:password,Token:tokenText})
        let valid  = validate();
        if(valid!=true)
        {
            alert("Please check for errors");
        }
        else
        {
            setshowError(false);
            setshowModal(false);
            dispatch({type:'RESET_PASSWORD_REQUESTED',payload:{Email:emailText,Password:password,confirmPassword:password,Token:tokenText}});
            
            
        }
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
        setshowModal(clickedclose);
    }

    let [validationRules,setValidationRules] = useState({
        email:"",password:"",confirmPassword:"",passwordMatch:""
    });

    let validate = () => {

        setshowError(false);
        setshowModal(false);

        let flag=false;
        let tempValidationRules={}
        tempValidationRules['password']=validatePassword(password);
        tempValidationRules['confirmPassword']=validatePassword(confirmPassword);
        tempValidationRules['passwordMatch']=validatePasswordEquality(password,confirmPassword);

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
        <div >
            <div className="d-flex justify-content-center" >
                 {
                     showModal && 
                     <div style={{color:'royalblue',fontWeight:'bold'}}>
                         Password Resetted Successfully.Please Login to continue.
                     </div>
                 }
                 {
                     showError && 
                     <div style={{color:'red',fontWeight:'bold'}}>
                         {ResetPasswordStatus.errors && ResetPasswordStatus?.errors[0]?.description}
                     </div>
                 }
            </div>
                 
                 {showModal && 
                 <Popup from="NeedPleaseLogin" title="Reset Password" body="Password Resetted Successfully.Please Login to continue." returnStateHandler={returnStateHandler} />}
             
                 {showError && 
                 <Popup from="Error" title="Error Occurred" body="Link has been expired. Please request for Reset Password Link again from Forgot Password Page." returnStateHandler={returnStateHandler} />}
             
             <div className="d-flex justify-content-center">
            
             <Card className="col-md-8 col-12" style={{overflow:'auto'}}>
             <Card.Body>
                    <Card.Title className="text-center"> Reset Password  </Card.Title>
                    
                    <Card.Text style={{marginTop:'30px'}} className="">
                        
                        <div class="row smalltext " > 
                            <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput mb-2" >

                                <input type="email" disabled={true} style={{width:'100%',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}} value={emailText} 
                            placeholder='Your Email' onChange={(e)=>{setemailText(e.target.value);setValidationRules({...validationRules,email: validateEmail(e.target.value)})}}  />

                                <span className="err">{validationRules.email}</span>
                            </div>
                        </div>

                        <div class="row smalltext " > 
                            <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                            <div class="px-3 paddedInput mb-2" >
                            <span  style={{display:'flex',justifyContent:'space-around'}}>
                                <input ref={Passref} type="password" style={{width:'100%',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}} value={password} 
                            placeholder='Your Password' onChange={(e)=>{setPassword(e.target.value);setValidationRules({...validationRules,password: validatePassword(e.target.value)})}}  />
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
                            setValidationRules({...validationRules,confirmPassword: validatePassword(e.target.value),passwordMatch:validatePasswordEquality(password,e.target.value)})}}  />
                            <PasswordView Passref={CPassref} />
                            </span>
                                <span className="err">{validationRules.confirmPassword}</span>
                                <br></br>
                                <span className="err">{validationRules.passwordMatch}</span>
                            </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center"  >
                            <button className="btn btn-primary" onClick={()=>resetPassword()} >Reset Password</button>
                        </div>

                    </Card.Text>

                    <hr></hr>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p></p>
                        <div className=""><i>Back to sign in?</i></div>
                        <button className="btn btn-warning lrbutton" onClick={()=>history.push('/login')}>Login</button>
                        <p></p>
                    </div>

            </Card.Body>
           
             </Card>
             
        </div>
                 
             
        </div>
    )
}

export default ResetPassword
