import React,{useState} from 'react'
import './Helper.css'
function PasswordView(props) {
    const [PassState, setPassState] = useState(true)
    const change = () => {
        if(props.Passref.current.type=="password")
        {
            setPassState(false)
            props.Passref.current.type="text"
        }
        else
        {
            setPassState(true)
            props.Passref.current.type="password"
        }
    }
    return (
        <span onClick={()=>{change()}} >
            
            {
                PassState ?
                <i class="fa fa-eye-slash eye" aria-hidden="true"></i> :
                <i class="fa fa-eye eye" aria-hidden="true"></i>
            }
            
        </span>
    )
}

export default PasswordView
