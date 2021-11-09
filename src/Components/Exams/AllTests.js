import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TestCard from './TestCard';



function AllTests() {
    const dispatch = useDispatch();
    const AllTests = useSelector(state => state.AllTestsReducer)

    useEffect(() => {
        dispatch({type:'GET_ALL_TESTS_REQUESTED'});
    }, []);

    useEffect(() => {
        console.log('AllTests',AllTests)
    }, [AllTests]);

    return (
        <div className="container-fluid">
            <div className="row">
            {
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
