import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './HomePageInfo1.scss'
import { ToLoadInstructionHistoryThunk } from './Stock/thunks'
import { IRootState } from './store'
const InstructionHistoryBlock:React.FC=()=>{ //suppose it have CRUD in here


  const InstructionHistoryArray= useSelector((state:IRootState)=>state.stock.InstructionHistory);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(ToLoadInstructionHistoryThunk())
  }, [dispatch])
    return (
        <div>
  {InstructionHistoryArray.map(
                      (InstructionHistoryArrayInfo,index)=>{
                        
                      return (
                        <div key={'history_'+index} className="StockInfoSectionArrangement">
                        <div className="FirstLine" style={{color:'yellow'}}>股票代號:{InstructionHistoryArrayInfo.stock_symbol}</div>
                    <div>行動:{InstructionHistoryArrayInfo.transaction_type_id===1?"買入":"賣出"}</div>
                    <div>指示價:{InstructionHistoryArrayInfo.price}</div>
                    <div>股份數量:{InstructionHistoryArrayInfo.shares}股</div>
                    <div>有效期至 {new Intl.DateTimeFormat('default',
                  {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
  timeZone: 'HongKong'
}).format(new Date(InstructionHistoryArrayInfo.exp_datetime))}</div>
                    <div>狀態:{InstructionHistoryArrayInfo.transaction_status_id===1?"失敗":(InstructionHistoryArrayInfo.transaction_status_id===3?"成功":"正在執行")}</div>
                        </div>
                      )
                  }
                  )}

                    
                </div>)

}

export default InstructionHistoryBlock