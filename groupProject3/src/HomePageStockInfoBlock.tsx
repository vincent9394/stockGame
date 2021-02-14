import React from 'react'
import './HomePageInfo1.scss'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { ToChangeWatchListThunk } from './Stock/thunks';
import { PushpinOutlined } from '@ant-design/icons';
import ActionBarButtonSet from './ActionBarButtonSet';
const HomePageStockInfoBlock: React.FC = () => {
  const AllStockInfoArray = useSelector((state: IRootState) => state.stock.CurrentStockInfoArray);
  const watchListArray = useSelector((state: IRootState) => state.stock.WatchListArray);
  const isLoggedIn = useSelector((state: IRootState) => state.login.isLoggedIn);
  const pathName= useSelector((state:IRootState)=>state.router.location.pathname);
  const dispatch = useDispatch();
  let CheckWatchListCondition: boolean[] = [];

  return (
    <div>
      {AllStockInfoArray !== [] && watchListArray !== [] && AllStockInfoArray.map(
        (StockInfo, index) => {
          CheckWatchListCondition[index] = false;
          for (let i = 0; i < watchListArray.length; i++) {
            if (StockInfo.stock_symbol === watchListArray[i].stock_symbol) {
              CheckWatchListCondition[index] = true;
            }
          }
          if(pathName==='/showTheStockBySortingPage'&& CheckWatchListCondition[index]===false){
return <></>
          }else{
          return (
            <div key={pathName+"_"+index} className="StockInfoSectionArrangement">
              <div className="FirstLine">
                <div style={{ color: 'yellow' }}>股票代號 :{StockInfo.stock_symbol}</div>
                {isLoggedIn &&
                  <div className="watchListDiv">關注:
                    <div className="watchListButton" key={pathName+"_"+index} onClick={() => {
                      let action = 'Add';
                      if (CheckWatchListCondition[index]) {
                        action = 'Remove'
                      }
                      dispatch(ToChangeWatchListThunk(StockInfo.stock_symbol, action))
                      return
                    }}>
                      <PushpinOutlined style={{ fontSize: '30px', color: CheckWatchListCondition[index] ? 'yellow' : 'rgba(255,255,255,0.9)' }} />
                    </div>
                  </div>}
              </div>
              <div>開市價 :{StockInfo.open}</div>
              <div>收市價:{StockInfo.close}</div>
              <div>最高:{StockInfo.high}</div>
              <div>最低:{StockInfo.low}</div>
              <div>成交量:{StockInfo.volume_ltc}</div>
              <div>成交金額:{StockInfo.volume_usd}</div>
              <ActionBarButtonSet key={index} value={index} />
            </div>
            )
          }
        }
      )}



    </div>
  )

}

export default HomePageStockInfoBlock