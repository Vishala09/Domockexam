import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from '../HelperComps/Popup';

function EmailConfirmation() {

    const location= useLocation();

    const [emailText, setemailText] = useState(new URLSearchParams(location.search).get('email'));
    const [tokenText, setTokenText] = useState(new URLSearchParams(location.search).get('token'));

    const history = useHistory();
    const dispatch = useDispatch();

    const [showModal, setshowModal] = useState(false);

    const ConfirmEmailStatus = useSelector(state => state.EmailConfirmationReducer)
    useEffect(() => {
        if(ConfirmEmailStatus==true || ConfirmEmailStatus=='true')
        {
            setshowModal(true);
        }
    }, [ConfirmEmailStatus])

    const confirmEmail = () => {
        {
            dispatch({type:'CONFIRM_EMAIL_REQUESTED',payload:{email:emailText,token:tokenText}});
            setshowModal(true);
        }
    }

    function sendEmail(message) {
        var email = 'info@domockexam.com';
        var subject = 'Enqueries';
        var emailBody = 'Hi, ';
        document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
        setshowModal(clickedclose);
    }
    
    return (
        <div>
            {/* <div className="d-flex justify-content-center"><h4>Email Confirmation</h4></div> */}
            <div className="d-flex justify-content-center" >
                 {
                     showModal && 
                     <div style={{color:'royalblue',fontWeight:'bold'}}>
                         Email Confirmation Successful.Please Log in to continue.
                     </div>
                 }
            </div>
                 
                 {showModal && 
                 <Popup from="NeedPleaseLogin" title="Email Confirmation" body="Email Confirmation Success.Please Login to continue." returnStateHandler={returnStateHandler} />}
             

            <div></div>
            <div className="d-flex justify-content-center" style={{marginTop:'50px'}}>
            
            <Card className="col-md-8 col-12" style={{overflow:'auto'}}>
            <Card.Body>
                   <Card.Title className="text-center"> Email Confirmation </Card.Title>
                   
                   <Card.Text style={{marginTop:'30px'}} className="">
                       <h5 className="text-center">Your registration process is complete. Thankyou for registering with us.</h5>
                       <p className="text-center">Please click verify button to confirm that your Email ID is <b>{emailText}</b> and complete your registration process</p>
                       <div className="d-flex flex-column justify-content-center align-items-center"  >
                           <button className="btn btn-primary" style={{width:'50%',height:'100px',fontSize:'48px',marginTop:'10px'}} onClick={()=>confirmEmail()} >VERIFY</button>
                       </div>

                   </Card.Text>

                   <hr></hr>
                   <div className="text-center">
                        <p>Need Help?</p>
                        <p>Mail us at <b style={{color:'royalblue',cursor:'pointer'}} onClick={()=>sendEmail()}>info@domockexam.com</b> </p>
                   </div>

           </Card.Body>
          
            </Card>
            
       </div>
        </div>
    )
}

export default EmailConfirmation
