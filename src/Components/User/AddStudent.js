import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Student from './Student';

function AddStudent() {

    const UserLogin = useSelector(state => state.LoginReducer);
    
    const history = useHistory();

    useEffect(() => {
        if(((UserLogin.username=='undefined' && UserLogin.value?.token=='undefined')))  
           {
              history.push('/login');
           }
        if(UserLogin.userType!='Parent')
        {
            history.push('/home');
        }
       }, []);

  return (<div>
        <div style={{padding:'30px'}}>
            <Student AddStudent={true} />
        </div>
    </div>);
}

export default AddStudent;
