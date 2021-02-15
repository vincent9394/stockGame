import React from 'react'
import { useSelector } from 'react-redux';
import Graph from './Graph'
import './ShowStockPage.scss'
import GraphPageInfo from './GraphPageInfo'
import { IRootState } from './store'
import CompanyInfoCollapseBox from './CompanyInfoCollapseBox';
import { Spinner } from 'reactstrap';
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
            {SearchContent[0]===undefined &&<Spinner style={{ width: '3rem', height: '3rem' }} color="secondary" />}    
            {CompanyInfo[0] &&
            <div className="companyInfoSection"> 
            <div className="title">{CompanyInfo[0].name}</div>
            <CompanyInfoCollapseBox/>
            </div>
            }                   
            {SearchContent[0] &&
            <>
            <Graph/>               
            <GraphPageInfo/>
            </>}
        </div>
    )
}

export default ShowStockPage
