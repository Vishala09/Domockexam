import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../HelperComps/Popup';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";



import {pad2} from '../HelperFunctions/NumberFunctions';

function AllReports(props) {
    const dispatch = useDispatch();
    const Reports = useSelector(state => state.ReportsReducer);
    const CalculatedResults = useSelector(state => state.GetCalculatedResultsReducer);
    const testIds = [];
    const [uniqueDatas, setUniqueDatas] = useState({testTitle:[],subject:[]})
    const [showModal, setShowModal] = useState({testTitle:false,subject:false});
    const [filters, setFilters] = useState({testTitle:[],subject:[]});
    const [FilteredReports, setFilteredReports] = useState(Reports);
    const UserLogin = useSelector(state => state.LoginReducer);

    const Option = (props) => {
        return (
          <div>
            <components.Option {...props}>
              <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
              />{" "}
              <label>{props.label}</label>
            </components.Option>
          </div>
        );
      };

    useEffect(() => {
        
        dispatch({type:'GET_STUDENT_TEST_REPORT_REQUESTED'});
      //  dispatch({type:'GET_CALCULATED_RESULT_REQUESTED'});
        // Reports.map((el,index)=>
        // {
        //     testIds.push(el.testId);
        // });
        
    }, []);

    useEffect(() => {
        console.log(Reports);
        getUniqueDatas();
    }, [Reports]);

    const getUniqueDatas = () => {
        let testTitleSet = [];
        let testSubjectSet = [];
        Reports.map((el,index)=>{
            let object = {label:el.title,value:el.title}
            let flagtitle = testTitleSet.find(o => o.value === el.title);
            if(!flagtitle)
            {
                testTitleSet.push(object);
            }
            object = {label:el.subjectName,value:el.subjectName}
            let flagsubject = testSubjectSet.find(o => o.value === el.subjectName);
            if(!flagsubject)
            {
                testSubjectSet.push(object);
            }
        });
        uniqueDatas.testTitle = testTitleSet;
        uniqueDatas.subject = testSubjectSet;
        console.log('uniqueDatas',uniqueDatas)
        setUniqueDatas({...uniqueDatas});
    }

    const filtersSelected = (selected,type) => {
        if(type=='testTitle')
        {
            setFilters({...filters,testTitle:selected}); 
        }
        if(type=='subject')
        {
            setFilters({...filters,subject:selected}); 
        }
    }


    const CustomDropDown = (filtername) => {
       return <ReactSelect
        options={uniqueDatas[filtername]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
            Option
        }}
        onChange={(sel)=>filtersSelected(sel,filtername)}
        allowSelectAll={true}
        value={filters[filtername]}
        />
    } 


    return (
        <div style={{overflow:'auto',width:'100%',position:'relative'}}>
            <h5>Reports of all exams</h5>
            <table class="table table-stripped table-responsive"  >
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#Title  
                        <span style={{marginLeft:'5px'}} onClick={()=>setShowModal({...showModal,testTitle:!showModal.testTitle})}>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </span>
                       
                        </th>
                        <th scope="col" className='text-center'>Subject
                        <span style={{marginLeft:'5px'}} onClick={()=>setShowModal({...showModal,subject:!showModal.subject})}>
                            <i class="fa fa-chevron-down" aria-hidden="true"></i>
                        </span>
                        </th>
                        <th scope="col" className='text-center'>Grade</th>
                        <th scope="col" className='text-center'>Taken On</th>
                        <th scope="col" className='text-center'>Score</th>
                        <th scope="col" className='text-center'>Avg.</th>
                        <th scope="col" className='text-center'>Max.</th>
                        <th scope="col" className='text-center'>Min.</th>
                        <th scope="col" className='text-center'>Z-Score</th>
                        <th scope="col" className='text-center'>Time Taken</th>
                        <th scope="col" className='text-center'>Test ID</th>
                        {
                            UserLogin.userType == 'Parent' &&
                            <th scope="col" className='text-center'>Student Name</th>
                        }
                        
                    </tr>
                    <tr>
                        <th style={{border:'none'}} >{showModal.testTitle && <div  >{CustomDropDown('testTitle')}</div>}</th>
                        <th style={{border:'none'}} >{showModal.subject && <div  >{CustomDropDown('subject')}</div>}</th>
                    </tr>
                </thead>
                <tbody>
            {
                Reports.map((el,index)=>
                <>
                            {   (filters.testTitle.length==0 || (filters.testTitle.length!=0 && filters.testTitle.find(o => o.value === el.title)))
                                &&
                                (filters.subject.length==0 || (filters.subject.length!=0 && filters.subject.find(o => o.value === el.subjectName))) 
                                &&
                                el.studentTestHistories.map((test)=>
                                <tr>
                                    <td>{el.title}</td>
                                    <td>{el.subjectName}</td>
                                    <td>{el.gradeName}</td>
                                    <td>{new Date(test.attemptedAt).toLocaleDateString()}</td>
                                    <td>{Math.floor((test.score/test.totalMarks)*100)}%</td>
                                    <td>{el.studentTestStats?.averageMarkScored}</td>
                                    <td>{el.studentTestStats?.maximumMarkScored}</td>
                                    <td>{el.studentTestStats?.minimumMarkScored}</td>
                                    <td>{test.score}/{test.totalMarks}</td>
                                    <td>{pad2(Math.floor(Number(test.timeTaken) / 60))} : {pad2(Number(test.timeTaken) - Math.floor(Number(test.timeTaken) / 60) * 60)}</td>
                                    
                                    <td>{el.testId}</td>
                                    {
                                        UserLogin.userType == 'Parent' &&
                                        <td>{props.ChildrenDetailsMap[el.studentId]?.firstName +' '+props.ChildrenDetailsMap[el.studentId]?.lastName}</td>
                             
                                    }
                                </tr>
                                )
                            }
                       
                </>
                )
            }
             </tbody>
                    
            </table>
                    
        </div>
    )
}

export default AllReports
