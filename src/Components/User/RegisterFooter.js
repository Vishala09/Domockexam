import React, { useState } from 'react'
import RecaptchaComp from './RecaptchaComp';
import { useDispatch, useSelector } from 'react-redux';

function RegisterFooter(props) {
    const {StudentData,ParentData} = props;
    const [Human, setHuman] = useState(false);
    const [TcChecked, setTcChecked] = useState(false);
    const msgFromServer = useSelector(state => state.RegisterReducer)
    const dispatch = useDispatch();
    const register = () => {
        let reg = props.validate();
        let regp = true;
        if(props.validateParentData)
        {
            regp = props.validateParentData();
        }
        let reqBody={};
        if(reg && regp)
        {
           // alert('Validation Success');
            console.log('StudentData',StudentData,ParentData);
            if(props.role==6)  //>18
            {
                reqBody = {
                    "FirstName":StudentData.firstname,
                    "LastName":StudentData.surname,
                    "UserName":StudentData.email,
                    "PhoneNumber":"9876543210",
                    "Gender":1,
                    "Role":props.role,
                    "Email":StudentData.email,
                    "Password":StudentData.password,
                    "ConfirmPassword":StudentData.password,
                    "StudentModel":{
                        "StudentFirstName":StudentData.firstname,
                        "StudentLastName":StudentData.surname,
                        "StudentGender":StudentData.gender,
                        "StudentPassword":StudentData.password,
                        "StudentConfirmPassword":StudentData.password,
                        "StudentUserName":StudentData.email,
                        "GradeLevels":Number(StudentData.grade),
                        "StudentDistrict":StudentData.district,
                        "LanguageKnown":"Tamil,English",
                        "Institution":StudentData.school
                    }
                };
            }
            else if(props.role==1){          //<18
                reqBody = {
                    "FirstName":ParentData.firstname,
                    "LastName":ParentData.surname,
                    "UserName":StudentData.username,
                    "PhoneNumber":"9876543210",
                    "Gender":ParentData.gender,
                    "Role":props.role,
                    "Email":ParentData.email,
                    "Password":ParentData.password,
                    "ConfirmPassword":ParentData.password,
                    "StudentModel":{
                        "StudentFirstName":StudentData.firstname,
                        "StudentLastName":StudentData.surname,
                        "StudentGender":StudentData.gender,
                        "StudentPassword":StudentData.password,
                        "StudentConfirmPassword":StudentData.password,
                        "StudentUserName":StudentData.username,
                        "GradeLevels":Number(StudentData.grade),
                        "StudentDistrict":StudentData.district,
                        "LanguageKnown":"Tamil,English",
                        "Institution":StudentData.school
                    }
                };
            }
            console.log('DIspatching...')
            dispatch({type:'REGISTER_USER_REQUESTED',payload:reqBody});

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
                {
                    msgFromServer?.useresult ? 
                    <em style={{color:'red'}}><b>Error : {msgFromServer?.useresult?.errors[0].description}</b></em>
                    :
                    Object.keys(msgFromServer).length!=0 ?
                    <em style={{color:'green'}}>{"Successfully Registered.Please Login to continue."}</em>
                    :
                    ''
                }
                
            </div>
        </div>
    )
}

export default RegisterFooter
