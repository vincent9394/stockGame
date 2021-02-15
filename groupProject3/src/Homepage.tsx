//import HomePageInfoSection1 from './HomePageInfoSection1'
//import { useEffect, useState } from 'react'
import React from 'react'
import HomePageInfoSection2 from './HomePageInfoSection2'
import HomePageStockInfoBlock from './HomePageStockInfoBlock';
import MediaQuery from 'react-responsive'
export function Homepage(){ 
  /*
   const [count, setCount] = useState(0)
   useEffect(() => {
      const HomePageTimer=setTimeout(()=>{
         setCount(count+ 1000)
      },1000)
      return ()=>{
        clearInterval(HomePageTimer)
        console.log(count)
      }
    },[count])    //get Market Info */
    /*const dispatch=useDispatch();
    useEffect(() => {
    if(isLoggedIn){
      dispatch(ToLoadWatchListThunk())
      }
    })*/
     return(
        <div>
           <MediaQuery minWidth={768} >
           <HomePageInfoSection2/>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
      <HomePageStockInfoBlock key={4}/>
      </MediaQuery>
        </div>
    )
}