import React from 'react';
import { /*Modal, ModalHeader, ModalBody, ModalFooter,*/ Form, Label, Input } from 'reactstrap';
import {useForm} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ToLogInSuccess } from './Login/actions';
import { replace } from 'connected-react-router';
interface IRegistrationForm{
    username:string,
    password:string,
    email:string,
    address:string,
}
const Registration:React.FC=() => {
    const {register,handleSubmit,errors} = useForm<IRegistrationForm>({
        defaultValues:{
            username:"",
            password:"",
        }
    });
    const dispatch=useDispatch();
    const onSubmit = (data:IRegistrationForm)=>{
        //compare with database  if success,add data to database
        // You can do whatever you want in the data here.
        dispatch(ToLogInSuccess(data.username));
        dispatch(replace('/homepage'))

    }
    return (
        /*<Modal isOpen={true}  >
            <ModalHeader>Registration</ModalHeader>
            <ModalBody>*/
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Label>
                        Username:
                        <input type='text' name="username" ref={register({required:true})}/>
                    </Label><br/>
                    {errors.username&&<p>error in username</p>}
                    <Label>
                        Password:
                        <input type='text' name="password" ref={register({required:true})}/>
                    </Label><br/>
                    {errors.password&&<p>error in password</p>}
                    <Label>
                        Email:
                        <input type='email' name="email" ref={register({required:true})}/>
                    </Label><br/>
                    {errors.email&&<p>error in email</p>}
                    <Label>
                        Address:
                        <input type='text' name="address" ref={register({required:true})}/>
                    </Label><br/>
                    {errors.address&&<p>error in address</p>}
                   
                    <Input type='submit' value="Register" />
                </Form>
           /* </ModalBody>
            <ModalFooter>
                <p>this can be use as footer message</p>
            </ModalFooter>
        </Modal>*/
    )
}
export default Registration;