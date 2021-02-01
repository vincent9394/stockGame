import { push } from 'connected-react-router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ToLoadSpecificStockThunk } from './Stock/thunks';
const SearchBox:React.FC=()=>{
    const dispatch=useDispatch();
    const [stockChoice, setStockChoice] = useState('SearchStockID');
    const [SearchStockName, setSearchStockName] = useState('');
    const [SearchStockID, setSearchStockID] = useState('');
    const onSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        ToLoadSpecificStockThunk(SearchStockID,SearchStockName,stockChoice)
        dispatch(push('/showStockPage'))       
                                        //fetch stock data from sprint and show it locally (directly by SearchStockID)
    }
    return (
        <div>
             <form className="SearchForm" onSubmit={onSubmit}>
 <select value={stockChoice} onChange={(e)=>setStockChoice(e.target.value)}>
     <option value="SearchStockID">stockID</option>
     <option value="SearchStockName">stockName</option>
     </select>
     {stockChoice==='SearchStockID'&&  <input type='text' name="stockID" value={SearchStockID} onChange={(e)=>setSearchStockID(e.target.value)}/>}
     {stockChoice==='SearchStockName'&&  <input type='text' name="stockName" value={SearchStockName} onChange={(e)=>setSearchStockName(e.target.value)}/>}
 <input type="submit" value="Search" />
             </form>
        </div>
    )
}

export default SearchBox