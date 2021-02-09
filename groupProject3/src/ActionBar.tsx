import React from 'react'
import { useSelector } from 'react-redux';
import './ActionBar.scss'
import ActionBarButtonSet from './ActionBarButtonSet';
import { IRootState } from './store';
const ActionBar:React.FC=()=> {
    const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.CurrentStockInfoArray);

    return (
        <div className="ActionBar">
            {AllStockInfoArray.map(
                      (StockInfo,index)=>{
                      return<ActionBarButtonSet key={index} value={index} />
                  }
                  )}
        </div>

        
    )
}

export default ActionBar