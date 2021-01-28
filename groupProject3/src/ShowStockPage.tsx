import React from 'react'
import Graph from './Graph'
import GraphPageInfo from './GraphPageInfo'
import NavBar from './NavBar'

const ShowStockPage:React.FC=()=>{
         //canvasjs   suppose use load specific stock action
    return (                       
        <div>                       
            <NavBar/>
            <Graph/>                      
            <GraphPageInfo/>
        </div>
    )
}

export default ShowStockPage
