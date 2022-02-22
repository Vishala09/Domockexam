
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';
import {setCookie,getCookie} from '../HelperFunctions/CookieSettings'

function TestCard(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { title , subjectName , gradeName, duration ,id} = props.test;
    const SearchData = useSelector(state => state.SearchReducer);
    const UserLogin = useSelector(state => state.LoginReducer);

    
    
    const getTest = () =>{
        dispatch({type:'GET_QUESTIONS_BY_TEST_REQUESTED',payload:{testid:id}});
        dispatch({type:'GET_TEST_DETAILS_BY_TEST',payload:props.test});
        //if(QuestionsByTest!=undefined)
        {
            // const win = window.open("/", "_blank");
            // win.focus();
          
            history.push({pathname:'/test',state:{previousPath:'/exams'}});
        }
    }

    const assignTest = () =>{
       //Number(getCookie('domockexamUserID')) OR 2=parent
        let reqBody = {
            "StudentId":Number(props.SelectedStudentID),
            "TestId":id,
            "Assigner":2,
            "AssignedOn":new Date().toISOString(),
            "StatusId":1,
            "Active":true
        }
        
       console.log('rb-assignTest',reqBody)
       dispatch({type:'SAVE_STUDENT_TEST_REQUESTED',payload:reqBody});
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

    return (
        <div  className="col-12 col-md-6 col-lg-4">
        
           <Card style={{margin:'10px'}} >
                <Card.Header><Card.Title>Title : {getHighlightedText(title)}</Card.Title></Card.Header>
                <Card.Body>
                    
                    <Card.Text>
                            <div>Subject : {getHighlightedText(subjectName)} </div>
                            <div>Grade : {getHighlightedText(gradeName)} </div>
                            <div>Duration : {duration} minutes </div>
                            <div style={{fontSize:'11px'}}>Test Id : {id}  </div>
                    </Card.Text>
                    {
                        UserLogin.userType=='Parent' ?
                        <Button variant="primary" onClick={()=>assignTest()}>Assign Test</Button>
                        :
                        <Button variant="primary" onClick={()=>getTest()}>Take Test</Button>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default TestCard
