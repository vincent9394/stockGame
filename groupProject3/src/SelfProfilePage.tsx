import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SelfProfileInfoRow from './SelfProfileInfoRow'
import { ToLoadPortfolioThunk } from './Stock/thunks';
import { IRootState } from './store';

const SelfProfilePage:React.FC=()=>{ //suppose it have CRUD in here
    const Portfolio= useSelector((state:IRootState)=>state.stock.Portfolio);
    const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.CurrentStockInfoArray)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(ToLoadPortfolioThunk())
    
    },[dispatch,Portfolio,AllStockInfoArray])
    return (                                 //
        <div>
            <div className="IndexRowArrangement">
                    <div>名稱</div>
                    <div>持股量(股)</div>
                    <div>現價</div>
                    <div>總值</div>
                </div>
                
                {Portfolio.map(
                      (PortfolioInfo,index)=>{
                        let ArrayIndex=0;
                                for(let i=0;i<AllStockInfoArray.length;i++){
                                if(AllStockInfoArray[i].stock_symbol===PortfolioInfo.stock_symbol){
                                    ArrayIndex=i;
                                    break;
                                }
                            }
                      return <SelfProfileInfoRow key={index} value={index} refIndex={ArrayIndex} Content={PortfolioInfo} />
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
