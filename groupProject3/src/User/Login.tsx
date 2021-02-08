import React from 'react';
import { Form, Label, Input } from 'reactstrap';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { replace } from 'connected-react-router';
import './UserForm.scss'
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import { ToLogInThunk } from './thunks';
import { IRootState } from '../store';
//import { ToLogInThunk } from './Login/thunks';
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
    const isLoggedIn=useSelector((state:IRootState)=>state.login.isLoggedIn);
    const dispatch=useDispatch();
    const onSubmit =(data:ILoginForm)=>{
       // dispatch(ToLogInThunk(data.username,data.password));
        dispatch(ToLogInThunk(data.username,data.password))
        if(isLoggedIn){
        dispatch(replace('/homepage'))
        }
        // You can do whatever you want in the data here.
    }

    return (
        <div className="UserFormMainContent">
                <Form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
                    <Label>
                        Username:<br/>
                        <input type='text' name="username" ref={register({required:true})}/>
                    </Label><br/>
                    <Label>
                        Password:<br/> 
                        <input type='password' name="password" ref={register({required:true})}/>
                    </Label><br/>
                    {(errors.username||errors.password)&&
                    <Alert
                    message="Error"
                    description="Incorrect username/password"
                    type="error"
                    showIcon
                  />
                  }
                    <Input className="FormSubmitButton" type='submit' value="Login" />
                </Form>
          </div>
    )
}
export default Login;
