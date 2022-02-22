
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings'
import Popup from '../HelperComps/Popup';
import { MapChildrenDetails } from '../HelperFunctions/UserSettings';


function AssignedTestCard(props) {
    //id = studentTestId
    const [showModal, setshowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { title , subjectName , gradeName, duration ,testId , assignedOn,assigner ,description , statusName , id ,studentId} = props.test;
    const SearchData = useSelector(state => state.SearchReducer);
    const UserLogin = useSelector(state => state.LoginReducer);
    
    const getTest = () =>{
        dispatch({type:'GET_QUESTIONS_BY_TEST_REQUESTED',payload:{testid:testId}});
        dispatch({type:'GET_TEST_DETAILS_BY_TEST',payload:props.test});
        {
            history.push({pathname:'/test',state:{previousPath:'/assignedtests',StudentTestId:id}});
        }
    }

    const cancelTest = () =>{
       //Cancel
        let reqBody = [{
            "StudentTestId":Number(id),
            "StatusId":5
        }]
        
       console.log('rb-cancelTest',reqBody)
       dispatch({type:'UPDATE_STUDENT_TEST_STATUS_REQUESTED',payload:reqBody});
       setshowModal(true);
    }

    const getHighlightedText = (text) => {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.toString().split(new RegExp(`(${SearchData})`, 'gi'));
        return <span> { parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === SearchData.toLowerCase() ? { fontWeight: 'bold',background:'yellow' } : {} }>
                { part }
            </span>)
        } </span>;
    }

    const returnStateHandler = (clickedyes,clickedclose) => {
        setshowModal(clickedclose);
        window.location.reload();
    }

    const [ChildrenDetailsMap, setChildrenDetailsMap] = useState(MapChildrenDetails(UserLogin));
    useEffect(() => {
        setChildrenDetailsMap(MapChildrenDetails(UserLogin))
    }, [UserLogin])

    return (
        <div  className="col-12 col-md-6 col-lg-4">
            {showModal && <Popup from="AssignedTests" title="Cancelled Test" body={"Cancelled "+title+" Successfully"} returnStateHandler={returnStateHandler} />}
            
        <Card style={{margin:'10px'}} >
        <Card.Header><Card.Title>Title : {getHighlightedText(title)}</Card.Title></Card.Header>
        <Card.Body>
                    
        <Card.Text>
            <div  className='row'><div className='col-5'>Subject</div> <div className='col-1'>:</div> <div className='col-6'>{getHighlightedText(subjectName)}</div></div>
            <div  className='row'><div className='col-5'>Grade</div> <div className='col-1'>:</div> <div className='col-6'>{getHighlightedText(gradeName)}</div></div>
            <div  className='row'><div className='col-5'>Duration</div> <div className='col-1'>:</div> <div className='col-6'>{duration} minutes</div></div>
            <div  className='row'><div className='col-5'>Assigned On</div> <div className='col-1'>:</div> <div className='col-6'>{new Date(assignedOn).toLocaleDateString()} </div></div>
            <div  className='row'><div className='col-5'>Description</div> <div className='col-1'>:</div> <div className='col-6'>{description} </div></div>
            <div  className='row'><div className='col-5'>Test Status</div> <div className='col-1'>:</div> <div className='col-6'><b>{statusName}</b></div></div>
            <div  className='row'><div className='col-5'>Assigner</div> <div className='col-1'>:</div> <div className='col-6'><b>{assigner==1?'Student':'Parent'}</b> </div></div>
            {
                UserLogin.userType=='Parent' && 
         
            <div  className='row'><div className='col-5'>Student</div> <div className='col-1'>:</div> <div className='col-6'><b>{ChildrenDetailsMap[studentId]?.firstName+' '+ChildrenDetailsMap[studentId]?.lastName}</b> </div></div>
            }
            
            <div style={{fontSize:'11px'}} className='row'><div className='col-5'>Test ID</div> <div className='col-1'>:</div> <div className='col-6'>{testId} </div></div>
            <div style={{fontSize:'11px'}} className='row'><div className='col-5'>StudentTest ID</div> <div className='col-1'>:</div> <div className='col-6'>{id} </div></div>
                          
                    </Card.Text>
                    {
                        UserLogin.userType=='Parent' && ( 
                        statusName=='Initiated' &&
                        <Button variant="primary" onClick={()=>cancelTest()}>Cancel Test</Button>
                        
                        )
                    }
                    {
                        (
                        UserLogin.userType !='Parent' && statusName=='Initiated' &&
                        <Button variant="primary" onClick={()=>getTest()}>Take Test</Button>
                        )
                    }
                    
                </Card.Body>
            </Card>
        </div>
    )
}

export default AssignedTestCard
