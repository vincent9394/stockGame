import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
const SelfProfileBlock:React.FC=()=>{
    const Portfolio= useSelector((state:IRootState)=>state.stock.Portfolio);
    const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.CurrentStockInfoArray)
    const dispatch=useDispatch();
    useEffect(() => {
        //dispatch(ToLoadPortfolioThunk())
    },[dispatch,Portfolio,AllStockInfoArray])
    let total=0;
    return (
        <div>
  {Portfolio.map(
                      (PortfolioInfo,index)=>{
                        let ArrayIndex=0;
                                for(let i=0;i<AllStockInfoArray.length;i++){
                                if(AllStockInfoArray[i].stock_symbol===PortfolioInfo.stock_symbol){
                                    ArrayIndex=i;
                                    break;
                                }
                            }
                            total+=(AllStockInfoArray[ArrayIndex].close*PortfolioInfo.shares)
                      return (
                        <div key={'profile_'+index} className="StockInfoSectionArrangement">
                        <div className="FirstLine" style={{color:'yellow'}}>名稱:{PortfolioInfo.stock_symbol}</div>
                    <div>持股量:{PortfolioInfo.shares}股</div>
                    <div>現價:{AllStockInfoArray[ArrayIndex].close && AllStockInfoArray[ArrayIndex].close}</div>
                    <div>總值:{AllStockInfoArray[ArrayIndex].close && PortfolioInfo.shares && AllStockInfoArray[ArrayIndex].close*PortfolioInfo.shares}</div>
                        </div>
                      )
                  }
                  )}

                    <div className="FirstLine" style={{color:'yellow'}}>合計總值 :{total}</div>
                </div>)

}

export default SelfProfileBlock