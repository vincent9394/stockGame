import React from 'react'
import ActionBar from './ActionBar'
import './Sorting.scss'
import HomePageInfoSection2 from './HomePageInfoSection2'
import MediaQuery from 'react-responsive'
import HomePageStockInfoBlock from './HomePageStockInfoBlock'
const ShowTheStockBySortingPage:React.FC=()=>{
    return (
        <div>
        <MediaQuery minWidth={768} >
        <div className="SortingMainContent">
            <div className="CenterInfoDiv">
            <HomePageInfoSection2/>
            </div>
            <ActionBar/>
        </div>
   </MediaQuery>
   <MediaQuery maxWidth={768}>
   <HomePageStockInfoBlock key={1}/>
   </MediaQuery>
   </div>
    )
}

export default ShowTheStockBySortingPage
