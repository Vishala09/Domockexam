import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Popup from '../HelperComps/Popup';
import {validateEmail,validateUsername,validateNotEmpty} from '../HelperFunctions/Validations'
import './Footer.css'

function Footer() {

  const [emailText, setemailText] = useState("");
  const dispatch = useDispatch();

    const [showModal, setshowModal] = useState(false);
    
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

    function onSubmit()
    {
        let emailBody = `
              <h3> Someone just subscribed to our Newsletter. Yayy!! </h3>
              <p><b>Email ID of User</b></p>
              <table style="border: 1px solid black" class="table">
                    <tr> 
                          <td>Email </td>      <td>${emailText} </td> 
                    </tr>
              </table>
        `

         let reqBody = {
              "toEmail":"info@domockexam.com",
              "Subject":"Newsletter ",
              "Body":emailBody
          }

          let valid  = validate();
          if(valid){
              dispatch({type:'SEND_EMAIL_REQUESTED',payload:reqBody});
              setshowModal(true);
          }
          else
          {
              //alert('Please check for validations')
          }
    }

    


  return <div style={{overflow:'hidden'}}>

    {showModal && <Popup from="NEWSLETTER" title="Newsletter" 
            body="Thankyou for subscribing to our Newsletter. We work hard in providing the best to our users." 
            returnStateHandler={returnStateHandler} />}


    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>Our Moto</h6>
            <p class="text-justify">
                We want what's best for our students!
            </p>
          </div>

          <div class="col-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="https://www.domockexam.com/#/exams">Exams</a></li>
              {/* <li><a href="http://scanfcode.com/category/front-end-development/">FAQ</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">Tutor</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Teacher</a></li> */}
            </ul>
          </div>

          <div class="col-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="https://www.domockexam.com/#/home">About Us</a></li>
              <li><a href="https://www.domockexam.com/#/contactUs">Contact Us</a></li>
              {/* <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li> */}
            </ul>
          </div>
        </div>
        <hr></hr>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <h6>Newsletter</h6>
            <p>Stay update with our latest</p>
          </div>
        </div>
        <div class="row">    
          <div className="col-8">
                <input class="form-control" value={emailText} onChange={(e)=>setemailText(e.target.value)} name="EMAIL" placeholder="Enter Email "  type="email" />
                <span className="err">{validationRules.email}</span>
          </div>
          <div className="col-4">
                <button onClick={()=>onSubmit()}  style={{color:'white',background:'gold',width:'100%'}} class="click-btn btn btn-default col-4">
                    {/* <i class="fa fa-arrow-right" aria-hidden="true"></i> */}
                    Subscribe
                </button>
                
          </div>
        </div>
        <hr></hr>
      </div>


      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; {new Date().getFullYear()} All Rights Reserved by  &nbsp;
         <a href="https://www.domockexam.com/#/">DOMOCKEXAM</a>
            </p>
          </div>
            
          <div class="col-md-4 col-sm-6 col-12">
             
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-instagram"></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
  </div>;
}

export default Footer;
