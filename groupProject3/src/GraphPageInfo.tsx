import React from 'react'
import { OrderingModal } from './OrderingModal'
import './ActionBar.scss'
const GraphPageInfo:React.FC=()=> {
    return (
        <div>
            This is the place show a stock Info
            <div className="ButtonSet">
            <OrderingModal action="BUY"/>
            <OrderingModal action="SELL"/>
            </div>
        </div>
    )
}

export default GraphPageInfo
