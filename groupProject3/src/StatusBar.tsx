import { push } from 'connected-react-router';
import React from 'react'
import { useDispatch } from 'react-redux';
import './StatusBar.scss'
import { ToLoadWatchListThunk } from './Stock/thunks';
const StatusBar:React.FC=()=> {
    const dispatch=useDispatch();
    return (
        <div className="StatusBar">
            <button onClick={()=>dispatch(ToLoadWatchListThunk())}>Watch List</button>
            <button onClick={()=>dispatch(push('/homepage'))}>Invested</button>
        </div>
    )
}

export default StatusBar
