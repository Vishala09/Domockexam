import React, { useRef , useState , useEffect} from 'react'
import Home from './Home'
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import PasswordView from '../HelperComps/PasswordView';
import { useDispatch, useSelector } from 'react-redux';
import {validatePassword} from '../HelperFunctions/Validations';
import {withRouter} from 'react-router-dom'
import Popup from '../HelperComps/Popup';


function Login() {
    const history = useHistory();
    const Passref = useRef();
    const dispatch = useDispatch();
    const [UserData, setUserData] = useState({emailusername:"",password:""});
    const msgFromServer = useSelector(state => state.LoginReducer);
    const [Typing, setTyping] = useState(false);

    let [validationRules,setValidationRules] = useState({
        emailusername:"",
        password:""
    });
    function validateEmail(email){
        if(email=="")
        {
                return "Email or Username cannot be empty"
        }
        else
        {
                return "";
        }
    }
    let validate = () => {
        // console.log(UserData);
         let flag=false;
         let tempValidationRules={}

         tempValidationRules['emailusername']=validateEmail(UserData.email);
         tempValidationRules['password']=validatePassword(UserData.password);
        
         setValidationRules({...tempValidationRules})
         for(let key in tempValidationRules)
         {
             if(tempValidationRules[key]!="")
             {
                 flag=true;
                 break;
             }
         }
       //  console.log('tempValidationRulesStudent',tempValidationRules)
        return !flag
     }
     const loginUser = () => {
        let canLogin = validate();
        let reqBody = {
            "UserName":UserData.emailusername.trim(),
            "Password":UserData.password,
            "RememberMe":true
        }
        if(canLogin)
        {
            setTyping(false);
            
            dispatch({type:'LOGIN_USER_REQUESTED',payload:reqBody});
        }
     }


     const UserLogin = useSelector(state => state.LoginReducer);
      useEffect(() => {
         if(Object.keys(UserLogin).length>0 && ((UserLogin.value?.token!='undefined')) && UserLogin.result!=false)
           { 
               console.log('/exams')
               history.push('/exams');
            }
      }, [UserLogin])

    // bootstrap cols - 5 for text,6 for form,1 for right space(not mentioning) ; 


    const forgotPassword = () => {
        history.push('/forgotpassword')
    }


    return (
        <div>            
            <div style={{}} className="container-fluid">
           
            <div className="row d-flex justify-content-center align-items-center" >
                <Home />
                <div className="col-md-9 d-flex flex-column justify-content-center align-items-center" >
                    <div className="offset-lg-5">
                    
                    </div>
                    <div className="d-flex flex-row text-center justify-content-center align-items-center row">
                    <p></p>
                    <h1 className="col-lg-5 col-12 text-center"> We help you practice for your exam success</h1>
                    
                    <div className="mycard col-lg-6 col-11 mb-3 " >
                        <h3 className="d-flex flex-column justify-content-center align-items-center">Login</h3>
                        <div className="" style={{backgroundColor:'#F5F5F5',border:'1px solid #ced4da',margin:'20px'}}>
                                <div className="mb-2" style={{backgroundColor:'#0D6EFD',color:'white',paddingLeft:'10px'}}>
                                    Login Form
                                </div>

                                <form>
                                <div class="row smalltext" > 
                                    <h6 class="px-3 smalltext">Email Address or Username : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                        <input class="mb-2 form-control smalltext" type="text" name="Email" placeholder="Enter Email Address or Username" 
                                        value={UserData.emailusername}
                                        onChange={(e)=>{setUserData({...UserData,emailusername:e.target.value});setTyping(true);
                                        ;setValidationRules({...validationRules,emailusername: validateEmail(e.target.value)})}}  /> 
                                        <span className="err">{validationRules.emailusername}</span>
                                    </div>
                                </div>
                                <div class="row smalltext" > 
                               
                                    <h6 class="px-3 smalltext">Password : <span className="px-1" style={{color:'red'}}>*</span></h6>
                                    <div class="px-3 paddedInput" >
                                        <span style={{display:'flex',justifyContent:'space-around'}}>
                                            <input ref={Passref} class="mb-2 form-control smalltext" type="password" name="password" placeholder="Enter Password" 
                                            value={UserData.password}
                                            onChange={(e)=>{setUserData({...UserData,password:e.target.value});setTyping(true);
                                            ;setValidationRules({...validationRules,password: validatePassword(e.target.value)})}} /> 
                                            <PasswordView Passref={Passref} />
                                        </span>
                                        <span className="err">{validationRules.password}</span>
                                    </div>
                                
                                </div>
                               
                                </form>
                        </div>
                        <div className="" style={{margin:'20px'}}>
                            <button style={{width:'100%'}} onClick={loginUser} className="btn btn-primary register">Login</button>
                            <em style={{color:'red'}}>{UserLogin?.result==false && Typing==false && 'Login failed.Please try again. ' + UserLogin.message}</em>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-center" style={{margin:'20px'}}>
                                <a onClick={()=>forgotPassword()} className="cursor-pointer linkBlue">Forgot Password</a>
                        </div>

                        <div className="" style={{margin:'20px'}}>
                                <hr></hr>
                        </div>
                        <div className="d-flex flex-column align-items-center mb">
                            <div className=""><i>Don't have an account?</i></div>
                            <button className="btn btn-warning lrbutton" onClick={()=>history.push('')}>Register</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter(Login)
