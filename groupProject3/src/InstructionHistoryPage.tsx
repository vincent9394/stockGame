import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './HomePageInfo1.scss'
import InstructionHistoryRow from './InstructionHistoryRow'
import { ToLoadInstructionHistoryThunk } from './Stock/thunks'
import { IRootState } from './store'
const InstructionHistoryPage:React.FC=()=>{ //suppose it have CRUD in here


  const InstructionHistoryArray= useSelector((state:IRootState)=>state.stock.InstructionHistory);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(ToLoadInstructionHistoryThunk())
  }, [dispatch,InstructionHistoryArray])
    return (                                 //
        <div>
            <div className="IndexRowArrangement">
                    <div>股票代號</div>
                    <div>行動</div>
                    <div>指示價</div>
                    <div>股份數量</div>
                    <div>有效期至</div>
                    <div>狀態</div>
                </div>
              
                {InstructionHistoryArray.map(
                      (StockInfo,index)=>{
                      return<InstructionHistoryRow key={index} value={index} Content={StockInfo} />
                  }
                  )}


        </div>
    )
}

export default InstructionHistoryPage