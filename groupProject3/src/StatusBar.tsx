import { push } from 'connected-react-router';
import React from 'react'
import { useDispatch } from 'react-redux';
import './StatusBar.scss'
const StatusBar:React.FC=()=> {
    const dispatch=useDispatch();
    return (
        <div className="StatusBar">
            <button onClick={()=>dispatch(push('/homepage'))}>Watch List</button>
            <button onClick={()=>dispatch(push('/homepage'))}>Invested</button>
        </div>
    )
}

export default StatusBar
