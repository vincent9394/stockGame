import React from 'react'
import './HomePageInfo1.scss'
import {PushpinOutlined} from '@ant-design/icons';
import HomePageStockRow from './HomePageStockRow';
const HomePageInfoSection2:React.FC=()=>{
    //const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.AllStockID);
    let AllStockInfoArray=[{id:'1',name:"this"},{id:'2',name:"that"}]


    return (
        <div>
                <div className="IndexRowArrangement">
                    <div>指數</div>
                    <div>升跌</div>
                    <div>升跌(%)</div>
                    <div>成交金額</div>
                    <div>最高</div>
                    <div>最低</div>
                    <div>本週升跌</div>
                    <div>關注</div>
                </div>
                
                <div className="ItemRowArrangement">
                    <div>恆生指數</div>
                  {+0.002>0 &&  <div className="positiveNumber">+0.002</div>}
                  {+0.002<0 &&  <div className="negativeNumber">+0.002</div>}
                  {+5>0 &&  <div className="positiveNumber">+5%</div>}
                  {+5<0 &&  <div className="negativeNumber">+5%</div>}
                  <div>20億</div>
                  <div>3.4</div>
                  <div>2.5</div>
                  {+10>0 &&  <div className="positiveNumber">+10%</div>}
                  {+10<0 &&  <div className="negativeNumber">+10%</div>}
                  <div className="watchListButton"><PushpinOutlined style={{fontSize:'30px',color:'white'}}/></div>
                </div>


                  <div className="ItemRowArrangement">
                  <div>恆生科技指數</div>
                  {-0.004>0 &&  <div className="positiveNumber">-0.004</div>}
                  {-0.004<0 &&  <div className="negativeNumber">-0.004</div>}
                  {-10>0 &&  <div className="positiveNumber">-10%</div>}
                  {-10<0 &&  <div className="negativeNumber">-10%</div>}
                  <div>500億</div>
                  <div>150</div>
                  <div>100</div>
                  {-20>0 &&  <div className="positiveNumber">-20%</div>}
                  {-20<0 &&  <div className="negativeNumber">-20%</div>}
                  <div className="watchListButton"><PushpinOutlined style={{fontSize:'30px'}}/></div>
                  </div>

                  {AllStockInfoArray.map(
                      (StockInfo,index)=>{
                      return<HomePageStockRow key={index} value={index} Content={StockInfo} />
                  }
                  )}
        </div>
    )

}

export default HomePageInfoSection2
