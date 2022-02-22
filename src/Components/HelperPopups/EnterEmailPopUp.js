import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import submitsuccess from '../../images/submitsuccess.png';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {validateEmail,validateUsername,validateNotEmpty} from '../HelperFunctions/Validations'

function EnterEmailPopup(props) {
 
  const [show, setShow] = useState(true);
  
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailText, setemailText] = useState("");

    const handleClose = () => {
       setShow(false);
       props.closeHandler();
    };

    let [validationRules,setValidationRules] = useState({
        email:""
    });

    let validate = () => {

        let flag=false;
        let tempValidationRules={}
        tempValidationRules['email']=validateEmail(emailText);
        setValidationRules({...tempValidationRules});

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

    function onSubmit()
    {
        let emailBody = `
              <h3> A user has submitted his/her email. </h3>
              <p><b>Email ID:</b></p>
              <p style="border:2px solid black;"><i style="color:green;font-weight:bold;padding:5px;" >${emailText}</i></p>
        `

         let reqBody = {
              "toEmail":"info@domockexam.com",
              "Subject":"Email ID of a user ",
              "Body":emailBody
          }

          let valid  = validate();
          if(valid){
              dispatch({type:'SEND_EMAIL_REQUESTED',payload:reqBody});
              localStorage.setItem('requestedEmail',emailText);
              handleClose();
              props.submitHandler();
          }
          else
          {
              //alert('Please check for validations')
          }
    }

    return (
             <>
                <Modal show={show} onHide={handleClose} style={{zIndex:5000}}>
                    <Modal.Header closeButton>
                    <Modal.Title>Please <a target='_blank' href="https://www.domockexam.com/#/" >register</a> or share your email below to view answer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        
                        <div class="form-group ">
                            <input type="email"  id="emailaddr"  style={{width:'100%'}} value={emailText} 
                            onChange={(e)=>{setemailText(e.target.value);setValidationRules({...validationRules,email: validateEmail(e.target.value)});}} 
                                class="form-control" placeholder="Email address" />
                            <span className="err">{validationRules.email}</span>
                           
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                        <>
                            <Button variant={(emailText!="" && validationRules.email=="")?'primary':'secondary'} onClick={()=>onSubmit()}>
                                 Submit Email
                            </Button>
                        </>
                        }
                        
                    </Modal.Footer>
                </Modal>
            </>
    )
}

export default EnterEmailPopup
