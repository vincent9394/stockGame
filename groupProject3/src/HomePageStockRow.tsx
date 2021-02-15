//import React from 'react'
//import {PushpinOutlined} from '@ant-design/icons';

import { PushpinOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToChangeWatchListThunk } from "./Stock/thunks";
import { IRootState } from "./store";

interface StockInfoProps{  //change props
    value:number,
    Content:{
        stock_symbol:string,
        date:string,
        open:number,
        high:number,
        low:number,
        close:number,
        volume_ltc:number,
        volume_usd:number
    },
    isWatchList:boolean,
}


function HomePageStockRow(props:StockInfoProps) {
    const isLoggedIn= useSelector((state:IRootState)=>state.login.isLoggedIn);
    //sample style :
    //<div>Content.name</div>
    //{Content.now - Content.yesterday close > 0 && <div className="positiveNumber">+0.002</div>}
    //{(new-old)/old *100% > 0 && <div className="positiveNumber">+5%</div>}
    // <div>AllStockInfoArray[props.value].volume</div>
    //<div>Content.high</div>
    //<div>Content.low</div>
    //<div>Content.thisweeklowest</div>
    //{Content.isWatchList && <div className="watchListButton"><PushpinOutlined style={{fontSize:'30px',color:'white'}}/></div>}
    const dispatch=useDispatch();
      const ChangeWatchList=()=>{
          let action='Add';
              if(props.isWatchList){
                  action='Remove'
          }
      dispatch(ToChangeWatchListThunk(props.Content.stock_symbol,action))
      }
    return (
<div className="ItemRowArrangement">
    <div>{props.Content.stock_symbol}</div>
    <div>{props.Content.open}</div>
     <div>{props.Content.close}</div>
    <div>{props.Content.high}</div>
    <div>{props.Content.low}</div>
    <div>{props.Content.volume_ltc}</div>
    <div>{props.Content.volume_usd}</div>
    {isLoggedIn  && <div className="watchListButton" onClick={ChangeWatchList}><PushpinOutlined style={{fontSize:'30px',color:props.isWatchList?'yellow':'rgba(255,255,255,0.9)'}}/></div>}
</div>
        
            /*<div className="ItemRowArrangement">
            <div>{props.value}</div>
            <div>{props.Content.name}</div>
                {+0.002 > 0 && <div className="positiveNumber">+0.002</div>}
                {+0.002 < 0 && <div className="negativeNumber">+0.002</div>}
                {+5 > 0 && <div className="positiveNumber">+5%</div>}
                {+5 < 0 && <div className="negativeNumber">+5%</div>}
                <div>20億</div>
                <div>3.4</div>
                <div>2.5</div>
                {+10 > 0 && <div className="positiveNumber">+10%</div>}
                {+10 < 0 && <div className="negativeNumber">+10%</div>}
                <div className="watchListButton"><PushpinOutlined style={{ fontSize: '30px', color: 'white' }} /></div>
            </div>*/
    );
}

export default HomePageStockRow
