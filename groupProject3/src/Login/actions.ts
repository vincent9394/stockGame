export function ToLogInSuccess(username:string){
    return{
        type:"LOGIN"as"LOGIN",
        isLoggedIn:true,
        username,
    }
}
export function ToLogOutSuccess(){
    return{
        type:"LOGOUT"as"LOGOUT",
        isLoggedIn:false,
        username:null,
    }
}
export function ToRegisterSuccess(username:string){
    return{
        type:"REGISTER"as"REGISTER",
        isLoggedIn:true,
        username,
    }
}
type FAILED="TO_LOGIN_FAILED"|"TO_LOGOUT_FAILED"|"TO_REGISTER_FAILED"
export function failed(type:FAILED,msg:string){
    return{
        type,msg
    }
}
type LoginActionCreators=typeof ToLogInSuccess|typeof ToLogOutSuccess|typeof ToRegisterSuccess|typeof failed
export type ILoginActions=ReturnType<LoginActionCreators>