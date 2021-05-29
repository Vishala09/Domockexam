import React, { useState } from 'react'
import RecaptchaComp from './RecaptchaComp';

function RegisterFooter(props) {
    const [Human, setHuman] = useState(false);
    const [TcChecked, setTcChecked] = useState(false);
    const register = () => {
        let reg = props.validate()
        if(reg)
        {
            alert('Registered successfully')
        }
        else
        {
            alert('Please check for errors')
        }
    }
    return (
        <div className="">
            <div className="d-flex flex-column align-items-center">
                <div class="form-check ">
                    <input class="form-check-input" type="checkbox" 
                    onChange={()=>setTcChecked(!TcChecked)} value={TcChecked}  id="tcs" />
                    <label class="form-check-label " for="tcs">
                    <span className="cursor-pointer" style={{color:'red'}}>*</span>  Accept terms and conditions
                    </label>
                </div>
                <RecaptchaComp verifyHumanCallback={()=>setHuman(true)} />
                {Human && TcChecked ? 
                <button className="btn btn-primary register lrbutton" onClick={()=>register()} type="submit">Register</button>
                : <button className="btn btn-secondary lrbutton"  type="button">Register</button>}
                
            </div>
        </div>
    )
}

export default RegisterFooter
