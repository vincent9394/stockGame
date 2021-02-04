import React from 'react'
import SelfProfileInfoRow from './SelfProfileInfoRow'

const SelfProfilePage:React.FC=()=>{ //suppose it have CRUD in here
    let AllSelfProfileInfoArray=[{id:'1',name:"this"},{id:'2',name:"that"}]
    return (                                 //
        <div>
            <div className="IndexRowArrangement">
                    <div>名稱</div>
                    <div>持股量(股)</div>
                    <div>現價</div>
                    <div>總值</div>
                </div>
                <div className="ItemRowArrangement">
                    <div>AAPL</div>
                  <div>3000</div>
                  <div>30</div>
                  <div>90000</div>
                </div>
                <div className="ItemRowArrangement">
                    <div>ABC</div>
                  <div>2000</div>
                  <div>10</div>
                  <div>20000</div>
                </div>

                <div></div>
                <div></div>
                
                {AllSelfProfileInfoArray.map(
                      (StockInfo,index)=>{
                      return<SelfProfileInfoRow key={index} value={index} Content={StockInfo} />
                  }
                  )}
                <div className="IndexRowArrangement">
                    <div>合計</div>
                    <div></div>
                    <div></div>
                    <div>110000</div>
                </div>
                


        </div>
    )
}

export default SelfProfilePage
