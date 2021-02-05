import React from 'react';
import { Form, Label, Input } from 'reactstrap';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
/*import { ToLogInSuccess } from './actions';
import { replace } from 'connected-react-router';*/
import './UserForm.scss'
import { Alert } from 'antd';
import { ToRegisterThunk } from './thunks';
import { push } from 'connected-react-router';
interface IRegistrationForm{
    username:string,
    password:string,
    email:string,
}
const Registration:React.FC=() => {
    const {register,handleSubmit,errors} = useForm<IRegistrationForm>({
        defaultValues:{
            username:"",
            password:"",
            email:"",
        }
    });
    const dispatch=useDispatch();
    const onSubmit = (data:IRegistrationForm)=>{
        //compare with database  if success,add data to database
        // You can do whatever you want in the data here.
        dispatch(ToRegisterThunk(data.username,data.password,data.email))
        dispatch(push('/homepage'))
        //dispatch(ToLogInSuccess(data.username));

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
                        <input type='text' name="password" ref={register({required:true})}/>
                    </Label><br/>
                    <Label>
                        Email:<br/>
                        <input type='email' name="email" ref={register({required:true})}/>
                    </Label><br/>
                    {errors.username&&
                    <Alert
                    message= "Invalid username"
                    type="error"
                    showIcon
                  />
                  }
                  {errors.password&&
                    <Alert
                    message= "Invalid password"
                    type="error"
                    showIcon
                  />
                  }
                  {errors.email&&
                    <Alert
                    message= "Invalid email"
                    type="error"
                    showIcon
                  />
                  }
                    
                    <Input className="FormSubmitButton" type='submit' value="Register" />
                </Form>
        </div>
    )
}
export default Registration;