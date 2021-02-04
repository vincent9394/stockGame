//import HomePageInfoSection1 from './HomePageInfoSection1'
import { useEffect, useState } from 'react'
import HomePageInfoSection2 from './HomePageInfoSection2'
export function Homepage(){ 
   const [count, setCount] = useState(0)
   useEffect(() => {
      const HomePageTimer=setTimeout(()=>{
         setCount(count+ 1000)
      },1000)
      return ()=>{
        clearInterval(HomePageTimer)
        console.log(count)
      }
    },[count])    //get Market Info
     return(
        <div>
           <HomePageInfoSection2/>
        </div>
    )
}