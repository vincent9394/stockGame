import React from 'react'
import './HomePageInfo1.scss'
import InstructionHistoryRow from './InstructionHistoryRow'
const InstructionHistoryPage:React.FC=()=>{ //suppose it have CRUD in here


  let AllInstructionInfoArray=[{id:'1',name:"this"},{id:'2',name:"that"}]
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
                <div className="ItemRowArrangement">
                    <div>AAPL</div>
                  <div>買入</div>
                  <div>3.4</div>
                  <div>3000股</div>
                  <div>2020/11/20</div>
                  <div>成功</div>
                </div>
                <div className="ItemRowArrangement">
                    <div>AAPL</div>
                  <div>賣出</div>
                  <div>2</div>
                  <div>5000股</div>
                  <div>2020/11/20</div>
                  <div>失敗</div>
                </div>
                <div className="ItemRowArrangement">
                    <div>AAPL</div>
                  <div>賣出</div>
                  <div>2</div>
                  <div>4000股</div>
                  <div>2020/11/20</div>
                  <div>正在執行</div>
                </div>
                {AllInstructionInfoArray.map(
                      (StockInfo,index)=>{
                      return<InstructionHistoryRow key={index} value={index} Content={StockInfo} />
                  }
                  )}


        </div>
    )
}

export default InstructionHistoryPage