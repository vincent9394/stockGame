import React from 'react'
import './ActionBar.scss'
import { OrderingModal } from './OrderingModal';
const ActionBar:React.FC=()=> {
    return (
        <div className="ActionBar">
            <div className="ButtonSet">
            <OrderingModal action="BUY"/>
            <OrderingModal action="SELL"/>
            </div>
            <div className="ButtonSet">
            <OrderingModal action="BUY" />
            <OrderingModal action="SELL"/>
            </div>
        </div>
    )
}

export default ActionBar