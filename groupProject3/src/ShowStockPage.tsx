import React from 'react'
import { useSelector } from 'react-redux';
import Graph from './Graph'
import './ShowStockPage.scss'
import GraphPageInfo from './GraphPageInfo'
import { IRootState } from './store'
import CompanyInfoCollapseBox from './CompanyInfoCollapseBox';
//import NavBar from './NavBar'
/*function graphProps(state:IRootState){
    return state.stock.SearchContent
   }*/
const ShowStockPage:React.FC=()=>{
         //canvasjs   suppose use load specific stock action
         const SearchContent= useSelector((state:IRootState)=>state.stock.SearchContent);
         const CompanyInfo= useSelector((state:IRootState)=>state.stock.SearchCompanyInfo);
    return (                       
        
        <div>
            {CompanyInfo[0] &&
            <div className="companyInfoSection"> 
            <div className="title">{CompanyInfo[0].name}</div>
            <CompanyInfoCollapseBox/>
            </div>
            }        
            {SearchContent[0]===undefined &&<div>is Loading</div>}               
            {SearchContent[0] &&
            <>
            <Graph/>               
            <GraphPageInfo/>
            </>}
        </div>
    )
}

export default ShowStockPage
