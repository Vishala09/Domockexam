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
    const herokuSitekey = "6LfW5-4aAAAAAMWz_1Sx7zElvz19Ekfc9h8sdJQV"
    const localSiteKey = "6LeC8eoaAAAAAEwh0OPhVpwgs4tkCOHmB6XsCpq_"
    return (
        <div>
            <Recaptcha
                sitekey={herokuSitekey}
                render="explicit"
                verifyCallback={()=>props.verifyHumanCallback()}
                onloadCallback={() => callback()}
            />
        </div>
    )
}

export default RecaptchaComp
