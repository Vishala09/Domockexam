
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router , Switch, Route,Link,useHistory} from 'react-router-dom';

function TestCard(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { title , subjectName , gradeName, duration ,id} = props.test;
    //const QuestionsByTest = useSelector(state => state.GetQuestionsByTestReducer.QuestionsByTest)
    
    const getTest = () =>{
        dispatch({type:'GET_QUESTIONS_BY_TEST_REQUESTED',payload:{testid:id}});
        dispatch({type:'GET_TEST_DETAILS_BY_TEST',payload:props.test});
        //if(QuestionsByTest!=undefined)
        {
            history.push({pathname:'/test',state:{previousPath:'/exams'}});
        }
    }

   
    return (
        <div  className="col-12 col-md-6 col-lg-4">
            
           <Card style={{margin:'10px'}} >
                <Card.Header>Title : {title}</Card.Header>
                <Card.Body>
                    <Card.Title>Subject Name : {subjectName} </Card.Title>
                    <Card.Text>
                            <div>Grade Name : {gradeName} </div>
                            <div>Duration : {duration} minutes </div>
                    </Card.Text>
                    <Button variant="primary" onClick={()=>getTest()}>Take Test</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TestCard
