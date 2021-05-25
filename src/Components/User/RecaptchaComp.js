import React,{useRef, useState,useEffect} from 'react'
//import Recaptcha from 'react-google-invisible-recaptcha'
import Recaptcha from 'react-recaptcha'

function RecaptchaComp(props) {
    var callback = function () {
        console.log('Done!!!!');
        return true;
      };
    var verifyCallback = function (response) {
        console.log('vcb',response);
      };

    return (
        <div>
            <Recaptcha
                sitekey="6LeC8eoaAAAAAEwh0OPhVpwgs4tkCOHmB6XsCpq_"
                render="explicit"
                verifyCallback={()=>props.verifyHumanCallback()}
                onloadCallback={() => callback()}
            />
        </div>
    )
}

export default RecaptchaComp
