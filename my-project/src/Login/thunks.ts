import { Dispatch } from "react";
import { failed, ILoginActions, ToLogInSuccess } from "./actions";

const { REACT_APP_API_BACKEND_SERVER } = process.env

export function ToLogIn(username:string,password:string){
    return async (dispatch:Dispatch<ILoginActions>)=>{
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/login`);
        const result = await res.json();
        if(result.isSuccess){
            if(result.data.username===username&& result.data.password===password)
            dispatch(ToLogInSuccess(result.data.username));
        }else{
            dispatch(failed("TO_LOGIN_FAILED",result.msg))
        }
    }
}
