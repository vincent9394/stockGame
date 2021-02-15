import { ILoginState } from './state';
import { ILoginActions } from './actions';

const initialState = {
    isLoggedIn: (localStorage.getItem('token') != null),
    username: null,
    msg: "",
    accountBalance:null,
}
export const LoginReducers = (state: ILoginState = initialState, action: ILoginActions) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                username: action.username,
                isLoggedIn: action.isLoggedIn,
                accountBalance:action.accountBalance,
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
            case "TO_CLEAR_MSG":
            return {
                ...state,
                msg:"",
            }
        default:
            return state
    }
}
