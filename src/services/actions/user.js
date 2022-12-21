import { registerUser, login, getUserData, getNewAuthToken, userLogout, resetPassword, restorePassword } from "../../utils/user-api";
import { setCookie } from "../../utils/data";

export const CREATE_NEW_USER_REQUEST = 'CREATE_NEW_USER_REQUEST';
export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const CREATE_NEW_USER_FAILED = 'CREATE_NEW_USER_FAILED';

export const DATA_USER_REQUEST = 'DATA_USER_REQUEST';
export const DATA_USER_SUCCESS = 'DATA_USER_SUCCESS';
export const DATA_USER_FAILED = 'DATA_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const AUTH_TOKEN_REQUEST = 'AUTH_TOKEN_REQUEST';
export const AUTH_TOKEN_SUCCESS = 'AUTH_TOKEN_SUCCESS';
export const AUTH_TOKEN_FAILED = 'AUTH_TOKEN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const GET_TOKEN_FOR_PASSWORD_REQUEST = 'GET_TOKEN_FOR_PASSWORD_REQUEST';
export const GET_TOKEN_FOR_PASSWORD_SUCCESS = 'GET_TOKEN_FOR_PASSWORD_SUCCESS';
export const GET_TOKEN_FOR_PASSWORD_FAILED = 'GET_TOKEN_FOR_PASSWORD_FAILED';

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

export function userLogIn(url, email, password, callBack) {
    return function(dispatch) {
        dispatch({type: LOGIN_USER_REQUEST});
        login(url, email, password)
            .then(res => {
                if(res && res.success) {
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        userData: res
                    });
                    setCookie('token', res.refreshToken);  
                } else {
                    dispatch({type: LOGIN_USER_FAILED});
                }
            })
            .then(() => callBack())           
            .catch(err => console.log('Произошла ошибка :', err));
    }
}

export function fillUserData(url, token) {
    return function(dispatch) {
        dispatch({type: DATA_USER_REQUEST});
        getUserData(url, token)
            .then(res => {
                if(res && res.success) {
                    dispatch({
                        type: DATA_USER_SUCCESS,
                        userData: res
                    });    
                    console.log(res)                                    
                } else {
                    dispatch({type: DATA_USER_FAILED});
                }
            })
            .catch(err => console.log('Произошла ошибка :', err));
    }
}

export function logout(url, token) {
    return function(dispatch) {
        dispatch({type: USER_LOGOUT_REQUEST});
        userLogout(url, token)
            .then(res => {
                if(res && res.success) {
                    dispatch({type: USER_LOGOUT_SUCCESS});
                    console.log(res)
                } else {
                    dispatch({type: USER_LOGOUT_FAILED});
                }
            })
            .catch(err => console.log('Произошла ошибка :', err));
    }
}

export function getTokenForPassword(url, email, redirect) {
    return function(dispatch) {
        dispatch({type: GET_TOKEN_FOR_PASSWORD_REQUEST})
        restorePassword(url, email)
            .then(res => {
                if(res && res.success) {
                    dispatch({type: GET_TOKEN_FOR_PASSWORD_SUCCESS});
                    redirect();
                } else {
                    dispatch({type: GET_TOKEN_FOR_PASSWORD_FAILED});
                }
            })
            .catch(err => console.log('Произошла ошибка :', err));
    }
}

export function updateAuthToken(url, token) {
    return function(dispatch) {
        dispatch({type: AUTH_TOKEN_REQUEST});
        getNewAuthToken(url, token)
            .then(res => {                
                if(res && res.success) {
                    dispatch({
                        type: AUTH_TOKEN_SUCCESS,
                        authToken: res.accessToken
                    });
                    dispatch(fillUserData('auth/user', res.accessToken));
                    setCookie('token', res.refreshToken);
                    // console.log(res);                                    
                } else {
                    dispatch({type: AUTH_TOKEN_FAILED});
                }
            })
            .catch(err => console.log('Произошла ошибка :', err));
    }
}
