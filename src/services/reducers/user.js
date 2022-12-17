import { CREATE_NEW_USER_REQUEST, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED } from '../actions/user.js';

const initialState = {

    createNewUserRequest: false,
    createNewUserFailed: false,

    loginUserRequest: false,
    loginUserFailed: false,    

    userIsAuth: false,
    user: {
        email: null,
        name: null
    },
    // userName: null,
    // userEmail: null,
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
                // userName: action.userData.user.name, 
                // userEmail: action.userData.user.email,
                accessToken: action.userData.accessToken,
                refreshToken: action.userData.refreshToken
            };
        case LOGIN_USER_FAILED: 
            return {...state, loginUserRequest: false, loginUserFailed: true};
        default: 
            return state;
    }
}
