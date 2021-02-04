import { CallHistoryMethodAction, push } from "connected-react-router";
import { Dispatch } from "react";
import { failed, ILoginActions, ToLogInSuccess, ToLogOutSuccess, ToRegisterSuccess } from "./actions";

const { REACT_APP_API_BACKEND_SERVER } = process.env

export function ToLogInThunk(username:string,password:string){
    return async (dispatch:Dispatch<ILoginActions|CallHistoryMethodAction>)=>{
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/login`,{
            method:"POST",
            body: formData});
        const result = await res.json();
        if(res.status===200){                                           //return the username and password if exist
            localStorage.setItem('token',result.token);
            dispatch(ToLogInSuccess(result.data.username));
            dispatch(push('/'))
        }else{
            dispatch(failed("TO_LOGIN_FAILED",result.msg))
        }
    }
}
export function ToRegisterThunk(username:string,password:string,email:string,address:string,){
    return async (dispatch:Dispatch<ILoginActions>)=>{
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('address', address);
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/register`,{
        method:"POST",
        body: formData});
        const result = await res.json();
        if(result.result){ /*successfully add to database*/
            dispatch(ToRegisterSuccess(result.data.username));
        }else{
            dispatch(failed("TO_LOGIN_FAILED",result.msg))
        }
    }
    
}
export function logout(){
    return async (dispatch:Dispatch<ILoginActions|CallHistoryMethodAction>)=>{
        dispatch(ToLogOutSuccess());
        localStorage.removeItem('token');
        dispatch(push('/'));
    }
}