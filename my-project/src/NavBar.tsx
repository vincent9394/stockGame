import React from 'react'
import  { IRootState } from './store';
import { useDispatch, useSelector } from 'react-redux'
import { ToLogInSuccess, ToLogOut } from './Login/actions';
import { push } from 'connected-react-router';

const NavBar:React.FC=() => {
    const dispatch=useDispatch();
    const isLoggedIn=useSelector((state:IRootState)=>state.login.isLoggedIn);
    const username=useSelector((state:IRootState)=>state.login.username);
    return (
        <div>
            <button>Homepage</button>
            <button>Chatroom</button>
            <button>Schedule Planing</button>
            {username && <p>Hello,{username}</p>}
            {!isLoggedIn &&<button onClick={()=>dispatch(push('/register'))}>Register</button>}
             {!isLoggedIn &&<button onClick={()=>dispatch(push('/login'))}>Login</button>}
            {isLoggedIn && <button className="Logout" onClick={()=>dispatch(ToLogOut())}>LogOut</button>}
        </div>
    )
}

export default NavBar

