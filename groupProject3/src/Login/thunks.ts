import { Dispatch } from "react";
import { failed, ILoginActions, ToLogInSuccess, ToRegisterSuccess } from "./actions";

const { REACT_APP_API_BACKEND_SERVER } = process.env

export function ToLogInThunk(username:string,password:string){
    return async (dispatch:Dispatch<ILoginActions>)=>{
        const formData = new FormData();
        formData.append('username', username);
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/login`,{
            method:"POST",
            body: formData});
        const result = await res.json();
        if(result.isSuccess){                                           //return the username and password if exist
            if(result.data.username===username&& result.data.password===password)
            dispatch(ToLogInSuccess(result.data.username));
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
        if(result.isSuccess){ /*successfully add to database*/
            dispatch(ToRegisterSuccess(result.data.username));
        }else{
            dispatch(failed("TO_LOGIN_FAILED",result.msg))
        }
    }
}
