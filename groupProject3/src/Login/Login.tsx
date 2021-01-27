import React from 'react';
import { Form, Label, Input } from 'reactstrap';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import { replace } from 'connected-react-router';
//import { ToLogInThunk } from './Login/thunks';
import NavBar from '../NavBar';
interface ILoginForm{
    username:string,
    password:string,
}
const Login:React.FC=()=> {
    const {register,handleSubmit,errors} = useForm<ILoginForm>({
        defaultValues:{
            username:"",
            password:"",
        }
    });
    const dispatch=useDispatch();
    const onSubmit =(data:ILoginForm)=>{
       // dispatch(ToLogInThunk(data.username,data.password));
        console.log(data.username)  //suppose to check the username & password
        console.log(data.password)
        dispatch(replace('/homepage'))
        // You can do whatever you want in the data here.
    }

    return (
        <>
        <NavBar/>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label>
                        Username:
                        <input type='text' name="username" ref={register({required:true})}/>
                    </Label><br/>
                    {errors.username&&<p>error in username</p>}
                    <Label>
                        Password:
                        <input type='password' name="password" ref={register({required:true})}/>
                    </Label><br/>
                    {errors.password&&<p>error in password</p>}
                   
                    <Input type='submit' value="Login" />
                </Form>
          </>
    )
}
export default Login;
