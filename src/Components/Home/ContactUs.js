import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Popup from '../HelperComps/Popup';
import {validateEmail,validateUsername,validateNotEmpty} from '../HelperFunctions/Validations'

function ContactUs() {

  const [emailText, setemailText] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState({firstName:"",lastName:""});
  

    const dispatch = useDispatch();

    const [showModal, setshowModal] = useState(false);
    

    const returnStateHandler = (clickedyes,clickedclose) => {
        setshowModal(clickedclose);
    }

    let [validationRules,setValidationRules] = useState({
        email:"",body:""
    });

    let validate = () => {

        let flag=false;
        let tempValidationRules={}
        tempValidationRules['email']=validateEmail(emailText);
        tempValidationRules['body']=validateNotEmpty(body);
        
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

    function onSubmit()
    {
        let emailBody = `
              <h3> A query was submitted through Contact Us Form </h3>
              <p><b>Details of User</b></p>
              <table style="border: 1px solid black" class="table">
                    <tr> 
                          <td>First Name </td>  <td>${name.firstName} </td> 
                    </tr>
                    <tr> 
                          <td>Last Name </td>  <td>${name.lastName} </td> 
                    </tr>
                    <tr> 
                          <td>Email </td>      <td>${emailText} </td> 
                    </tr>
              </table>
              <p><b>Message:</b></p>
              <p style="border:2px solid black;"><i style="color:green;font-weight:bold;padding:5px;" >${body}</i></p>
        `

         let reqBody = {
              "toEmail":"info@domockexam.com",
              "Subject":"Contact US ",
              "Body":emailBody
          }

          let valid  = validate();
          if(valid){
              dispatch({type:'SEND_EMAIL_REQUESTED',payload:reqBody});
              setshowModal(true);
          }
          else
          {
              alert('Please check for validations')
          }
    }


  return <div>
      {showModal && <Popup from="Contact US" title="Message Sent" 
            body="We got your message. Our team will get back to you very soon. Thankyou for using our product." 
            returnStateHandler={returnStateHandler} />}

      <div style={{minHeight:'50vh'}} id="contactus">
                        <h3 style={{position:'relative',marginBottom:'20px'}} className='d-flex flex-column align-items-center justify-content-center leftslide'>Contact Us</h3>

                        <div class="site-section bg-light" id="contact-section">
                    <div class="container">
                    <div class="row">
                    <div class="col-12 text-center mb-5">
                    
                    </div>
                    </div>
                    <div class="row mb-5">
                        {/* <div class="mb-4 mb-lg-0 col-md-6 col-lg-4">
                            <p class="mb-0 font-weight-bold text-primary">Address</p>
                            <p class="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>
                        </div>
                        <div class="mb-4 mb-lg-0 col-md-6 col-lg-4">
                            <p class="mb-0 font-weight-bold text-primary">Phone</p>
                            <p class="mb-4"><a href="#">+1 232 3235 324</a></p>
                        </div> */}
                        <div class="mb-4 mb-lg-0 col-md-6 col-lg-4">
                            <p class="mb-0 font-weight-bold text-primary">Email Address</p>
                            <p class="mb-0"><a href="mailto:info@domockexam.com">info@domockexam.com</a></p>
                        </div>
                    </div>
                    <div class="row">
                    <div class="col-lg-12 mb-5">
                    <form action="#" method="post">
                    <div class="form-group row">
                    <div class="col-md-6 mb-3 mb-md-0">
                    <input type="text" class="form-control" value={name.firstName} 
                    onChange={(e)=>setName({...name,firstName:e.target.value})} placeholder="First name" />
                    </div>
                    <div class="col-md-6">
                    <input type="text" class="form-control" value={name.lastName} 
                    onChange={(e)=>setName({...name,lastName:e.target.value})} placeholder="Last name" />
                    </div>
                    </div>
                    <div class="form-group row">
                    <div class="col-md-12">
                      <input type="email" value={emailText} onChange={(e)=>{setemailText(e.target.value)}} class="form-control" placeholder="Email address" />
                      <span className="err">{validationRules.email}</span>
                    </div>
                    </div>
                    <div class="form-group row">
                    <div class="col-md-12">
                      <textarea name="body" id="body" value={body} onChange={(e)=>setBody(e.target.value)} class="form-control" placeholder="Write your message." cols="30" rows="10"></textarea>
                      <span className="err">{validationRules.body}</span>
                    </div>
                    </div>
                    <div class="form-group row">
                    <div class="col-md-6 mr-auto">
                    <input type="button" onClick={()=>onSubmit()} class="btn btn-block btn-primary text-white py-2 px-5" value="Send Message" />
                    </div>
                    </div>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
  </div>;
}

export default ContactUs;
