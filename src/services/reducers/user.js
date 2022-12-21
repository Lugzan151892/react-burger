import { CREATE_NEW_USER_REQUEST, 
        CREATE_NEW_USER_SUCCESS, 
        CREATE_NEW_USER_FAILED, 
        LOGIN_USER_REQUEST, 
        LOGIN_USER_SUCCESS, 
        LOGIN_USER_FAILED,
        DATA_USER_REQUEST,
        DATA_USER_FAILED,
        DATA_USER_SUCCESS,
        AUTH_TOKEN_REQUEST,
        AUTH_TOKEN_FAILED,
        AUTH_TOKEN_SUCCESS,
        USER_LOGOUT_FAILED,
        USER_LOGOUT_REQUEST, 
        USER_LOGOUT_SUCCESS,
        GET_TOKEN_FOR_PASSWORD_FAILED,
        GET_TOKEN_FOR_PASSWORD_REQUEST,
        GET_TOKEN_FOR_PASSWORD_SUCCESS
    } from '../actions/user.js';

const initialState = {

    createNewUserRequest: false,
    createNewUserFailed: false,

    loginUserRequest: false,
    loginUserFailed: false,  
    
    userDataRequest: false,
    userDataFailed: false,

    authTokenRequest: false,
    authTokenFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    getPasswordTokenRequest: false,
    getPasswordTokenFailed: false,

    wasPasswordReset: false,

    userIsAuth: false,
    user: {
        email: null,
        name: null
    },    
    accessToken: null,
    refreshToken: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_USER_REQUEST: 
            return {...state, createNewUserRequest: true};
        case CREATE_NEW_USER_SUCCESS: 
            return {
                ...state, 
                createNewUserRequest: false, 
                createNewUserFailed: false,
                user: action.userData 
            };
        case CREATE_NEW_USER_FAILED: 
            return {...state, createNewUserRequest: false, createNewUserFailed: true};

        case LOGIN_USER_REQUEST: 
            return {...state, loginUserRequest: true};
        case LOGIN_USER_SUCCESS: 
            return {
                ...state, 
                loginUserRequest: false, 
                loginUserFailed: false,
                userIsAuth: true,
                user: {
                    ...state.user,
                    email: action.userData.user.email,
                    name: action.userData.user.name
                },                
                accessToken: action.userData.accessToken,
                refreshToken: action.userData.refreshToken
            };
        case LOGIN_USER_FAILED: 
            return {...state, loginUserRequest: false, loginUserFailed: true};

        case DATA_USER_REQUEST: 
            return {...state, userDataRequest: true};
        case DATA_USER_SUCCESS: 
            return {
                ...state, 
                userDataRequest: false, 
                userDataFailed: false,
                userIsAuth: true,
                user: {
                    ...state.user,
                    email: action.userData.user.email,
                    name: action.userData.user.name
                } 
            };
        case DATA_USER_FAILED: 
            return {...state, userDataRequest: false, userDataFailed: true};

        case AUTH_TOKEN_REQUEST: 
            return {...state, authTokenRequest: true};
        case AUTH_TOKEN_SUCCESS: 
            return {
                ...state, 
                authTokenRequest: false, 
                authTokenFailed: false,   
                accessToken: action.authToken,   
            };
        case AUTH_TOKEN_FAILED: 
            return {...state, authTokenRequest: false, authTokenFailed: true};

        case USER_LOGOUT_REQUEST: 
            return {...state, logoutRequest: true};
        case USER_LOGOUT_SUCCESS: 
            return {
                ...state, 
                logoutRequest: false, 
                logoutFailed: false,   
                userIsAuth: false,
                user: {
                    ...state.user,
                    email: null,
                    name: null
                },
                accessToken: null,
                refreshToken: null 
            };
        case USER_LOGOUT_FAILED: 
            return {...state, logoutRequest: false, logoutFailed: true};

        case GET_TOKEN_FOR_PASSWORD_REQUEST: 
            return {...state, getPasswordTokenRequest: true};
        case GET_TOKEN_FOR_PASSWORD_SUCCESS: 
            return {
                ...state, 
                getPasswordTokenRequest: false, 
                getPasswordTokenFailed: false,   
                wasPasswordReset: true,
            };
        case GET_TOKEN_FOR_PASSWORD_FAILED: 
            return {...state, getPasswordTokenRequest: false, getPasswordTokenFailed: true};

        default:
            return state;
    }
}
