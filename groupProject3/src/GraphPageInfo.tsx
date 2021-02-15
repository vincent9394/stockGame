import React from 'react'
import { useSelector } from 'react-redux';
import './ActionBar.scss'
import ActionBarButtonSet from './ActionBarButtonSet'
import { IRootState } from './store';
const GraphPageInfo:React.FC=()=> {
    const SearchContent= useSelector((state:IRootState)=>state.stock.SearchContent);
    const AllStockInfoArray = useSelector((state: IRootState) => state.stock.CurrentStockInfoArray);
    const isLoggedIn= useSelector((state:IRootState)=>state.login.isLoggedIn);
    return (
        <div>
            {SearchContent[0] && AllStockInfoArray.length && AllStockInfoArray.map(
                      (StockInfo,index)=>{
                          if(SearchContent[0].stock_symbol===StockInfo.stock_symbol){
                          return(<>
                          <div className="stockPriceInfoSection">
                              <div>收市價:{StockInfo.close}</div>
                              <div>最高:{StockInfo.high}</div>
                              <div>最低:{StockInfo.low}</div>
                              </div>
                          {isLoggedIn && 
                          <div className="ButtonSetDiv">
                          <ActionBarButtonSet key={index} value={index}/>
                          </div>
                          }
        
                          </>)
                          }else{
                              return <></>
                          }
                      }
            )}
        </div>
    )
}

export default GraphPageInfo
