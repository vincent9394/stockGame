import React  from 'react'
import {useSelector } from 'react-redux';
import './ActionBar.scss'
import ActionBarButtonSet from './ActionBarButtonSet';
import { IRootState } from './store';
const ActionBar:React.FC=()=> {
    const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.CurrentStockInfoArray);
    const watchListArray= useSelector((state:IRootState)=>state.stock.WatchListArray);
    return (
        <div className="ActionBar">
            {AllStockInfoArray.map(
                      (StockInfo,index)=>{
                        let CheckWatchListCondition=false;
                        for(let i=0;i<watchListArray.length;i++){
                          if(StockInfo.stock_symbol===watchListArray[i].stock_symbol){
                              CheckWatchListCondition= true;
                          }
                      }
                      if(CheckWatchListCondition===true){
                      return<ActionBarButtonSet key={index} value={index} />
                      }else{
                          return <></>
                      }
                  }
                  )}
        </div>

        
    )
}

export default ActionBar