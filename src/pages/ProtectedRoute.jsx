import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { getCookie } from '../utils/data';
import { updateAuthToken } from '../services/actions/user';
import styles from './Pages.module.css';
import loading from '../images/loading-gif.gif';

function ProtectedRoute ({children, path, forAuthUser, ...rest}) {

    const history = useHistory();
    const { state } = history.location;

    const isUserAuth = useSelector(store => store.user.userIsAuth); 
    const isMailSend = useSelector(store => store.user.wasPasswordReset); 
    const dispatch = useDispatch();
    const isRequest = useSelector(store => store.user.userDataRequest);


    useEffect(()=> {      
        let token = getCookie('token');
        if(token && !isUserAuth) {
            dispatch(updateAuthToken('auth/token', getCookie('token')));
        } else {
            console.log('Токен не найден');
        }
    }, []);

    if(isRequest) return (
        <div className={styles.loading_container}>
        <img src={loading} className={styles.loading_image} alt="loading" />
        </div>
    );

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
            render={() =>
                !isUserAuth ? (
                children
                ) : (
                    <Redirect                        
                        to={ state?.from || '/' }
                    />
                )
            }
        />
        )
    }  
}

export default ProtectedRoute;
