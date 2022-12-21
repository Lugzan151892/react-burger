import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../utils/data';
import { updateAuthToken } from '../services/actions/user';

function ProtectedRoute ({children, path, forAuthUser, ...rest}) {

    const isUserAuth = useSelector(store => store.user.userIsAuth); 
    const isMailSend = useSelector(store => store.user.wasPasswordReset); 
    const dispatch = useDispatch();

    useEffect(()=> {      
        let token = getCookie('token');
        if(token && !isUserAuth) {
            dispatch(updateAuthToken('auth/token', getCookie('token')));
        } else {
            console.log('NETU COCKY')
        }
    }, []);

    if(forAuthUser) return (
        <Route
            {...rest}
            render={({ location }) =>
                isUserAuth ? (
                children
                ) : (
                    <Redirect                        
                        to={{                            
                            pathname: '/login',                            
                            state: { from: location }
                        }}
                    />
                    )
            }
        />
    )

    if(!forAuthUser) {
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
            render={({ location }) =>
                !isUserAuth ? (
                children
                ) : (
                    <Redirect                        
                        to={{                            
                            pathname: '/',                            
                            state: { from: location }
                        }}
                    />
                    )
            }
        />
        )
    }  
}

export default ProtectedRoute;
