import React, { useState } from 'react'
const SearchBox:React.FC=()=>{
    const [stockChoice, setStockChoice] = useState('stockID');
    const [stockName, setStockName] = useState('');
    const [stockID, setStockID] = useState('');
    const onSubmit =(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        
        //compare with database  if success,add data to database
        // You can do whatever you want in the data here.
    }
    return (
        <div>
             <form onSubmit={onSubmit}>
 <select value={stockChoice} onChange={(e)=>setStockChoice(e.target.value)}>
     <option value="stockID">stockID</option>
     <option value="stockName">stockName</option>
     </select>
     {stockChoice==='stockID'&&  <input type='text' name="stockID" value={stockID} onChange={(e)=>setStockID(e.target.value)}/>}
     {stockChoice==='stockName'&&  <input type='text' name="stockName" value={stockName} onChange={(e)=>setStockName(e.target.value)}/>}
 <input type="submit" value="Submit" />
             </form>
        </div>
    )
}

export default SearchBox
