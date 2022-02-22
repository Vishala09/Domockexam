import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings'

function StudentDetails() {
    
    const UserLogin = useSelector(state => state.LoginReducer);

    const [UserType, setuserType] = useState(getCookie('domockexamUserType'));

    return (
        <div style={{marginTop:'150px',marginBottom:'50px',marginLeft:'50px'}}>
           
            {
                UserType=='Parent' ?
            
            <div className='row' >
                  
                     {
                           UserLogin.childrenData.map((stud,i)=>
                           <div className='col-md-6'>
                           <Card.Title className="text-primary"> Student {i+1}  Details  </Card.Title>
                    
                              <Card.Text style={{marginTop:'10px'}} className="">
                              <div>
                                    <div className="row">
                                       <div className="col-3">User Name</div>  
                                       <div className="col-8">{stud.userName}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">Student ID</div>  
                                       <div className="col-8">{stud.id}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">User Type</div>  
                                       <div className="col-8">Minor</div>
                                    </div>

                                    <div className="row">
                                       <div className="col-3">First Name</div>  
                                       <div className="col-8">{stud.firstName}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">Last Name</div>  
                                       <div className="col-8">{stud.lastName}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">Gender</div>  
                                       <div className="col-8">{stud.gender}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">Grade</div>  
                                       <div className="col-8">{stud.grade}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">District</div>  
                                       <div className="col-8">{stud.studentDistrict}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">Institution</div>  
                                       <div className="col-8">{stud.institution}</div>
                                    </div>
                                    <div className="row">
                                       <div className="col-3">Languages Known</div>  
                                       <div className="col-8">{stud.languagesKnown}</div>
                                    </div>
                                 </div>

                              </Card.Text>
                              <hr></hr>
                           </div>
                           )
                     }
                    
            </div>
            :
            <div style={{margin:window.screen.width>770?'100px 50px 50px 50px':''}}>
                    <Card.Title className="text-primary"> My Details  </Card.Title>
                    
                    <Card.Text style={{marginTop:'30px'}} className="">
                    <div>
                        <div className="row">
                            <div className="col-6">User Name</div>  
                            <div className="col-6">{UserLogin.studentData.username}</div>
                         </div>
                         <div className="row">
                            <div className="col-6">Student ID</div>  
                            <div className="col-6">{UserLogin.studentData.studentId}</div>
                         </div>
                         <div className="row">
                            <div className="col-6">User Type</div>  
                            <div className="col-6">{UserLogin.studentData?.roles?.join("")}</div>
                         </div>

                         <div className="row">
                            <div className="col-6">First Name</div>  
                            <div className="col-6">{UserLogin.studentData.firstName}</div>
                         </div>
                         <div className="row">
                            <div className="col-6">Last Name</div>  
                            <div className="col-6">{UserLogin.studentData.lastName}</div>
                         </div>
                         <div className="row">
                            <div className="col-6">District</div>  
                            <div className="col-6">{UserLogin.studentData.district}</div>
                         </div>
                         <div className="row">
                            <div className="col-6">Institution</div>  
                            <div className="col-6">{UserLogin.studentData.institution}</div>
                         </div>
                         <div className="row">
                            <div className="col-6">Languages Known</div>  
                            <div className="col-6">{UserLogin.studentData.languageKnown}</div>
                         </div>
                     </div>

                    </Card.Text>
            
            </div>
            }
        </div>
    )
}

export default StudentDetails
