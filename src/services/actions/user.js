import { registerUser, login, resetPassword, restorePassword } from "../../utils/user-api";

export const CREATE_NEW_USER_REQUEST = 'CREATE_NEW_USER_REQUEST';
export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const CREATE_NEW_USER_FAILED = 'CREATE_NEW_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESTORE_PASSWORD = 'RESTORE_PASSWORD';


export function createNewUser(url, name, email, password) {
    return function(dispatch) {
        dispatch({type: CREATE_NEW_USER_REQUEST});
        registerUser(url, name, email, password)
            .then(res => {                
                if(res && res.success) {                    
                    dispatch({
                        type: CREATE_NEW_USER_SUCCESS,
                        userData: res
                    });
                } else {
                    dispatch({type: CREATE_NEW_USER_FAILED});
                }
            })
            .catch(err => console.log('Произошла ошибка :', err));
    }
}

export function userLogIn(url, email, password) {
    return function(dispatch) {
        dispatch({type: LOGIN_USER_REQUEST});
        login(url, email, password)
            .then(res => {
                if(res && res.success) {
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        userData: res
                    });
                } else {
                    dispatch({type: LOGIN_USER_FAILED});
                }
            })
            .catch(err => console.log('Произошла ошибка :', err));
    }
}
