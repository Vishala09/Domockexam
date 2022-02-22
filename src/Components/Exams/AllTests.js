import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import TestCard from './TestCard';
import {similarity} from '../HelperFunctions/SearchAlgo'
import Popup from '../HelperComps/Popup';
import { Card } from 'react-bootstrap';
import { MapChildrenDetails } from '../HelperFunctions/UserSettings';

import comingsoon1 from '../../images/comingsoon1.jpg';

function AllTests(props) {

    const {selectedData} = props;
    const dispatch = useDispatch();
    const AllTests = useSelector(state => state.AllTestsReducer)
    const SearchData = useSelector(state => state.SearchReducer);
    const [showModal, setshowModal] = useState(false);
    const UserLogin = useSelector(state => state.LoginReducer);
    const [studentId, setStudentId] = useState(UserLogin.childrenData[0].id);
   // const GradewiseSubjects = useSelector(state => state.GetSubjectsReducer);

   const [SelectedExams, setSelectedExams] = useState([]);
  

    const AssignedTest = useSelector(state => state.SaveStudentTestReducer);
    useEffect(() => {
        {
            if(AssignedTest.status==true)
            {
                console.log('AssignedTest',AssignedTest)
                setshowModal(true);
                
                dispatch({type:'RESET_STUDENT_TEST'});
            }
        }
    }, [AssignedTest]);
    

    useEffect(() => {
        {
            dispatch({type:'GET_ALL_TESTS_REQUESTED'});
        }
    }, []);

    useEffect(() => {

        let tempSelectedItems = [];
        console.log('INITIAL ',selectedData,selectedData.length,selectedData.length==0,'SearchData',SearchData)
        if(selectedData.length==0 && SearchData=='')
        {
            setSelectedExams([...AllTests]);
        }
        else
        {
            AllTests?.map((el) => 
                {
                    if((selectedData[1]?.name==undefined || selectedData[1]?.name==el.gradeName) &&
                    (selectedData[2]?.name==undefined || selectedData[2]?.name==el.subjectName) &&
                    (
                        SearchData=="" ||
                        ((similarity(el.subjectName,SearchData)>0.7 ) || (similarity(el.gradeName,SearchData)>0.7 ) || 
                        (similarity(el.title,SearchData)>0.7 ))
                        ||
                        (formatString(el.subjectName).includes(formatString(SearchData)) ||
                        formatString(el.gradeName).includes(formatString(SearchData)) ||
                        formatString(el.title).includes(formatString(SearchData)))
                    ))
                    {
                        tempSelectedItems.push(el);
                    }
                }
            );
            setSelectedExams([...tempSelectedItems]);
        }
    }, [selectedData,SearchData,AllTests])
    

    const [ChildrenDetailsMap, setChildrenDetailsMap] = useState(MapChildrenDetails(UserLogin));
    useEffect(() => {
        setChildrenDetailsMap(MapChildrenDetails(UserLogin))
    }, [UserLogin])

    const returnStateHandler = (clickedyes,clickedclose) => {
        setshowModal(clickedclose);
    }


    function formatString(str)
    {
        str = str.replace(/[^a-zA-Z ]/g, "");
        str = str.toLowerCase();
        return str;
    }

    return (
        <div className="container-fluid" style={{position:'relative'}}>
            {showModal && <Popup from="AllTests" title="Assigned Test" body={"Successfully Assigned "+"to "+ChildrenDetailsMap[studentId]?.userName} returnStateHandler={returnStateHandler} />}
            {
              UserLogin.userType=='Parent' &&
              <Card className="" >
                        <div class="row smalltext ">
                            <h6 class="px-3 smalltext"> Choose Student : <span className="px-1" style={{color:'red'}}>*</span> </h6>
                            <div class="px-3 paddedInput" >
                                <select class="form-select smalltext mb-2"  name="studentid" value={studentId}
                            onChange={(e)=>{setStudentId(e.target.value)}} aria-label="Default select example">
                                   {/* <option value="" >Select student</option> */}
                                   {
                                       UserLogin?.childrenData?.map((stud) =>
                                       <option value={stud.id} > {stud.userName} </option>
                                       )
                                   }
                                </select>
                                
                            </div>
                        </div>
                </Card>
             }
            <div className="row">
            {
                (AllTests==undefined || AllTests.length==0) ?
                <div className="d-flex justify-content-center align-items-center" style={{overflow:'hidden'}}> 
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                (SelectedExams==undefined || SelectedExams.length==0) ?
                <div className='d-flex flex-column justify-content-center align-items-center'>
                        
                        <img src={comingsoon1} height='300px' width='300px' />
                </div>
                :
                SelectedExams.map((el)=>
                <>
                    <TestCard SelectedStudentID={studentId}  test={el} />
                </>
                )
                // AllTests?.map((el) => 
                // <>
                    
                //     {   
                        
                //         (selectedData[1]?.name==undefined || selectedData[1]?.name==el.gradeName) &&
                //         (selectedData[2]?.name==undefined || selectedData[2]?.name==el.subjectName) &&
                //         (
                //             SearchData=="" ||
                //             ((similarity(el.subjectName,SearchData)>0.7 ) || (similarity(el.gradeName,SearchData)>0.7 ) || 
                //             (similarity(el.title,SearchData)>0.7 ))
                //             ||
                //             (formatString(el.subjectName).includes(formatString(SearchData)) ||
                //             formatString(el.gradeName).includes(formatString(SearchData)) ||
                //             formatString(el.title).includes(formatString(SearchData)))
                //         )
                //         &&
                //             <TestCard SelectedStudentID={studentId}  test={el} />
                //     }
                // </>
                // )
            }
            </div>
        </div>
    )
}

export default AllTests
