import { Dispatch } from "react";
import { failed, ILoginActions, ToLogInSuccess, ToLogOutSuccess, ToRegisterSuccess } from "./actions";

const { REACT_APP_API_BACKEND_SERVER } = process.env

export function ToLogInThunk(username:string,password:string){
    return async (dispatch:Dispatch<ILoginActions>)=>{
        const formObject:any={};
          formObject['username']=username;
          formObject['password']=password;
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/login`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
        
            },
            body: JSON.stringify(formObject)
        });
        const result = await res.json();
        if(result.result){                                           //return the username and password if exist
            localStorage.setItem('token',result.token);
            dispatch(ToLogInSuccess(username,result.AccountBalance));
        }else{
            dispatch(failed("TO_LOGIN_FAILED",result.msg))
        }
    }
}
export function ToRegisterThunk(username:string,password:string,email:string,){
    return async (dispatch:Dispatch<ILoginActions>)=>{
        
        const formObject:any={};
          formObject['username']=username;
          formObject['password']=password;
          formObject['email']=email;
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
        
            },
            body: JSON.stringify(formObject)
        });
        const result = await res.json();
        console.log(result)
        if(result.result){ /*successfully add to database*/
            localStorage.setItem('token',result.token);
            dispatch(ToRegisterSuccess(username,result.AccountBalance));
        }else{
            dispatch(failed("TO_REGISTER_FAILED",result.msg))
        }
    }
    
}
export function logout(){
    return async (dispatch:Dispatch<ILoginActions>)=>{
        dispatch(ToLogOutSuccess());
        localStorage.removeItem('token');
    }
}
export function ToGetUserThunk(){
    return async (dispatch:Dispatch<ILoginActions>)=>{
        const res = await fetch(`${REACT_APP_API_BACKEND_SERVER}/getTheUsername`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json();
        if(result.result){                                           //return the username and password if exist
            dispatch(ToLogInSuccess(result.username,result.AccountBalance));
        }else{
            dispatch(failed("TO_LOGIN_FAILED",result.msg))
        }
    }
}