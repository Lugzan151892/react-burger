import { useSelector, useDispatch } from '../services/types/hooks';
import { FC, useEffect, ReactNode } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { getCookie } from '../utils/data';
import { updateAuthToken } from '../services/actions/user';
import styles from './Pages.module.css';
import loading from '../images/loading-gif.gif';
import { notForAuthUsers } from '../utils/data';
import { TProtectedRoute } from '../services/types/data';

const ProtectedRoute: FC<TProtectedRoute> = ({ children, path, forAuthUser, ...rest }) => {
    const history = useHistory();
    const { state } = history.location;

    const isUserAuth = useSelector(store => store.user.userIsAuth); 
    const dispatch = useDispatch();
    const isRequest = useSelector(store => store.user.userDataRequest);
    const itIsForNotAuthOnly = notForAuthUsers.some((el) => el === path);

    useEffect(()=> {      
        const token = getCookie('token');
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
    
    if(forAuthUser) {return (       
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
    )} else {        
        return (
            <Route
            {...rest}
            render={() =>
                itIsForNotAuthOnly && isUserAuth ? (
                    <Redirect                        
                        to={ '/' }
                    />
                ) : (
                    <>
                        { children }
                    </>
                )
            }
        />
        ) 
    }  
}

export default ProtectedRoute;
