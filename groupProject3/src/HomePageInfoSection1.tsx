import React from 'react'
import { useSelector } from 'react-redux';
import { IRootState } from './store';
//import { useEffect } from 'react';
//import { useDispatch } from 'react-redux';
//import { ToLoadAllStockThunk } from './Stock/thunks';
const HomePageInfoSection1: React.FC = () => {
    const AllstockID= useSelector((state:IRootState)=>state.stock.AllStockID);
    /*const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(ToLoadAllStockThunk());
      },[dispatch]);*/

    return (
        <div>
            <div className="IndexRowArrangement">
                <div className="ItemColumnArrangement">
                    <div>指數</div>
                    <div>恆生指數</div>
                    <div>恆生科技指數</div>
                </div>
                <div className="ItemColumnArrangement">

                    <div>升跌</div>
                  {+0.002>0 &&  <div className="positiveNumber">+0.002</div>}
                  {+0.002<0 &&  <div className="negativeNumber">+0.002</div>}
                  {-0.004>0 &&  <div className="positiveNumber">-0.004</div>}
                  {-0.004<0 &&  <div className="negativeNumber">-0.004</div>}
                </div>
                <div className="ItemColumnArrangement">
                    <div>升跌(%)</div>
                    {+5>0 &&  <div className="positiveNumber">+5%</div>}
                  {+5<0 &&  <div className="negativeNumber">+5%</div>}
                  {-10>0 &&  <div className="positiveNumber">-10%</div>}
                  {-10<0 &&  <div className="negativeNumber">-10%</div>}
                </div>
                <div className="ItemColumnArrangement">
                    <div>成交金額</div>
                    <div>20億</div>
                    <div>500億</div>
                </div>
                <div className="ItemColumnArrangement">
                    <div>最高</div>
                    <div>3.4</div>
                    <div>150</div>
                </div>
                <div className="ItemColumnArrangement">
                    <div>最低</div>
                    <div>2.5</div>
                    <div>100</div>
                </div>
                <div className="ItemColumnArrangement">
                <div>本週升跌</div>
                {+10>0 &&  <div className="positiveNumber">+10%</div>}
                  {+10<0 &&  <div className="negativeNumber">+10%</div>}
                  {-20>0 &&  <div className="positiveNumber">-20%</div>}
                  {-20<0 &&  <div className="negativeNumber">-20%</div>}
                </div>
            </div>
        </div>
    )
}

export default HomePageInfoSection1
