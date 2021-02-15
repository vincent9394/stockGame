import React from 'react'
import { useSelector } from 'react-redux';
import OrderingModal from './OrderingModal'
import { IRootState } from './store';
interface StockInfoProps{  //change props
    value:number,
    
}
function ActionBarButtonSet(props:StockInfoProps) {
    const accountBalance= useSelector((state:IRootState)=>state.login.accountBalance);
    return (
        <div className="ButtonSet">
            <OrderingModal arrayIndex={props.value} action="BUY" AccountBalance={accountBalance}/>
            <OrderingModal  arrayIndex={props.value} action="SELL"  AccountBalance={accountBalance} />
            </div>
    )
}

export default ActionBarButtonSet
