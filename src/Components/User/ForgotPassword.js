import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from '../HelperComps/Popup';
import {validateEmail,validatePassword,validateUsername} from '../HelperFunctions/Validations'


function ForgotPassword() {
      
    const [emailText, setemailText] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const [showModal, setshowModal] = useState(false);
    const forgotPassword = () => {
        let valid  = validate();
        if(valid){
            dispatch({type:'FORGOT_PASSWORD_REQUESTED',payload:{email:emailText}});
            setshowModal(true);
        }
        else
        {
            alert('Please enter a valid email')
        }
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
        setshowModal(clickedclose);
    }

    let [validationRules,setValidationRules] = useState({
        email:""
    });

    let validate = () => {

        let flag=false;
        let tempValidationRules={}
        tempValidationRules['email']=validateEmail(emailText);
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
            {/* {showModal && <Popup from="FP" title="Forgot Password" 
            body="You would have received a link in your mail. Please open it to reset your password. Kindly check your spam folder if not found." 
            returnStateHandler={returnStateHandler} />} */}
             <Card className="col-md-8 col-12" style={{overflow:'auto',marginTop:'100px'}}>
             <Card.Body>
                    <Card.Title className="text-center"> Forgot Your Password?  </Card.Title>
                    
                    <Card.Text style={{marginTop:'30px'}} className="">
                        <p>Please enter your email you use to sign in</p>
                        
                        <div class="row smalltext " > 
                        <h6 class="px-3 smalltext">Email Address : <span className="px-1" style={{color:'red'}}>*</span></h6>
                        <div class="px-3 paddedInput mb-2" >

                            <input type="email" style={{width:'100%',borderTop:'0px',borderLeft:'0px',borderRight:'0px'}} value={emailText} 
                        placeholder='Your Email' onChange={(e)=>{setemailText(e.target.value);setValidationRules({...validationRules,email: validateEmail(e.target.value)})}}  />

                            <span className="err">{validationRules.email}</span>
                        </div>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center"  >
                            <button className="btn btn-primary" onClick={()=>forgotPassword()} >Request Password Reset</button>
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
                <div className="d-flex justify-content-center">
                    {
                        showModal && 
                        <div style={{color:'royalblue'}}>
                                You would have received a link in your mail. Please open it to reset your password. Kindly check your spam folder if not found.
                        </div>
                    }
                </div>
        </div>
    )
}

export default ForgotPassword
