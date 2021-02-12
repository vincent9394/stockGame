export function ToLogInSuccess(username:string,accountBalance:number){
    return{
        type:"LOGIN"as"LOGIN",
        isLoggedIn:true,
        username,
        accountBalance,
    }
}
export function ToLogOutSuccess(){
    return{
        type:"LOGOUT"as"LOGOUT",
        isLoggedIn:false,
        username:null,
        accountBalance:null,
    }
}
export function ToRegisterSuccess(username:string,accountBalance:number){
    return{
        type:"REGISTER"as"REGISTER",
        isLoggedIn:true,
        username,
        accountBalance,
    }
}
export function ToClearMsgSuccess(){
    return{
        type: "TO_CLEAR_MSG"as "TO_CLEAR_MSG",
        msg:"",
    }
}
type FAILED="TO_LOGIN_FAILED"|"TO_LOGOUT_FAILED"|"TO_REGISTER_FAILED"
export function failed(type:FAILED,msg:string){
    return{
        type,msg
    }
}
type LoginActionCreators=typeof ToLogInSuccess|typeof ToLogOutSuccess|typeof ToRegisterSuccess|typeof ToClearMsgSuccess|typeof failed
export type ILoginActions=ReturnType<LoginActionCreators>