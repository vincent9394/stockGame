import React from 'react'
import { OrderingModal } from './OrderingModal'
interface StockInfoProps{  //change props
    value:number,
    
}
function ActionBarButtonSet(props:StockInfoProps) {
    return (
        <div className="ButtonSet">
            <OrderingModal  arrayIndex={props.value} action="BUY"/>
            <OrderingModal arrayIndex={props.value} action="SELL"/>
            </div>
    )
}

export default ActionBarButtonSet
