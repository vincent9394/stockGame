import React from 'react'
import ActionBar from './ActionBar'
import StatusBar from './StatusBar'
import './Sorting.scss'
import HomePageInfoSection1 from './HomePageInfoSection1'
const ShowTheStockBySortingPage:React.FC=()=>{
    return (
        <div className="SortingMainContent">
            <StatusBar/>
            <div className="CenterInfoDiv">
            <HomePageInfoSection1/> 
            </div>
            <ActionBar/>
        </div>
    )
}

export default ShowTheStockBySortingPage
