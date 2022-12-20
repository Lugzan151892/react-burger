import { useSelector, useDispatch, useStore } from 'react-redux';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../utils/data';
import { getNewAuthToken } from '../utils/user-api';
import { fillUserData, updateAuthToken } from '../services/actions/user';

function ProtectedRoute ({children, path, ...rest}) {

    const isUserAuth = useSelector(store => store.user.userIsAuth); 
    const isMailSend = useSelector(store => store.user.wasPasswordReset); 
    const dispatch = useDispatch();

    useEffect(()=> {      
        let token = getCookie('token');
        console.log(token ? token : false);
        if(token) {
            
        } else {
        console.log('NETU COCKY')
        }
    
    }, [])

    return ( 
        path === '/reset-password' ?               
        <Route
            {...rest}
            render={() =>
                isMailSend ? (
                children
                ) : (
                <Redirect to='/forgot-password'/>
                )
            }
        /> :
        <Route
            {...rest}
            render={() =>
                isUserAuth ? (
                children
                ) : (
                <Redirect to='/login'/>
                )
            }
        />
    )   
}

export default ProtectedRoute;
