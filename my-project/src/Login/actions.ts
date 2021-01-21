export function ToLogInSuccess(username:string){
    return{
        type:"LOGIN"as"LOGIN",
        isLoggedIn:true,
        username,
    }
}
export function ToLogOut(){
    return{
        type:"LOGOUT"as"LOGOUT",
        isLoggedIn:false,
        username:null,
    }
}
type FAILED="TO_LOGIN_FAILED"
export function failed(type:FAILED,msg:string){
    return{
        type,msg
    }
}
type LoginActionCreators=typeof ToLogInSuccess|typeof ToLogOut |typeof failed
export type ILoginActions=ReturnType<LoginActionCreators>