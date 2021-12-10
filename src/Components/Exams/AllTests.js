import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TestCard from './TestCard';



function AllTests(props) {
    const dispatch = useDispatch();
    const AllTests = useSelector(state => state.AllTestsReducer)
    const LoggedInUser = useSelector(state => state.LoginReducer)

    useEffect(() => {
        {
            dispatch({type:'GET_ALL_TESTS_REQUESTED'});
        }
    }, []);

    useEffect(() => {
    
        console.log('AllTests',AllTests)
    }, [AllTests]);

    return (
        <div className="container-fluid">
            <div className="row">
            {
                (AllTests==undefined || AllTests.length==0) ?
                <div className="d-flex justify-content-center align-items-center" style={{overflow:'hidden'}}> 
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                :
                AllTests?.map((el) => 
                <>
                    <TestCard  test={el} />
                </>
                )
            }
            </div>
        </div>
    )
}

export default AllTests
