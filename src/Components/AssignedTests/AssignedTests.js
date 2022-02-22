import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MapChildrenDetails } from '../HelperFunctions/UserSettings';
import AssignedTestCard from './AssignedTestCard';


function AssignedTests() {

    const UserLogin = useSelector(state => state.LoginReducer);
    const history = useHistory();
    useEffect(() => {
        if(((UserLogin.username=='undefined' && UserLogin.value?.token=='undefined')))  
          {
            console.log('/login')
             history.push('/login');
          }
    }, []);

  


    const dispatch = useDispatch();
    const AssignedTestsByParent = useSelector(state => state.GetStudentAssignedTestReducer);

    useEffect(() => {
        {
            dispatch({type:'GET_STUDENT_ASSIGNED_TEST_REQUESTED'});
        }
    }, []);

    return (
        <div className='container-fluid'>
          <div className='d-flex justify-content-center'>  <h3>Assigned Exams</h3> </div>
          <div>
              This page has the list of all tests taken by student. 
              Assigner can be Student/Parent/Teacher.
              Test Status can be Initiated/In Progress/Submitted/Cancelled.
          </div>
        <div className="container-fluid">
            <div className="row">
            {
                (AssignedTestsByParent==undefined) ?
                <div className="d-flex justify-content-center align-items-center" style={{overflow:'hidden'}}> 
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                AssignedTestsByParent.length==0 ?
                <>
                    <div style={{marginTop:'100px'}} className='text-center'>  
                        <div >
                            <h5>No Assigned Test</h5> 
                        </div>
                        <div>
                            <p>Mean while , you can take free tests on your own by going to Exams page</p>
                        </div>
                    </div>
                </>
                :
                AssignedTestsByParent?.map((el) => 
                <>
                    {   
                        <AssignedTestCard  test={el} />
                    }
                </>
                )
            }
            </div>
        </div>
        </div>
    )
}

export default AssignedTests
