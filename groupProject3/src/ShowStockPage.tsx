import React from 'react'
import Graph from './Graph'
import GraphPageInfo from './GraphPageInfo'
//import NavBar from './NavBar'
import SampleNavBar from './SampleNavBar'

const ShowStockPage:React.FC=()=>{
         //canvasjs   suppose use load specific stock action
    return (                       
        <div>                       
            <SampleNavBar/>
            <Graph/>                      
            <GraphPageInfo/>
        </div>
    )
}

export default ShowStockPage
