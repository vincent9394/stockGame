import React from 'react'
import  { IRootState } from './store';
import { useDispatch, useSelector } from 'react-redux'
import {ToLogOutSuccess } from './User/actions';
import { push } from 'connected-react-router';
import SearchBox from './SearchBox';

const NavBar:React.FC=() => {
    const dispatch=useDispatch();
    const isLoggedIn=useSelector((state:IRootState)=>state.login.isLoggedIn);
    const username=useSelector((state:IRootState)=>state.login.username);
    return (
        <div>
            <button onClick={()=>dispatch(push('/homepage'))}>Homepage</button>
            <button onClick={()=>dispatch(push('/selfProfilePage'))}>selfProfilePage</button>
            <button onClick={()=>dispatch(push('/showTheStockBySortingPage'))}>showTheStockBySortingPage</button>
            {username && <p>Hello,{username}</p>}
            <SearchBox/>
            {!isLoggedIn &&<button onClick={()=>dispatch(push('/register'))}>Register</button>}
             {!isLoggedIn &&<button onClick={()=>dispatch(push('/login'))}>Login</button>}
            {isLoggedIn && <button className="Logout" onClick={()=>dispatch(ToLogOutSuccess())}>LogOut</button>}
        </div>
    )
}

export default NavBar

