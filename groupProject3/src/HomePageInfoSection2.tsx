import React, { useEffect } from 'react'
import './HomePageInfo1.scss'
import HomePageStockRow from './HomePageStockRow';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { ToLoadWatchListThunk } from './Stock/thunks';
const HomePageInfoSection2:React.FC=()=>{
    const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.CurrentStockInfoArray);
    const watchListArray= useSelector((state:IRootState)=>state.stock.WatchListArray);
    const isLoggedIn= useSelector((state:IRootState)=>state.login.isLoggedIn);
    const pathName= useSelector((state:IRootState)=>state.router.location.pathname);
    const dispatch=useDispatch();
    useEffect(() => {
      dispatch(ToLoadWatchListThunk())
    }, [dispatch])
    return (
        <div>
               

                  <div className="IndexRowArrangement">
                    <div>股票代號</div>
                    <div>開市價</div>
                    <div>收市價</div>
                    <div>最高</div>
                    <div>最低</div>
                    <div>成交量</div>
                    <div>成交金額</div>
                  {isLoggedIn&&<div>關注</div>}  
                </div>



                  {AllStockInfoArray.map(
                      (StockInfo,index)=>{
                        let CheckWatchListCondition=false;
                        for(let i=0;i<watchListArray.length;i++){
                          if(StockInfo.stock_symbol===watchListArray[i].stock_symbol){
                              CheckWatchListCondition= true;
                          }
                      }
                      if(pathName==='/showTheStockBySortingPage'){
                        if(CheckWatchListCondition===true){
                          return <HomePageStockRow key={index} value={index} Content={StockInfo} isWatchList={CheckWatchListCondition}/>
                        }else{
                          return <></>
                        }
                      }else{
                      return<HomePageStockRow key={index} value={index} Content={StockInfo} isWatchList={CheckWatchListCondition}/>
                      }
                  }
                  )}
        </div>
    )

}

export default HomePageInfoSection2
/*
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
                  </div>*/