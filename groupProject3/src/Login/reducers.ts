import { ILoginState } from './state';
import { ILoginActions } from './actions';

const initialState = {
    isLoggedIn: (localStorage.getItem('token') != null),
    username: null,
    msg: ""
}
export const LoginReducers = (state: ILoginState = initialState, action: ILoginActions) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                username: action.username,
                isLoggedIn: action.isLoggedIn,
                msg: ""
            }
        case "LOGOUT":
            return {
                ...state,
                username: action.username,
                isLoggedIn: action.isLoggedIn,
                msg: ""
            }
        case "REGISTER":
            return {
                ...state,
                username: action.username,
                isLoggedIn: action.isLoggedIn,
                msg: ""
            }
        case "TO_LOGIN_FAILED":
            return {
                ...state,
                msg: action.msg
            }
        case "TO_REGISTER_FAILED":
            return {
                ...state,
                msg: action.msg
            }
        default:
            return state
    }
}
