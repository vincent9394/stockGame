import React from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from './store'

interface InstructionHistoryProps{  //change props
    value:number,
    Content:{
        stock_symbol:string,
        shares:number
    },
    refIndex:number,
}
function SelfProfileInfoRow(props:InstructionHistoryProps){
    const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.CurrentStockInfoArray)
    return (
        <>{AllStockInfoArray.length>0 &&
        <div className="ItemRowArrangement">
              <div>{props.Content.stock_symbol}</div>
              <div>{props.Content.shares}</div>
              {AllStockInfoArray[props.refIndex].close &&<div>{AllStockInfoArray[props.refIndex].close}</div>}
              <div>{AllStockInfoArray[props.refIndex].close*props.Content.shares}</div>
            </div>
            }
            </>

    )
}

export default SelfProfileInfoRow
