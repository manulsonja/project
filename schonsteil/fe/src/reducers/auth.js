import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    CLEAR_ERROR, 
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    errorMessage: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: payload,
            }
        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
                return {
                    ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                errorMessage: null,
                }
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }
        case PASSWORD_RESET_FAIL:
            return {
                ...state,
                errorMessage:payload,

            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,

            }
        case SUCCESS_MESSAGE:
            return {
                    ...state,
                    errorMessage:'success',
                }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return {
                ...state,
                errorMessage:'prcs',
            }
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state,
                errorMessage:'invalid',
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case CLEAR_ERROR:
            return {
                ...state,
                errorMessage:null,
            }
        default:
            return state
    }
}