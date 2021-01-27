import React, { useState } from 'react'
const SearchBox:React.FC=()=>{
    const [stockChoice, setStockChoice] = useState('stockID');
    const [SearchStockName, setSearchStockName] = useState('');
    const [SearchStockID, setSearchStockID] = useState('');
    const onSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
                                        //fetch stock data from sprint and show it locally (directly by SearchStockID)
    }
    return (
        <div>
             <form onSubmit={onSubmit}>
 <select value={stockChoice} onChange={(e)=>setStockChoice(e.target.value)}>
     <option value="SearchStockID">stockID</option>
     <option value="SearchStockName">stockName</option>
     </select>
     {stockChoice==='SearchStockID'&&  <input type='text' name="stockID" value={SearchStockID} onChange={(e)=>setSearchStockID(e.target.value)}/>}
     {stockChoice==='SearchStockName'&&  <input type='text' name="stockName" value={SearchStockName} onChange={(e)=>setSearchStockName(e.target.value)}/>}
 <input type="submit" value="Submit" />
             </form>
        </div>
    )
}

export default SearchBox
