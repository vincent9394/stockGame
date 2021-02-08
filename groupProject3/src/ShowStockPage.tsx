import React from 'react'
import Graph from './Graph'
import GraphPageInfo from './GraphPageInfo'
//import { IRootState } from './store'
//import NavBar from './NavBar'
/*function graphProps(state:IRootState){
    return state.stock.SearchContent
   }*/
const ShowStockPage:React.FC=()=>{
         //canvasjs   suppose use load specific stock action
    
    return (                       
        <div>                       
               <Graph />               
            <GraphPageInfo/>
        </div>
    )
}

export default ShowStockPage
