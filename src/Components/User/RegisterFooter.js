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
        <div>
            <div className="d-flex flex-column align-items-center">
                <div class="form-check ">
                    <input class="form-check-input" type="checkbox" 
                    onChange={()=>setTcChecked(!TcChecked)} value={TcChecked}  id="tcs" />
                    <label class="form-check-label " for="tcs">
                    <span className="px-1 py-2 cursor-pointer" style={{color:'red'}}>*</span>  Accept terms and conditions
                    </label>
                </div>
                <RecaptchaComp verifyHumanCallback={()=>setHuman(true)} />
                {Human && TcChecked ? 
                <button className="btn btn-primary register" onClick={()=>register()} type="submit">Register</button>
                : <button className="btn btn-secondary"  type="button">Register</button>}
            </div>
        </div>
    )
}

export default RegisterFooter
