import { registerUser, login, getUserData, getNewAuthToken, userLogout, updateUserData, restorePassword } from "../../utils/user-api";
import { setCookie } from "../../utils/data";
import { AppDispatch, AppThunk } from "../types";
import { TFormData, TUserData, TUser } from "../types/data";

export const CREATE_NEW_USER_REQUEST: 'CREATE_NEW_USER_REQUEST' = 'CREATE_NEW_USER_REQUEST';
export const CREATE_NEW_USER_SUCCESS: 'CREATE_NEW_USER_SUCCESS' = 'CREATE_NEW_USER_SUCCESS';
export const CREATE_NEW_USER_FAILED: 'CREATE_NEW_USER_FAILED' = 'CREATE_NEW_USER_FAILED';

export const DATA_USER_REQUEST: 'DATA_USER_REQUEST' = 'DATA_USER_REQUEST';
export const DATA_USER_SUCCESS: 'DATA_USER_SUCCESS' = 'DATA_USER_SUCCESS';
export const DATA_USER_FAILED: 'DATA_USER_FAILED' = 'DATA_USER_FAILED';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export const AUTH_TOKEN_REQUEST: 'AUTH_TOKEN_REQUEST' = 'AUTH_TOKEN_REQUEST';
export const AUTH_TOKEN_SUCCESS: 'AUTH_TOKEN_SUCCESS' = 'AUTH_TOKEN_SUCCESS';
export const AUTH_TOKEN_FAILED: 'AUTH_TOKEN_FAILED' = 'AUTH_TOKEN_FAILED';

export const USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST' = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS' = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED: 'USER_LOGOUT_FAILED' = 'USER_LOGOUT_FAILED';

export const GET_TOKEN_FOR_PASSWORD_REQUEST: 'GET_TOKEN_FOR_PASSWORD_REQUEST' = 'GET_TOKEN_FOR_PASSWORD_REQUEST';
export const GET_TOKEN_FOR_PASSWORD_SUCCESS: 'GET_TOKEN_FOR_PASSWORD_SUCCESS' = 'GET_TOKEN_FOR_PASSWORD_SUCCESS';
export const GET_TOKEN_FOR_PASSWORD_FAILED: 'GET_TOKEN_FOR_PASSWORD_FAILED' = 'GET_TOKEN_FOR_PASSWORD_FAILED';

export const UPDATE_USER_DATA_REQUEST: 'GET_TOKEN_FOR_PASSWORD_REQUEST' = 'GET_TOKEN_FOR_PASSWORD_REQUEST';
export const UPDATE_USER_DATA_SUCCESS: 'GET_TOKEN_FOR_PASSWORD_SUCCESS' = 'GET_TOKEN_FOR_PASSWORD_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'GET_TOKEN_FOR_PASSWORD_FAILED' = 'GET_TOKEN_FOR_PASSWORD_FAILED';

export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const RESTORE_PASSWORD: 'RESTORE_PASSWORD' = 'RESTORE_PASSWORD';

export interface ICreateNewUserRequest {
    readonly type: typeof CREATE_NEW_USER_REQUEST;
}

export interface ICreateNewUserSuccess {
    readonly type: typeof CREATE_NEW_USER_SUCCESS;
    readonly userData: TUserData;
}

export interface ICreateNewUserFailed {
    readonly type: typeof CREATE_NEW_USER_FAILED;
}

export interface IDataUserRequest {
    readonly type: typeof DATA_USER_REQUEST;
}

export interface IDataUserSuccess {
    readonly type: typeof DATA_USER_SUCCESS;
    readonly userData: TUserData;
}

export interface IDataUserFailed {
    readonly type: typeof DATA_USER_FAILED;
}

export interface ILoginUserRequest {
    readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserSuccess {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly userData: TUserData;
}

export interface ILoginUserFailed {
    readonly type: typeof LOGIN_USER_FAILED;
}

export interface IAuthTokenRequest {
    readonly type: typeof AUTH_TOKEN_REQUEST;
}

export interface IAuthTokenSuccess {
    readonly type: typeof AUTH_TOKEN_SUCCESS;
    readonly authToken: string;
}

export interface IAuthTokenFailed {
    readonly type: typeof AUTH_TOKEN_FAILED;
}

export interface IUserLogoutRequest {
    readonly type: typeof USER_LOGOUT_REQUEST;
}

export interface IUserLogoutSuccess {
    readonly type: typeof USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailed {
    readonly type: typeof USER_LOGOUT_FAILED;
}

export interface IGetTokenForPasswordRequest {
    readonly type: typeof GET_TOKEN_FOR_PASSWORD_REQUEST;
}

export interface IGetTokenForPasswordSuccess {
    readonly type: typeof GET_TOKEN_FOR_PASSWORD_SUCCESS;
    readonly userData?: TUser;
}

export interface IGetTokenForPasswordFailed {
    readonly type: typeof GET_TOKEN_FOR_PASSWORD_FAILED;
}

export interface IUpdateUserDataRequest {
    readonly type: typeof UPDATE_USER_DATA_REQUEST;
}

export interface IUpdateUserDataSuccess {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    readonly userData: TUser;
}

export interface IUpdateUserDataFailed {
    readonly type: typeof UPDATE_USER_DATA_FAILED;
}

export interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
}

export interface IRestorePassword {
    readonly type: typeof RESTORE_PASSWORD;
}

export type TUserActions = ICreateNewUserRequest | ICreateNewUserSuccess | ICreateNewUserFailed | IDataUserRequest | IDataUserSuccess | 
    IDataUserFailed | ILoginUserRequest | ILoginUserSuccess | ILoginUserFailed | IAuthTokenRequest | IAuthTokenSuccess | IAuthTokenFailed | 
    IUserLogoutRequest | IUserLogoutSuccess | IUserLogoutFailed | IGetTokenForPasswordRequest | IGetTokenForPasswordSuccess | IGetTokenForPasswordFailed |
    IUpdateUserDataRequest | IUpdateUserDataSuccess | IUpdateUserDataFailed | IResetPassword | IRestorePassword;

export const createNewUser: AppThunk = (url: string, formData: TFormData, redirect: () => void) => {
    return function(dispatch: AppDispatch) {
        dispatch({type: CREATE_NEW_USER_REQUEST});
        registerUser(url, formData)
            .then(res => {                
                if(res && res.success) {                    
                    dispatch({
                        type: CREATE_NEW_USER_SUCCESS,
                        userData: res
                    });    
                    setCookie('token', res.refreshToken);                
                } else {                                       
                    dispatch({type: CREATE_NEW_USER_FAILED});
                }
            })
            .then(redirect)
            .catch(err => {
                console.log('Произошла ошибка :', err);
                dispatch({type: CREATE_NEW_USER_FAILED});
            });
    }
}

export const userLogIn: AppThunk = (url: string, email: string, password: string, callBack: () => void) => {
    return function(dispatch: AppDispatch) {
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
            .then(callBack)           
            .catch(err => {
                console.log('Произошла ошибка :', err);
                dispatch({type: LOGIN_USER_FAILED});
            });
    }
}

export const fillUserData: AppThunk = (url: string, token: string) => {
    return function(dispatch: AppDispatch) {
        dispatch({type: DATA_USER_REQUEST});
        getUserData(url, token)
            .then(res => {
                if(res && res.success) {
                    dispatch({
                        type: DATA_USER_SUCCESS,
                        userData: res
                    });                                       
                } else {
                    dispatch({type: DATA_USER_FAILED});
                }
            })
            .catch(err => {
                console.log('Произошла ошибка :', err);
                dispatch({type: DATA_USER_FAILED});
            });
    }
}

export const logout: AppThunk = (url: string, token: string) => {
    return function(dispatch: AppDispatch) {
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
            .catch(err => {
                console.log('Произошла ошибка :', err);
                dispatch({type: USER_LOGOUT_FAILED});
            });
    }
}

export const getTokenForPassword: AppThunk = (url: string, email: string, redirect: () => void) => {
    return function(dispatch: AppDispatch) {
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
            .catch(err => {
                console.log('Произошла ошибка :', err);
                dispatch({type: GET_TOKEN_FOR_PASSWORD_FAILED});
            });
    }
}

export const updateAuthToken: AppThunk = (url: string, token: string) => {
    return function(dispatch: AppDispatch | any) {
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
                } else {
                    dispatch({type: AUTH_TOKEN_FAILED});
                }
            })
            .catch(err => {
                console.log('Произошла ошибка :', err);
                dispatch({type: AUTH_TOKEN_FAILED});
            });
    }
}

export const changeUserData: AppThunk = (url: string, token: string, form: { email: string; password: string; name: string; }) => {
    return function(dispatch: AppDispatch | any) {
        dispatch({type: UPDATE_USER_DATA_REQUEST});
        updateUserData(url, token, form)
        .then((res: TUserData)=> {
            if(res && res.success) {
                dispatch({type: UPDATE_USER_DATA_SUCCESS, userData: res.user});   
                dispatch(fillUserData('auth/user', token));
            } else {
                dispatch({type: UPDATE_USER_DATA_FAILED});
            }
        })
        .catch(err => {
            console.log('Произошла ошибка :', err);
            dispatch({type: UPDATE_USER_DATA_FAILED});
        });
    }
}
