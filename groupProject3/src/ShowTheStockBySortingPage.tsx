import React from 'react'
import ActionBar from './ActionBar'
import StatusBar from './StatusBar'
import './Sorting.scss'
import HomePageInfoSection2 from './HomePageInfoSection2'
const ShowTheStockBySortingPage:React.FC=()=>{
    return (
        <div className="SortingMainContent">
            <StatusBar/>
            <div className="CenterInfoDiv">
            <HomePageInfoSection2/>
            </div>
            <ActionBar/>
        </div>
    )
}

export default ShowTheStockBySortingPage
