import React from 'react'
import {PushpinOutlined} from '@ant-design/icons';
//import { IRootState } from './store';
//import { useDispatch, useSelector } from 'react-redux';
interface StockInfoProps{  //change props
    value:number,
    Content:{
        id:string,
        name:string
    },
}


function HomePageStockRow(props:StockInfoProps) {
    //const AllStockInfoArray = useSelector((state: IRootState) => state.stock.AllStockID);
    //sample style :
    //<div>Content.name</div>
    //{Content.now - Content.yesterday close > 0 && <div className="positiveNumber">+0.002</div>}
    //{(new-old)/old *100% > 0 && <div className="positiveNumber">+5%</div>}
    // <div>AllStockInfoArray[props.value].volume</div>
    //<div>Content.high</div>
    //<div>Content.low</div>
    //<div>Content.thisweeklowest</div>
    //{Content.isWatchList && <div className="watchListButton"><PushpinOutlined style={{fontSize:'30px',color:'white'}}/></div>}

   /* const dispatch=useDispatch();
    useEffect(()=>{

      },[]);*/

    return (
            <div className="ItemRowArrangement">
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
            </div>
    );
}

export default HomePageStockRow