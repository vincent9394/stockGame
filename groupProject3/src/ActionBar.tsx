import React from 'react'
import './ActionBar.scss'
import ActionBarButtonSet from './ActionBarButtonSet';
const ActionBar:React.FC=()=> {
    let AllStockInfoArray=[{id:'1',name:"this"},{id:'2',name:"that"}]
    return (
        <div className="ActionBar">
            {ActionBarButtonSet({value:0})}
            {ActionBarButtonSet({value:1})}
            {AllStockInfoArray.map(
                      (StockInfo,index)=>{
                      return<ActionBarButtonSet key={index} value={index} />
                  }
                  )}
        </div>

        
    )
}

export default ActionBar