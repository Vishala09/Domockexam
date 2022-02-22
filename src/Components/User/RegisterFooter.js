import React, { useState } from 'react'
import RecaptchaComp from './RecaptchaComp';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from '../HelperComps/Popup';

function RegisterFooter(props) {
    const {StudentData,ParentData} = props;
    const [Human, setHuman] = useState(false);
    const [TcChecked, setTcChecked] = useState(false);
    const msgFromServer = useSelector(state => state.RegisterReducer)
    const msgFromServerStudent = useSelector(state => state.RegisterStudentReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const UserLogin = useSelector(state => state.LoginReducer);
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
            console.log('StudentData',StudentData);
            console.log('ParentData',ParentData);
    
            if(props.AddStudent)
            {
                reqBody =  {
                    "UserId":Number(UserLogin.ID),
                    "StudentFirstName":StudentData.firstname,
                    "StudentLastName":StudentData.surname,
                    "StudentGender":StudentData.gender,
                    "StudentPassword":StudentData.password,
                    "StudentConfirmPassword":StudentData.password,
                    "StudentUserName":StudentData.username,
                    "GradeLevels":Number(StudentData.grade),
                    "StudentDistrict":StudentData.district,
                    "LanguageKnown":"Tamil, English",
                    "Institution":StudentData.school,
                    "RoleRequested":6,
                    "StudentAccountRecoveryAnswers":[{
                        "QuestionId":3,
                        "Answer":StudentData.secretAnswer
                        }]
                }
                 console.log('DISPATCHING REGISTER_STUDENT_REQUESTED...',UserLogin.ID)
                 dispatch({type:'REGISTER_STUDENT_REQUESTED',payload:reqBody});
            }
            else if(props.role==7)  //>18  
            {
                reqBody = {
                    "FirstName":StudentData.firstname,
                    "LastName":StudentData.surname,
                    "UserName":StudentData.email.trim(),
                    "PhoneNumber":"9876543210",
                    "Gender":1,
                    "Role":props.role,
                    "Email":StudentData.email.trim(),
                    "Password":StudentData.password,
                    "ConfirmPassword":StudentData.password,
                    "StudentModel":{
                        "StudentFirstName":StudentData.firstname,
                        "StudentLastName":StudentData.surname,
                        "StudentGender":StudentData.gender,
                        "StudentPassword":StudentData.password,
                        "StudentConfirmPassword":StudentData.password,
                        "StudentUserName":StudentData.email,
                        "RoleRequested":7,
                        "GradeLevels":Number(StudentData.grade),
                        "StudentDistrict":StudentData.district,
                        "LanguageKnown":"Tamil,English",
                        "Institution":StudentData.school,
                        "StudentAccountRecoveryAnswers":[{
                            "QuestionId":Number(StudentData.secretQuestion),
                            "Answer":StudentData.secretAnswer
                            }]
                    }
                };
                console.log('DIspatching...')
                dispatch({type:'REGISTER_USER_REQUESTED',payload:reqBody});
            }
            else if(props.role==2){          //<18   (Parent and Child)
                reqBody = {
                    "FirstName":ParentData.firstname,
                    "LastName":ParentData.surname,
                    "UserName":ParentData.email,
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
                        "RoleRequested":6,
                        "GradeLevels":Number(StudentData.grade),
                        "StudentDistrict":StudentData.district,
                        "LanguageKnown":"Tamil,English",
                        "Institution":StudentData.school,
                        "StudentAccountRecoveryAnswers":[{
                            "QuestionId":Number(StudentData.secretQuestion),
                            "Answer":StudentData.secretAnswer
                            }]
                    }
                };
                console.log('DIspatching...')
                dispatch({type:'REGISTER_USER_REQUESTED',payload:reqBody});
            }
            

        }
        else
        {
            console.log(reg,regp);
            alert('Please check for errors')
        }
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
        history.push('/login');
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
                    props.AddStudent==true ? 
                    msgFromServerStudent.result==false ?
                    <em style={{color:'red'}}><b>Error : {msgFromServerStudent?.message}</b></em>
                    :
                    msgFromServerStudent.result==true ?
                    <>
                        <Popup from="register" title="Successfully Registered" body="Successfully Registered Student. Thankyou for using. " returnStateHandler={returnStateHandler} />
                        <em style={{color:'green'}}>{"Successfully Registered Student. Thankyou for using."}</em>
                    </>
                    :
                    ''
                    :
                    msgFromServer?.error ? 
                    //msgFromServer?.useresult?.errors[0].description
                    <em style={{color:'red'}}><b>Error : {msgFromServer?.error}</b></em>
                   :
                    Object.keys(msgFromServer).length!=0 ?
                    <>
                        <Popup from="register" title="Successfully Registered" body="Successfully Registered.Please activate your account by clicking on the link sent to your email to proceed." returnStateHandler={returnStateHandler} />
                        <em style={{color:'green'}}>{"Successfully Registered.Please activate your account by clicking on the link sent to your email to proceed."}</em>
                    </>
                    :
                    ''
                }
                
            </div>
        </div>
    )
}

export default RegisterFooter
