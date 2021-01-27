import {ILoginState} from './state';
import {ILoginActions} from './actions';

const initialState={
    isLoggedIn:false,
    username:null,
}
export const LoginReducers = (state:ILoginState = initialState,action:ILoginActions)=>{
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                username:action.username,
                isLoggedIn:action.isLoggedIn,
            }
            case "LOGOUT":
            return {
                ...state,
                username:action.username,
                isLoggedIn:action.isLoggedIn,
            }
            case "REGISTER":
            return {
                ...state,
                username:action.username,
                isLoggedIn:action.isLoggedIn,
            }
        default:
            return state
    }
}
